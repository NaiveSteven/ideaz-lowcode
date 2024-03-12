import { uid } from '@ideal-schema/shared'
import {
  defaultRadioAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  radioTemplateOptionsConfig,
  radioTemplateSchema,
} from '../schemas'

export function RadioTemplateComponent(): WorkspaceComponentItem {
  const field = uid()
  return {
    id: uid(),
    icon: 'i-ice-cream-square',
    title: '单选框',
    schema: {
      component: 'radio',
      field,
      label: '单选框',
      fieldProps: {
        textColor: '#ffffff',
        fill: '#409Eff',
        disabled: false,
        alias: {
          value: 'value',
          label: 'label',
          disabled: 'disabled',
        },
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '单选框',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultRadioAttrs }),
    componentSchema: radioTemplateSchema,
    componentOptionsConfig: radioTemplateOptionsConfig,
    fieldFormData: reactive({
      field,
      default: '',
    }),
    fieldSchema: fieldTemplateSchema({ defaultComponent: 'select', required: true }),
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
