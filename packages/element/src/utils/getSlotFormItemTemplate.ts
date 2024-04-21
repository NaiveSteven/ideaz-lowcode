import { uid } from '@ideal-schema/shared'
import { FORM_COMPONENT_TYPE } from '../materials'

export function getSlotFormItemTemplate() {
  const prop = uid()
  const newFormItem = {
    id: uid(),
    name: 'tableForm',
    type: 'placeholder-block',
    title: '插槽',
    field: prop,
    icon: '',
    schema: {},
    label: '插槽',
    componentFormData: reactive({
      componentType: 'slot',
    }),
    componentSchema: [
      {
        component: 'select',
        field: 'componentType',
        label: '组件类别',
      },
    ],
    componentOptionsConfig: {
      componentType: FORM_COMPONENT_TYPE,
    },
    fieldFormData: reactive({
      field: 'slot',
      slot: 'slot',
    }),
    fieldSchema: [
      {
        component: 'input',
        field: 'prop',
        label: '字段名',
      },
      {
        component: 'input',
        field: 'slot',
        label: '插槽名',
      },
    ],
    formItemFormData: {},
    formItemTemplateSchema: [],
    formItemOptionsConfig: {},
    activeCollapseItems: ['field', 'component', 'formItem'],
    allowCopy: true,
    allowDelete: true,
  }

  return { newFormItem, prop }
}
