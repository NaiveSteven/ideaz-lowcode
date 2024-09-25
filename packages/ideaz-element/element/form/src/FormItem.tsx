import { ElFormItem } from 'element-plus'
import { get } from 'lodash-unified'
import { vueRef as ref } from '../../../directives'
import { useFormSize, useNamespace } from '../../../hooks'
import { getContentByRenderAndSlot, resolveDynamicComponent } from '../../../shared'
import { extractEvents, isEmpty, isFunction, isObject, isString } from '../../../utils'
import {
  useFormItemComponent,
  useFormItemProps,
  useFormItemSlots,
} from '../hooks'
import { formItemProps, formItemProvideKey } from './props'

export default defineComponent({
  name: 'ZFormItem',
  directives: { ref },
  props: formItemProps,
  emits: ['change', 'update:modelValue', 'form-item-click', 'form-item-mousedown', 'array-form-draggable-end'],
  setup(props, { slots, emit }) {
    const ns = useNamespace('form-item')
    const { componentName: ComponentName } = useFormItemComponent(props)
    const { formItemProps } = useFormItemProps(props)
    const { vSlots } = useFormItemSlots(props, slots)
    const size = useFormSize()

    provide(formItemProvideKey, computed(() => {
      return {
        ...toRefs(props),
        size: size.value,
      }
    }))

    const modify = (val: any) => {
      const { col } = props
      if (col.modifier) {
        if (isFunction(col.modifier))
          emit('update:modelValue', col.modifier(val), col.field)

        if (col.modifier === 'trim')
          emit('update:modelValue', isString(val) ? val.trim() : val, col.field)
      }
      else {
        emit('update:modelValue', val, col.field)
      }
    }

    const getOptions = () => {
      const { col, options } = props
      console.log(col, options, 'colcolcol')
      if (options && !isEmpty(options))
        return (options[col.field!] || (col.fieldProps && col.fieldProps.options))

      if (col.fieldOptionsConfig && col.fieldOptionsConfig[col.field])
        return col.fieldOptionsConfig[col.field]

      return {}
    }

    return () => {
      const { col, options, formConfig } = props
      return (
        <ElFormItem
          ref="formItem"
          prop={col.field}
          class={[ns.b(), (formConfig.draggable || col.draggable) && ns.b('draggable'), `z-form-${formConfig.type}`, `schema-field-${col.id}`]}
          {...{ size: size.value, ...formItemProps.value }}
          v-slots={vSlots.value}
        >
          {(isFunction(col.render) || col.slot)
            ? slots.default?.()
            : h(resolveDynamicComponent({
              name: ComponentName.value,
              attrs: {
                'modelValue': isFunction(col.fieldProps && col.fieldProps.format)
                  ? col.fieldProps?.format(get(props.modelValue, col.field!))
                  : get(props.modelValue, col.field!),
                'prop': col.field,
                'options': getOptions(),
                'size': size.value,
                'class': [col.class, props.draggableId ? `schema-field-${props.draggableId}` : ''],
                'style': col.style,
                ...col.fieldProps,
                'directives': {
                  ref: isObject(col.fieldProps)
                    ? (col.fieldProps.ref || (() => { }))
                    : () => { },
                },
                'onUpdate:modelValue': (val: any) => modify(val),
                'onForm-item-click': (...args) => { emit('form-item-click', ...args) },
                'onForm-item-mousedown': (...args) => { emit('form-item-mousedown', ...args) },
                'onArray-form-draggable-end': (...args) => { emit('array-form-draggable-end', ...args) },
                ...extractEvents(col),
              },
            }))}
          {formItemProps.value.extra && (
            <div class={ns.e('extra')}>
              {getContentByRenderAndSlot(formItemProps.value.extra, slots)}
            </div>
          )}
        </ElFormItem>
      )
    }
  },
})
