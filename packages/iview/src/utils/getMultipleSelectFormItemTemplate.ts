import { reactive } from 'vue'
import { uid } from '@ideal-schema/shared'
import { FORM_COMPONENT_TYPE } from '../materials'
import {
  fieldTemplateSchema,
  formItemTemplateOptionsConfig,
  multipleSelectCrudFormData,
  multipleSelectCrudSchema,
} from '../schemas'

export function getMultipleSelectFormItemTemplate() {
  const prop = uid()
  const newFormItem = {
    id: uid(),
    name: 'tableForm',
    component: 'select',
    title: '表单项',
    field: prop,
    icon: '',
    schema: {},
    label: '标签',
    fieldProps: {
      ...multipleSelectCrudFormData,
      multiple: true,
    },
    componentFormData: reactive({
      ...multipleSelectCrudFormData,
      componentType: 'multipleSelect',
    }),
    componentSchema: [
      {
        component: 'select',
        field: 'componentType',
        label: '组件类别',
      },
      ...multipleSelectCrudSchema,
    ],
    componentOptionsConfig: {
      componentType: FORM_COMPONENT_TYPE,
    },
    fieldFormData: reactive({
      field: prop,
      default: '',
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
