import { defineComponent, h, useSlots, resolveComponent } from 'vue';
import { useFormItemComponent, useFormItemProps } from '../hooks';
import { isObject, isFunction } from '@ideal-schema/shared';
import FormItemLabel from './FormItemLabel';

// import ref from '../../directives/vueRef';

export default defineComponent({
  name: 'CFormItem',
  // directives: { ref },
  props: {
    formConfig: {
      type: Object,
      default: () => ({}),
    },
    formModel: {
      // 绑定的value值
      type: Object,
      default: () => {},
    },
    options: {
      // 多选值绑定的陪选项目
      type: Object,
      default: () => {},
    },
    col: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const slots: IndexType = useSlots();
    const { componentName: ComponentName } = useFormItemComponent(props);
    const { formItemProps } = useFormItemProps(props);

    return () => {
      const { col, formModel, options, formConfig } = props;

      const vSlots: IndexType = {
        label: () => (
          <>
            {isFunction(slots[col.frontSlot]) ? (
              slots[col.frontSlot]()
            ) : (
              <FormItemLabel
                {...{
                  ...col.formItem,
                  colon: Object.prototype.hasOwnProperty.call(col.formItem || {}, 'colon')
                    ? col.formItem.colon
                    : formConfig.colon,
                }}
              />
            )}
          </>
        ),
      };
      if (col.rearSlot && slots[col.rearSlot]) {
        vSlots.error = () => <>{slots[col.rearSlot] && slots[col.rearSlot]()}</>;
      }

      const getOptions = () => {
        if (options) {
          if (options[col.prop]) return options[col.prop];
          if (col.attrs && col.attrs.options && col.attrs.options.length) return col.attrs.options;
          return [];
        }
        return [];
      };

      return (
        <el-form-item
          ref="formItem"
          prop={col.prop}
          class="c-form-item"
          // v-bind={formItemProps}
          {...formItemProps.value}
          // {...{ props: formItemProps }}
          // {...{ attrs: formItemProps }}
          v-slots={vSlots}
        >
          {col.type === 'txt' ? null : (
            // <c-txt
            //   // v-bind={formItemProps}
            //   {...{ props: col.attrs }}
            //   class={[col.attrs ? col.attrs.textClass || col.attrs.class : '', 'c-w-full']}
            // >
            //   {formModel[col.prop]}
            // </c-txt>
            // <ComponentName.value
            //   value={formModel[col.prop]}
            //   // v-ref={isObject(col.attrs) ? col.attrs.ref || (() => {}) : () => {}}
            //   prop={col.prop}
            //   modifier={col.modifier}
            //   dynamicAttrs={col.dynamicAttrs}
            //   options={options ? options[col.prop] || (col.attrs && col.attrs.options) : {}}
            //   // v-bind={col.attrs}
            //   {...{ props: col.attrs }}
            //   {...{ on: col.on }}
            //   onInput={(val: any) => {
            //     formModel[col.prop] = val;
            //     if (col.on && col.on.input) {
            //       col.on.input(val);
            //     }
            //   }}
            // />
            <>
              {h(resolveComponent(ComponentName.value), {
                modelValue: props.formModel?.[col.prop],
                prop: col.prop,
                ...col.attrs,
                options: getOptions(),
                // on: col.on,
                onInput: (val: any) => {
                  props.formModel[col.prop] = val;
                  emit('change', { val: val, prop: col.prop, formData: props.formModel });
                  if (col.on && col.on.input) {
                    col.on.input(val);
                  }
                },
                // onChange: (val: any) => {
                //   props.formModel[col.prop] = val;
                //   emit('change', { val: val, prop: col.prop, formData: props.formModel });
                //   if (col.on && col.on.change) {
                //     col.on.change(val);
                //   }
                // },
              })}
            </>
          )}
          {formItemProps.value.extra && (
            <div class="c-form-item__extra">
              {isFunction(formItemProps.value.extra)
                ? formItemProps.value.extra(h)
                : formItemProps.value.extra}
            </div>
          )}
          {/* <template slot="label">
    {slots[col.frontSlot] ? slots[col.frontSlot]() : slots.label()}
  </template>
  <template slot="error">{slots[col.rearSlot] && slots[col.rearSlot]()}</template> */}
        </el-form-item>
      );
    };
  },
});
