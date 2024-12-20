import { uid } from '@ideal-schema/shared'
import {
  defaultSelectAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  selectTemplateOptionsConfig,
  selectTemplateSchema,
} from '../schemas'

export function SelectTemplateComponent(key = uid()): Widget {
  return {
    id: uid(),
    icon: 'icon-xialadanxuan',
    title: '选择框',
    schema: {
      component: 'select',
      field: key,
      label: '选择框',
      fieldProps: {
        placeholder: '',
        popperClass: '',
        clearable: true,
        disabled: false,
        filterable: true,
        alias: {
          value: 'value',
          label: 'label',
          disabled: 'disabled',
        },
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '选择框',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultSelectAttrs }),
    componentSchema: selectTemplateSchema,
    componentOptionsConfig: selectTemplateOptionsConfig,
    fieldFormData: reactive({
      field: key,
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
