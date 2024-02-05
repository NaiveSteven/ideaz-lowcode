import { uid } from '@ideal-schema/shared'
import {
  defaultMultipleSelectAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  multipleSelectTemplateOptionsConfig,
  multipleSelectTemplateSchema
} from '../schemas'

export const MultipleSelectTemplateComponent = (): WorkspaceComponentItem => {
  const field = uid()
  return {
    id: uid(),
    icon: 'i-magic-stick',
    title: '多选框',
    schema: {
      component: 'select',
      field,
      label: '多选框',
      fieldProps: {
        multiple: true,
        placeholder: '',
        popperClass: '',
        clearable: true,
        disabled: false,
        filterable: true,
        collapseTags: false,
        multipleLimit: 0,
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '多选框',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultMultipleSelectAttrs }),
    componentSchema: multipleSelectTemplateSchema,
    componentOptionsConfig: multipleSelectTemplateOptionsConfig,
    fieldFormData: reactive({
      field,
      default: [],
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
