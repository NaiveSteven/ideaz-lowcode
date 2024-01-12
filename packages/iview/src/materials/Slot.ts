import { reactive } from 'vue'
import { uid } from '@ideal-schema/shared'

export function SlotTemplateComponent() {
  return {
    id: uid(),
    icon: 'i-van',
    title: '插槽',
    schema: {
      component: 'placeholder-block',
      label: '插槽',
      fieldProps: {},
    },
    formItemFormData: reactive({
      label: '插槽',
    }),
    formItemTemplateSchema: {},
    formItemOptionsConfig: {},
    componentFormData: reactive({}),
    componentSchema: [],
    componentOptionsConfig: {},
    fieldOptionsConfig: {},
    fieldFormData: reactive({
      slot: 'slot',
    }),
    fieldSchema: [
      {
        component: 'input',
        field: 'slot',
        label: '插槽名',
      },
    ],
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
