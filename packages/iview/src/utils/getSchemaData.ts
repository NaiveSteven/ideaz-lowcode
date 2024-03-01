import { isEmpty, isObject } from '@ideal-schema/shared'
import { cloneDeep } from 'lodash-es'
import { useWorkspaceComponent, useWorkspaceForm } from '../../../playground-store/src'
import {
  SelectCrudFormData,
  defaultCheckboxAttrs,
  formItemFormData as defaultFormItemFormData,
  defaultInputAttrs,
  defaultInputNumberAttrs,
  defaultMultipleSelectAttrs,
  defaultRadioAttrs,
  defaultRateAttrs,
  defaultSelectAttrs,
  defaultSliderAttrs,
  defaultSwitchAttrs,
  defaultTextareaAttrs,
  defaultTimePickerAttrs,
  defaultTimeRangePickerAttrs,
  defaultTimeSelectAttrs,
  defaultTreeSelectAttrs,
  inputCrudFormData,
  tableColFormData,
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
  ...defaultRateAttrs,
  ...defaultSliderAttrs,
  ...defaultTimeSelectAttrs,
  ...defaultTimePickerAttrs,
  ...defaultTimeRangePickerAttrs,
  ...defaultTreeSelectAttrs,
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
  scrollToError: false,
  requireAsteriskPosition: 'left',
  column: 1,
}

const skipFieldPropsKeys: Array<{ key: string, value?: any, component?: string }> = [
  {
    key: 'controlsPosition',
    value: 'right',
  },
  {
    key: 'type',
    value: ['textarea', 'daterange', 'date'],
  },
  {
    key: 'multiple',
    value: true,
  },
  {
    key: 'startPlaceholder',
    value: '开始时间',
  },
  {
    key: 'endPlaceholder',
    value: '结束时间',
  },
  {
    key: 'data',
    component: 'el-tree-select',
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

function getSchemaData(mode: 'code' | 'preview' = 'code', type: 'form' | 'crud' = 'form') {
  const { workspaceComponentList } = useWorkspaceComponent()
  const { formConfig: workspaceFormConfig } = useWorkspaceForm()
  const formConfig = cloneDeep(workspaceFormConfig.value)

  if (type === 'form') {
    const formData: IndexType = {}
    const options: IndexType = {}

    const isRequired = workspaceComponentList.value.some(item => item.fieldFormData?.required)
    if (isRequired)
      formConfig.rules = {}

    workspaceComponentList.value.forEach((item) => {
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
      columns: workspaceComponentList.value.map((item) => {
        if (
          item.schema.component === 'placeholder-block'
          && item.fieldFormData?.slot
          && mode !== 'preview'
        ) {
          return {
            slot: item.fieldFormData?.slot,
          }
        }

        const formItemProps = item.schema
        const fieldProps = item.schema.fieldProps
        if (isObject(formItemProps)) {
          Object.keys(formItemProps).forEach((key) => {
            if (
              defaultFormItemFormData[key as keyof typeof defaultFormItemFormData] === formItemProps[key as keyof Schema]
            )
              delete item.schema[key as keyof Schema]
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
            if (skipItem.key === 'data' && skipItem.component === 'el-tree-select')
              return
            const isEqual = Array.isArray(skipItem.value)
              ? skipItem.value.includes(item.schema.fieldProps?.[key])
              : skipItem.value === item.schema.fieldProps?.[key]
            if (!isEqual)
              delete item.schema.fieldProps?.[key]
          }
        })
        delEmptyObject(fieldProps)
        delete fieldProps?.options
        if (isObject(fieldProps) && isEmpty(fieldProps))
          delete item.schema.fieldProps

        return item.schema
      }),
      formData,
      formConfig,
      options,
    }
  }

  if (type === 'crud') {
    if (!workspaceComponentList.value[0])
      return { config: {} } as IndexType
    const component = workspaceComponentList.value[0]
    const schema = component.schema
    const config: IndexType = {}
    let columns: Array<TableCol> = []
    const deleteTableColKeys = [
      'name',
      'title',
      'id',
      'componentSchema',
      'componentOptionsConfig',
      'componentFormData',
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
      'input': inputCrudFormData,
      'select': SelectCrudFormData,
      'datepicker': {},
      'placeholder-block': {},
    }

    if (mode === 'preview')
      config.data = schema.data

    else
      config.data = []

    const componentFormData = component.componentFormData
    if (componentFormData?.rowKey && componentFormData.rowKey !== 'id')
      config.rowKey = componentFormData?.rowKey

    if (component.fieldFormData?.collapsed === false)
      config.collapsed = componentFormData?.collapsed

    if (componentFormData?.pagination)
      config.pagination = schema.pagination

    if (componentFormData?.formDecorator !== 'el-card')
      config.formDecorator = schema.formDecorator

    if (componentFormData?.tableDecorator !== 'el-card')
      config.tableDecorator = schema.tableDecorator

    const isSearch = schema.columns?.some((item: TableCol) => item.search)

    if (isSearch) {
      if (schema.formConfig?.labelWidth !== '80px') {
        config.formConfig = {
          labelWidth: schema.formConfig?.labelWidth,
        }
      }
      config.searchFormData = {}
      config.options = {}
      schema.columns?.forEach((item: TableCol) => {
        if (item.search) {
          config.searchFormData[item.search.fieldFormData?.field]
            = item.search.fieldFormData?.default
          if (
            item.search.fieldProps
            && item.search.fieldProps.options
            && item.search.component !== 'placeholder-block'
          ) {
            config.options[item.search.fieldFormData?.field]
              = item.search.fieldProps.options
          }
        }
      })
      if (config.options && isEmpty(config.options))
        delete config.options
    }

    columns = schema.columns?.map((item: TableCol) => {
      const tableCol = cloneDeep(item)
      if (tableCol.search) {
        tableCol.search.fieldProps = {}
        const searchFormItem = tableCol.search
        const component = tableCol.search.component
        Object.keys(searchFormItem.componentFormData).forEach((key) => {
          if (
            defaultAttrs[component as keyof typeof defaultAttrs][key]
            !== searchFormItem.componentFormData![key]
            && key !== 'componentType'
          )
            searchFormItem.fieldProps[key] = searchFormItem.componentFormData![key]

          if (
            key === 'componentType'
            && searchFormItem.componentFormData?.componentType === 'multipleSelect'
          )
            searchFormItem.fieldProps.multiple = true

          if (
            key === 'componentType'
            && searchFormItem.componentFormData?.componentType === 'datepicker'
          )
            searchFormItem.fieldProps.component = 'daterange'

          if (
            key === 'componentType'
            && searchFormItem.componentFormData?.componentType === 'slot'
            && mode !== 'preview'
          )
            tableCol.searchFormItem = { slot: searchFormItem.fieldFormData?.slot }
        })

        delete searchFormItem.fieldProps?.options
        delete searchFormItem.formItemProps?.class
        delete searchFormItem.formItemProps?.id
        delete searchFormItem.formItemProps?.onClick
        delete searchFormItem.schema
        delete searchFormItem.icon

        if (searchFormItem.formItemProps) {
          Object.keys(searchFormItem.formItemProps).forEach((key) => {
            if (!searchFormItem.formItemProps?.[key])
              delete searchFormItem.formItemProps?.[key]
          })
        }
        delEmptyObject(searchFormItem.fieldProps)
        delEmptyObject(searchFormItem.formItemProps)
        if (searchFormItem.fieldProps && isEmpty(searchFormItem.fieldProps))
          delete searchFormItem.fieldProps

        if (searchFormItem.formItemProps && isEmpty(searchFormItem.formItemProps))
          delete searchFormItem.formItemProps

        deleteTableColKeys.forEach((key) => {
          delete searchFormItem[key as keyof typeof tableCol.searchFormItem]
        })
      }
      if (tableCol.type === 'slot') {
        const col: TableCol = {
          slot: tableCol.slot,
          label: tableCol.label,
        }
        if (tableCol.search)
          col.search = tableCol.search

        return col
      }
      if (tableCol.type === 'button') {
        delete tableCol.prop
        tableCol.buttons = item.buttons?.map((item) => {
          if (item.link) {
            return {
              link: item.link,
              type: item.type,
              label: item.label,
            }
          }
          return {
            type: item.type,
            label: item.label,
          }
        })
      }
      else {
        delete tableCol.buttons
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
    }) || []

    return { config, columns }
  }

  return {
    formData: {},
    formConfig: {},
    options: {},
    columns: [],
  }
}

export { getSchemaData }
