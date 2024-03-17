import { uid } from '@ideal-schema/shared'
import {
  VirtualizedSelectTemplateOptionsConfig,
  VirtualizedSelectTemplateSchema,
  defaultVirtualizedSelectAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
} from '../schemas'

export function VirtualizedSelectTemplateComponent(key = uid()): WorkspaceComponentItem {
  return {
    id: uid(),
    icon: 'i-camera',
    title: '虚拟化选择器',
    schema: {
      component: 'el-select-v2',
      field: key,
      label: '虚拟化选择器',
      fieldProps: {
        placeholder: '',
        popperClass: '',
        clearable: true,
        disabled: false,
        filterable: true,
        props: {
          value: 'value',
          label: 'label',
          disabled: 'disabled',
        },
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '虚拟化选择器',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultVirtualizedSelectAttrs }),
    componentSchema: VirtualizedSelectTemplateSchema,
    componentOptionsConfig: VirtualizedSelectTemplateOptionsConfig,
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
