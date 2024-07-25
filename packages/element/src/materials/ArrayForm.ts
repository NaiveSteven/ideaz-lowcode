import { uid } from '@ideal-schema/shared'
import {
  arrayFormTemplateSchema,
  defaultArrayFormAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
} from '../schemas'

export function ArrayFormTemplateComponent(key = uid()): WorkspaceComponentItem {
  return {
    id: uid(),
    icon: 'i-lightning',
    title: '数组表单',
    schema: {
      component: 'z-form',
      field: key,
      label: '数组表单',
      fieldProps: {
        action: true,
        type: 'array',
        max: undefined,
        style: {
          width: '100%',
        },
        columns: [
          {
            component: 'input',
            field: 'a',
          },
          {
            component: 'select',
            field: 'b',
          },
        ],
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '数组表单',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultArrayFormAttrs }),
    componentSchema: arrayFormTemplateSchema,
    // componentOptionsConfig: checkboxTemplateOptionsConfig,
    fieldFormData: reactive({
      field: key,
      default: [{}],
      required: false,
    }),
    fieldSchema: fieldTemplateSchema({
      defaultComponent: 'select',
      defaultProps: { multiple: true },
      required: true,
    }),
    fieldOptionsConfig: {
      default: [
        { label: '标签1', value: '1', key: uid() },
        { label: '标签2', value: '2', key: uid() },
      ],
    },
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
