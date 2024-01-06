import { cloneDeep } from 'lodash-es'
import { isEmpty, isObject } from '@ideal-schema/shared'
import { useMiddleFormStore, useWorkspaceStore } from '../../../playground-store/src'
import {
  defaultCheckboxAttrs,
  defaultInputAttrs,
  defaultInputNumberAttrs,
  defaultMultipleSelectAttrs,
  defaultRadioAttrs,
  defaultSelectAttrs,
  defaultSwitchAttrs,
  defaultTextareaAttrs,
} from '../../../playground-custom-schema/src/source'
import {
  SelectTableProFormData,
  formItemFormData as defaultFormItemFormData,
  inputTableProFormData,
  tableColFormData,
} from '../../../playground-custom-schema/src/schemas'

const customSchemaComponentFormData: IndexType = {
  ...defaultCheckboxAttrs,
  ...defaultInputAttrs,
  ...defaultInputNumberAttrs,
  ...defaultMultipleSelectAttrs,
  ...defaultRadioAttrs,
  ...defaultSelectAttrs,
  ...defaultSwitchAttrs,
  ...defaultTextareaAttrs,
}

const customSchemaForm: IndexType = {
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

const customSchemaPassDel: Array<{ key: string, value: any }> = [
  // {
  //   key: 'clearable',
  //   value: true,
  // },
  // {
  //   key: 'filterable',
  //   value: true,
  // },
  {
    key: 'controlsPosition',
    value: 'right',
  },
  {
    key: 'type',
    value: ['textarea', 'daterange'],
  },
  // {
  //   key: 'min',
  //   value: 0,
  // },
  // {
  //   key: 'max',
  //   value: 10,
  // },
  // {
  //   key: 'step',
  //   value: 1,
  // },
  // {
  //   key: 'placeholder',
  //   value: '请选择',
  // },
]

function delEmptyObject(data: any) {
  if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      if (isEmpty(data[key]))
        delete data[key]
    })
  }
}

function getCustomSchemaObject(mode: 'code' | 'preview' = 'code', type: 'form' | 'tablePro' = 'form') {
  const workspaceStore = useWorkspaceStore()
  const middleFormStore = useMiddleFormStore()
  const componentList = cloneDeep(workspaceStore.getWorkspaceComponentList)
  if (type === 'form') {
    const formConfig = cloneDeep(middleFormStore.getFormConfig)
    const formModel: IndexType = {}
    const optionsConfig: IndexType = {}

    const isHaveItemRequired = componentList.some(item => item.fieldFormData?.required)
    if (isHaveItemRequired)
      formConfig.rules = {}

    componentList.forEach((item) => {
      const prop = item.fieldFormData!.prop
      if (prop) {
        // 处理rules
        if (item.fieldFormData?.required) {
          formConfig.rules[prop] = [
            {
              required: true,
              message: `请输入${item.formItemFormData!.label}`,
              trigger: 'blur',
            },
          ]
        }
        formModel[prop] = item.fieldFormData!.default
        if (item.templateOptionsConfig![prop]) {
          optionsConfig[prop] = item.templateOptionsConfig![prop].map((item: OptionsItem) => ({
            label: item.label,
            value: item.value,
          }))
        }
        if (item.templateFormData!.hasOwnProperty('options')) {
          optionsConfig[prop] = item.templateFormData!.options.map((item: OptionsItem) => ({
            label: item.label,
            value: item.value,
          }))
        }
      }
    })
    Object.keys(formConfig).forEach((key) => {
      if (customSchemaForm[key] === formConfig[key])
        delete formConfig[key]
    })
    delete formConfig.layout
    delete formConfig.background

    const colLayout = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 24,
    }
    const rowLayout = {
      type: 'flex',
      justify: 'center',
    }

    delEmptyObject(formConfig)
    return {
      formItemConfigs: componentList.map((item) => {
        if (
          item.schema.type === 'placeholder-block'
          && item.fieldFormData!.slot
          && mode !== 'preview'
        ) {
          return {
            slot: item.fieldFormData!.slot,
          }
        }
        if (item.schema.attrs && item.schema.attrs.options)
          delete item.schema.attrs.options

        const formItem = item.schema.formItem
        if (isObject(formItem)) {
          Object.keys(formItem).forEach((key) => {
            if (
              defaultFormItemFormData[key as keyof typeof defaultFormItemFormData] === formItem[key]
            )
              delete formItem[key]
          })
        }
        Object.keys(customSchemaComponentFormData).forEach((key) => {
          const passItem = customSchemaPassDel.find(cur => cur.key === key)
          if (!passItem) {
            if (customSchemaComponentFormData[key] === item.schema.attrs![key]) {
              delete item.schema.attrs![key]
            }
            else if (Array.isArray(customSchemaComponentFormData[key])) {
              if (item.schema.attrs![key] && item.schema.attrs![key].length === 0)
                delete item.schema.attrs![key]
            }
          }
          if (passItem) {
            const isEqual = Array.isArray(passItem.value)
              ? passItem.value.includes(item.schema.attrs![key])
              : passItem.value === item.schema.attrs![key]
            if (!isEqual)
              delete item.schema.attrs![key]
          }
        })
        delEmptyObject(item.schema.attrs)
        delEmptyObject(item.schema.formItem)
        if (isObject(item.schema.attrs) && isEmpty(item.schema.attrs))
          delete item.schema.attrs

        if (isObject(item.schema.formItem) && isEmpty(item.schema.formItem))
          delete item.schema.formItem

        return item.schema
      }),
      formModel,
      formConfig,
      optionsConfig,
      layout: { rowLayout, colLayout },
    }
  }
  if (type === 'tablePro') {
    if (!componentList[0])
      return { config: {} }
    const component = componentList[0]
    const schema = component.schema
    const config: IndexType = {}
    const deleteTableColKeys = [
      'name',
      'title',
      'id',
      'templateSchema',
      'templateOptionsConfig',
      'templateFormData',
      'activeCollapseItems',
      'allowCopy',
      'allowDelete',
      'fieldFormData',
      'fieldSchema',
      'formItemFormData',
      'formItemTemplateSchema',
      'formItemOptionsConfig',
      '__uid',
    ]

    const defaultAttrs: IndexType = {
      'input': inputTableProFormData,
      'select': SelectTableProFormData,
      'datepicker': {},
      'placeholder-block': {},
    }

    if (mode === 'preview')
      config.data = schema.data

    else
      config.data = []

    const templateFormData = component.templateFormData
    if (templateFormData?.rowKey && templateFormData.rowKey !== 'id')
      config.rowKey = templateFormData?.rowKey

    if (templateFormData?.defaultExpand === false)
      config.defaultExpand = templateFormData?.defaultExpand

    if (templateFormData?.pagination)
      config.pagination = schema.pagination

    if (templateFormData?.formDecorator !== 'el-card')
      config.formDecorator = schema.formDecorator

    if (templateFormData?.tableDecorator !== 'el-card')
      config.tableDecorator = schema.tableDecorator

    const isFormItemProps = schema.tableCols!.some((item: TableCol) => item.formItemProps)

    if (isFormItemProps) {
      if (schema.formConfig!.labelWidth !== '80px') {
        config.formConfig = {
          labelWidth: schema.formConfig!.labelWidth,
        }
      }
      config.formModel = {}
      config.formOptions = {}
      schema.tableCols!.forEach((item: TableCol) => {
        if (item.formItemProps) {
          config.formModel[item.formItemProps.fieldFormData?.prop]
            = item.formItemProps.fieldFormData?.default
          if (
            item.formItemProps.attrs
            && item.formItemProps.attrs.options
            && item.formItemProps.type !== 'placeholder-block'
          ) {
            config.formOptions[item.formItemProps.fieldFormData?.prop]
              = item.formItemProps.attrs.options
          }
        }
      })
      if (config.formOptions && isEmpty(config.formOptions))
        delete config.formOptions
    }

    config.tableCols = schema.tableCols!.map((item: TableCol) => {
      const tableCol = cloneDeep(item)
      if (tableCol.formItemProps) {
        tableCol.formItemProps.attrs = {}
        const formItemProps = tableCol.formItemProps!
        const type = tableCol.formItemProps.type
        Object.keys(formItemProps.templateFormData!).forEach((key) => {
          if (
            defaultAttrs[type as keyof typeof defaultAttrs][key]
            !== formItemProps.templateFormData![key]
            && key !== 'componentType'
          )
            formItemProps.attrs![key] = formItemProps.templateFormData![key]

          if (
            key === 'componentType'
            && formItemProps.templateFormData?.componentType === 'multipleSelect'
          )
            formItemProps.attrs!.multiple = true

          if (
            key === 'componentType'
            && formItemProps.templateFormData?.componentType === 'datepicker'
          )
            formItemProps.attrs!.type = 'daterange'

          if (
            key === 'componentType'
            && formItemProps.templateFormData?.componentType === 'slot'
            && mode !== 'preview'
          )
            tableCol.formItemProps = { slot: formItemProps.fieldFormData?.slot }
        })

        delete formItemProps.attrs?.options
        delete formItemProps.formItem?.class
        delete formItemProps.schema
        delete formItemProps.icon

        if (formItemProps.formItem) {
          Object.keys(formItemProps.formItem).forEach((key) => {
            if (!formItemProps.formItem?.[key])
              delete formItemProps.formItem?.[key]
          })
        }
        delEmptyObject(formItemProps.attrs)
        delEmptyObject(formItemProps.formItem)
        if (formItemProps.attrs && isEmpty(formItemProps.attrs))
          delete formItemProps.attrs

        if (formItemProps.formItem && isEmpty(formItemProps.formItem))
          delete formItemProps.formItem

        deleteTableColKeys.forEach((key) => {
          delete formItemProps[key as keyof typeof tableCol.formItemProps]
        })
      }
      if (tableCol.type === 'slot') {
        const col: TableCol = {
          slot: tableCol.slot,
          label: tableCol.label,
        }
        if (tableCol.formItemProps)
          col.formItemProps = tableCol.formItemProps

        return col
      }
      if (tableCol.type === 'button') {
        delete tableCol.prop
        tableCol.btnList = item.btnList?.map((item) => {
          return {
            type: item.type,
            label: item.label,
          }
        })
      }
      else {
        delete tableCol.btnList
      }
      deleteTableColKeys.forEach((key) => {
        delete tableCol[key]
      })
      Object.keys(tableCol).forEach((key) => {
        if (tableColFormData[key as keyof typeof tableColFormData] === tableCol[key])
          delete tableCol[key]

        if (isEmpty(tableCol[key]) || tableCol[key] === '' || tableCol[key] === undefined)
          delete tableCol[key]
      })

      return tableCol
    })

    return { config }
  }
}

const schemaMode = localStorage.getItem('schemaMode')
  ? JSON.parse(localStorage.getItem('schemaMode')!)
  : 'customSchema'

let useReduceJsonSchema: any

if (schemaMode === 'customSchema')
  useReduceJsonSchema = getCustomSchemaObject

export { useReduceJsonSchema }
