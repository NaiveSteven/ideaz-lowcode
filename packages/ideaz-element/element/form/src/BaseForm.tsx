// import { withModifiers } from 'vue-demi';
import { Plus } from '@element-plus/icons-vue'
import type { CollapseModelValue } from 'element-plus'
import { ElButton, ElCollapse, ElCollapseItem, ElDivider, ElForm, ElFormItem, ElStep, ElSteps } from 'element-plus'
import { cloneDeep, omit } from 'lodash-unified'
import type { ComponentInternalInstance } from 'vue'

// import { draggable } from '../../../directives'

import { useDraggable, vDraggable } from 'vue-draggable-plus'
import { useExpose, useLocale, useNamespace } from '../../../hooks'
import { getContentByRenderAndSlot } from '../../../shared'
import { isFunction, isString } from '../../../utils'
import type { FormColumn } from '../../types'
import {
  // useDraggable,
  useFormConfig,
  useFormItems,
  useFormMethods,
  useRow,
} from '../hooks'
import FormColumns from './FormColumns'
import OperationCard from './OperationCard'
import { FORM_FILTER_KEYS, FORM_ITEM_FILTER_KEYS, formProps, formProvideKey } from './props'

export default defineComponent({
  name: 'ZForm',
  components: { FormColumns, OperationCard },
  props: formProps,
  directives: { draggable: vDraggable },
  emits: ['input', 'update:modelValue', 'change', 'update:activeCollapse', 'collapse-change', 'next-step', 'previous-step', 'update:activeStep', 'submit', 'update:columns', 'form-item-click', 'form-item-mousedown', 'array-form-draggable-end'],
  setup(props, { emit, slots }) {
    const { formatFormItems } = useFormItems(props)
    const { rowStyle, rowKls } = useRow(props)
    const { formConfig } = useFormConfig(props)
    const {
      resetFields,
      validate,
      validateField,
      clearValidate,
      scrollToField,
    } = useFormMethods(props)
    // const { draggableOptions } = useDraggable(emit, formatFormItems)
    const ns = useNamespace('form')
    const { t } = useLocale()

    const formRef = ref()
    const arrayFormRef = ref()

    const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
    const activeStep = computed({
      get() {
        return props.activeStep
      },
      set(val) {
        emit('update:activeStep', val)
      },
    })

    useExpose({
      resetFields,
      validate,
      validateField,
      clearValidate,
      scrollToField,
    })

    provide(formProvideKey, computed(() => {
      return {
        ...toRefs(props),
        size: formConfig.value.size,
      }
    }))

    const renderCommonColumn = (contentColumns: FormColumn[]) => {
      const { modelValue, options } = props

      return (
        <FormColumns
          modelValue={modelValue}
          options={options}
          columns={contentColumns}
          formProps={props}
          v-slots={slots}
          onUpdate:modelValue={(...args) => { emit('update:modelValue', ...args) }}
          onChange={(...args) => { emit('change', ...args) }}
        />
      )
    }

    const renderStepFooter = () => {
      const { footer } = props
      if (isFunction(footer))
        return footer()
      if (slots.footer)
        return slots.footer()
      return (
        <ElFormItem>
          <ElButton
            disabled={activeStep.value === 0}
            onClick={() => {
              emit('previous-step')
              if (activeStep.value-- <= 0)
                activeStep.value = 0
            }}
          >
            {t('form.previousStep')}
          </ElButton>
          {activeStep.value !== formatFormItems.value.length - 1 && (
            <ElButton
              type="primary"
              onClick={() => {
                (ctx?.$refs.formRef as typeof ElForm).validate((val: boolean) => {
                  if (val) {
                    emit('next-step')
                    if (activeStep.value++ >= formatFormItems.value.length - 1)
                      activeStep.value = 0
                  }
                })
              }}
            >
              {t('form.nextStep')}
            </ElButton>
          )}
          {activeStep.value === formatFormItems.value.length - 1 && (
            <ElButton
              type="primary"
              onClick={() => {
                (ctx?.$refs.formRef as typeof ElForm).validate((val: boolean) => {
                  if (val)
                    emit('submit')
                })
              }}
            >
              {t('common.submit')}
            </ElButton>
          )}
        </ElFormItem>
      )
    }

    const renderContent = () => {
      const { type, contentPosition, borderStyle, activeCollapse, accordion, modelValue, options, finishStatus, processStatus, simple, max, action } = props
      const isChildren = formatFormItems.value.some(column => column.children)
      if (isFunction(slots.default))
        return slots.default()

      if (type === 'group') {
        return formatFormItems.value.map((column) => {
          if (column.label && column.children && column.children.length) {
            return (
              <>
                <ElDivider contentPosition={column.contentPosition || contentPosition} borderStyle={column.borderStyle || borderStyle}>
                  {getContentByRenderAndSlot(column.label, slots)}
                </ElDivider>
                {renderCommonColumn(column.children || [])}
              </>
            )
          }
          return renderCommonColumn([column])
        })
      }
      else if (type === 'collapse') {
        return (
          <ElCollapse
            modelValue={activeCollapse}
            accordion={accordion}
            class={ns.b('collapse')}
            onUpdate:modelValue={(val: CollapseModelValue) => { emit('update:activeCollapse', val) }}
            onChange={(val: CollapseModelValue) => { emit('collapse-change', val) }}
          >
            {formatFormItems.value.map((column) => {
              if (column.label && column.children && column.children.length) {
                const name = isString(column.label) ? column.label : column.key
                return (
                  <ElCollapseItem
                    name={name}
                    disabled={column.disabled}
                    v-slots={{
                      title: () => getContentByRenderAndSlot(column.label, slots),
                    }}
                  >
                    {renderCommonColumn(column.children || [])}
                  </ElCollapseItem>
                )
              }
              return renderCommonColumn([column])
            })}
          </ElCollapse>
        )
      }
      else if (type === 'array' && !isChildren) {
        const model = [...modelValue as any[]]
        return (
          <>
            {modelValue.map((data: any, index: number) => {
              const formProps = omit(props, FORM_FILTER_KEYS)
              return (
                <FormColumns
                  modelValue={data}
                  options={options}
                  columns={formatFormItems.value}
                  v-slots={slots}
                  onUpdate:modelValue={(val: any) => {
                    model.splice(index, 1, val)
                    emit('update:modelValue', model)
                  }}
                  onChange={(...args) => { emit('change', ...args) }}
                  onForm-item-click={(...args) => { emit('form-item-click', ...args) }}
                  onForm-item-mousedown={(...args) => { emit('form-item-mousedown', ...args) }}
                />
              )
            })}
          </>
        )
      }
      else if (type === 'array' && isChildren) {
        return formatFormItems.value.map((column, i) => {
          if (column.label && column.children && column.children.length) {
            const field = column.field!
            const maxLength = column.max || max
            return (
              <ElFormItem label={column.label} prop={column.field} class={ns.b('array-form-item')} {...omit(column, FORM_ITEM_FILTER_KEYS)}>
                <>
                  {modelValue[field].map((data: any, index: number) => {
                    const formProps = omit(column, FORM_FILTER_KEYS)
                    return (
                      <OperationCard
                        onAdd={() => {
                          const model = { ...modelValue }
                          model[field].push({})
                          emit('update:modelValue', model)
                        }}
                        onDelete={() => {
                          const model = cloneDeep(modelValue)
                          model[field].splice(index, 1)
                          emit('update:modelValue', model)
                        }}
                        showAdd={modelValue[field].length !== maxLength}
                        action={action}
                      >
                        <ElForm {...{ labelWidth: formConfig.value.labelWidth, ...formProps }} model={data} ref={`arrayForm${index}${field}`}>
                          <FormColumns
                            modelValue={data}
                            options={column.options || options}
                            columns={column.children}
                            v-slots={slots}
                            onUpdate:modelValue={(val: any) => {
                              const item = cloneDeep(modelValue[field])
                              item.splice(index, 1, val)
                              emit('update:modelValue', { ...modelValue, [field]: item })
                            }}
                            onChange={(...args) => { emit('change', ...args) }}
                          />
                        </ElForm>
                      </OperationCard>
                    )
                  })}
                  {modelValue[field].length !== maxLength
                  && (
                    <ElButton
                      class={ns.be('array', 'add')}
                      onClick={() => {
                        const model = { ...modelValue }
                        model[field].push({})
                        emit('update:modelValue', model)
                      }}
                      icon={Plus}
                    >
                      {t('form.add')}
                    </ElButton>
                  )}
                </>
              </ElFormItem>
            )
          }
          return renderCommonColumn([column])
        })
      }
      else if (type === 'step') {
        return (
          <>
            <ElSteps active={activeStep.value} finishStatus={finishStatus} processStatus={processStatus} simple={simple} class={ns.b('steps')}>
              {formatFormItems.value.map((column) => {
                return (
                  <ElStep
                    status={column.status}
                    v-slots={{
                      icon: () => getContentByRenderAndSlot(column.icon, slots),
                      description: () => getContentByRenderAndSlot(column.description, slots),
                      title: () => getContentByRenderAndSlot(column.label, slots),
                    }}
                  />
                )
              })}
            </ElSteps>
            {formatFormItems.value.map((column, index) => {
              if (index === activeStep.value) {
                if (column.label && column.children && column.children.length)
                  return renderCommonColumn(column.children || [])
                return renderCommonColumn([column])
              }
              return null
            })}
            {renderStepFooter()}
          </>
        )
      }
      else {
        return renderCommonColumn(formatFormItems.value)
      }
    }

    if (props.type === 'array') {
      useDraggable(formRef, formatFormItems.value, {
        group: 'people',
        animation: 200,
        ghostClass: 'ghost',
        onUpdate: () => {
          console.log('onUpdate')
        },
        onEnd: async (a) => {
          // await nextTick()
          emit('array-form-draggable-end', a, props.columns)
        },
      })
    }

    return () => {
      const { modelValue } = props
      return (
        <ElForm
          {...{ ...formConfig.value, model: modelValue, class: `${props.type}-form` }}
          ref={formRef}
          class={[rowKls.value, ns.b('')]}
          style={rowStyle.value}
        // onSubmit={withModifiers(function () { }, ['prevent'])}
        >
          {renderContent()}
        </ElForm>
      )
    }
  },
})
