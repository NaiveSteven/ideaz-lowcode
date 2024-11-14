import { uid } from '@ideal-schema/shared'
import {
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
} from '../schemas'

export function SlotTemplateComponent(): WorkspaceComponentItem {
  return {
    id: uid(),
    icon: 'icon-rongqi',
    title: '插槽',
    schema: {
      component: 'placeholder-block',
      label: '插槽',
      fieldProps: {},
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '插槽',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
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
