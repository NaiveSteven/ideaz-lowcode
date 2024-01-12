import { cloneDeep } from 'lodash-es'
import { isEmpty, isObject } from '@ideal-schema/shared'
import { useMiddleFormStore, useWorkspaceStore } from '../../../playground-store/src'
import {
  defaultCheckboxAttrs,
  formItemFormData as defaultFormItemFormData,
  defaultInputAttrs,
  defaultInputNumberAttrs,
  defaultMultipleSelectAttrs,
  defaultRadioAttrs,
  defaultSelectAttrs,
  defaultSwitchAttrs,
  defaultTextareaAttrs,
} from '../schemas'

const defaultComponentFormData: IndexType = {
  ...defaultCheckboxAttrs,
  ...defaultInputAttrs,
  ...defaultInputNumberAttrs,
  ...defaultMultipleSelectAttrs,
  ...defaultRadioAttrs,
  ...defaultSelectAttrs,
  ...defaultSwitchAttrs,
  ...defaultTextareaAttrs,
}

const defaultSchemaForm: IndexType = {
  labelSuffix: '',
  colon: false,
  disabled: false,
  inline: false,
  hideRequiredAsterisk: false,
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateOnRuleChange: true,
}

const skipFieldPropsKeys: Array<{ key: string, value: any }> = [
  {
    key: 'controlsPosition',
    value: 'right',
  },
  {
    key: 'type',
    value: ['textarea', 'daterange'],
  },
]

function delEmptyObject(data: any) {
  if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      if (isEmpty(data[key]))
        delete data[key]
    })
  }
}

function getSchemaData(mode: 'code' | 'preview' = 'code', type: 'form' | 'tablePro' = 'form') {
  const workspaceStore = useWorkspaceStore()
  const middleFormStore = useMiddleFormStore()
  const componentList = cloneDeep(workspaceStore.getWorkspaceComponentList)
  if (type === 'form') {
    const formConfig = cloneDeep(middleFormStore.getFormConfig)
    const formData: IndexType = {}
    const options: IndexType = {}

    const isRequired = componentList.some(item => item.fieldFormData?.required)
    if (isRequired)
      formConfig.rules = {}

    componentList.forEach((item) => {
      const field = item.fieldFormData?.field
      if (field) {
        formData[field] = item.fieldFormData!.default
        if (item.componentOptionsConfig?.[field]) {
          options[field] = item.componentOptionsConfig?.[field].map((item: OptionsItem) => ({
            label: item.label,
            value: item.value,
          }))
        }
        if (Object.hasOwnProperty.call(item.componentFormData, 'options')) {
          options[field] = item.componentFormData?.options.map((item: OptionsItem) => ({
            label: item.label,
            value: item.value,
          }))
        }
      }
    })
    Object.keys(formConfig).forEach((key) => {
      if (defaultSchemaForm[key] === formConfig[key])
        delete formConfig[key]
    })

    delete formConfig.layout
    delete formConfig.background
    delEmptyObject(formConfig)

    return {
      columns: componentList.map((item) => {
        if (
          item.schema.type === 'placeholder-block'
          && item.fieldFormData?.slot
          && mode !== 'preview'
        ) {
          return {
            slot: item.fieldFormData?.slot,
          }
        }

        const formItemProps = item.schema.formItemProps
        const fieldProps = item.schema.fieldProps
        if (isObject(formItemProps)) {
          Object.keys(formItemProps).forEach((key) => {
            if (
              defaultFormItemFormData[key as keyof typeof defaultFormItemFormData] === formItemProps[key]
            )
              delete formItemProps[key]
          })
        }
        Object.keys(defaultComponentFormData).forEach((key) => {
          const skipItem = skipFieldPropsKeys.find(cur => cur.key === key)
          if (!skipItem) {
            if (defaultComponentFormData[key] === item.schema.fieldProps?.[key]) {
              delete item.schema.fieldProps?.[key]
            }
            else if (Array.isArray(defaultComponentFormData[key])) {
              if (item.schema.fieldProps?.[key] && item.schema.fieldProps?.[key].length === 0)
                delete item.schema.fieldProps?.[key]
            }
          }
          if (skipItem) {
            const isEqual = Array.isArray(skipItem.value)
              ? skipItem.value.includes(item.schema.fieldProps?.[key])
              : skipItem.value === item.schema.fieldProps?.[key]
            if (!isEqual)
              delete item.schema.fieldProps?.[key]
          }
        })
        delEmptyObject(fieldProps)
        delEmptyObject(formItemProps)
        delete fieldProps?.options
        if (isObject(fieldProps) && isEmpty(fieldProps))
          delete item.schema.fieldProps

        if (isObject(formItemProps) && isEmpty(formItemProps))
          delete item.schema.formItemProps

        return item.schema
      }),
      formData,
      formConfig,
      options,
    }
  }
}

export { getSchemaData }
