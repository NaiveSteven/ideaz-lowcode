import { uid } from '@ideal-schema/shared'
import {
  arrayFormTemplateSchema,
  defaultArrayFormAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
} from '../schemas'
import { InputTemplateComponent } from './Input'

export function ArrayFormTemplateComponent(key = uid()): WorkspaceComponentItem {
  // const arrayFormId = uid()
  // const arrayFormId2 = uid()
  return {
    id: uid(),
    icon: 'i-lightning',
    title: '数组表单',
    schema: {
      component: 'z-form',
      field: key,
      label: '数组表单',
      fieldProps: {
        action: false,
        type: 'array',
        max: undefined,
        draggable: true,
        style: {
          width: '100%',
        },
        columns: [
          {
            ...InputTemplateComponent(),
            schema: { ...InputTemplateComponent().schema, label: '通知单1' },
            formItemFormData: { ...InputTemplateComponent().schema, label: '通知单1' },
          },
          {
            ...InputTemplateComponent(),
            schema: { ...InputTemplateComponent().schema, label: '通知单2' },
            formItemFormData: { ...InputTemplateComponent().schema, label: '通知单2' },
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
  }
}
