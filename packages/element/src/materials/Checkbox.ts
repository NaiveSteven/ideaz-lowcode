import { uid } from '@ideal-schema/shared'
import {
  checkboxTemplateOptionsConfig,
  checkboxTemplateSchema,
  defaultCheckboxAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
} from '../schemas'

export function CheckboxTemplateComponent(key = uid()): Widget {
  return {
    id: uid(),
    icon: 'icon-duoxuan',
    title: '复选框',
    schema: {
      component: 'checkbox',
      field: key,
      label: '复选框',
      fieldProps: {
        textColor: '#ffffff',
        fill: '#409Eff',
        disabled: false,
        min: undefined,
        max: undefined,
        alias: {
          value: 'value',
          label: 'label',
          disabled: 'disabled',
        },
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '复选框',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultCheckboxAttrs }),
    componentSchema: checkboxTemplateSchema,
    componentOptionsConfig: checkboxTemplateOptionsConfig,
    fieldFormData: reactive({
      field: key,
      default: [],
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
