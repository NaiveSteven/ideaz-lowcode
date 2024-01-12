import { reactive } from 'vue'
import { uid } from '@ideal-schema/shared'
import { FORM_COMPONENT_TYPE } from '../materials'
import {
  dateRangeCrudFormData,
  dateRangeCrudSchema,
  fieldTemplateSchema,
  formItemTemplateOptionsConfig,
} from '../schemas'

export function getDatepickerFormItemTemplate() {
  const prop = uid()
  const newFormItem = {
    id: uid(),
    name: 'tableForm',
    component: 'datepicker',
    title: '表单项',
    field: prop,
    icon: '',
    schema: {},
    label: '标签',
    componentFormData: reactive({
      ...dateRangeCrudFormData,
      componentType: 'datepicker',
    }),
    componentSchema: [
      {
        component: 'select',
        field: 'componentType',
        label: '组件类别',
      },
      ...dateRangeCrudSchema,
    ],
    componentOptionsConfig: {
      componentType: FORM_COMPONENT_TYPE,
    },
    fieldProps: {
      ...dateRangeCrudFormData,
      type: 'daterange',
    },
    fieldFormData: reactive({
      field: prop,
      default: [],
    }),
    fieldSchema: fieldTemplateSchema({ defaultComponent: 'input' }),
    formItemFormData: reactive({
      label: '标签',
      tooltip: '',
      extra: '',
    }),
    formItemTemplateSchema: [
      {
        component: 'input',
        field: 'label',
        label: '标签',
      },
      {
        component: 'input',
        field: 'tooltip',
        label: '提示',
      },
      {
        component: 'input',
        field: 'extra',
        label: '额外信息',
      },
    ],
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    activeCollapseItems: ['field', 'component', 'formItem'],
    allowCopy: true,
    allowDelete: true,
  }

  return { newFormItem, prop }
}