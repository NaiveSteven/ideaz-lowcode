import { uid } from '@ideal-schema/shared'
import {
  defaultTreeSelectAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  treeSelectTemplateOptionsConfig,
  treeSelectTemplateSchema,
} from '../schemas'

export function TreeSelectTemplateComponent(key = uid()): WorkspaceComponentItem {
  return {
    id: uid(),
    icon: 'i-bicycle',
    title: '树形选择',
    schema: {
      component: 'el-tree-select',
      field: key,
      label: '树形选择',
      fieldProps: {
        data: [
          { label: '标签1', value: '1', key: uid() },
          { label: '标签2', value: '2', key: uid() },
        ],
        placeholder: '',
        clearable: true,
        multiple: false,
        disabled: false,
        filterable: true,
        showCheckbox: false,
        highlightCurrent: false,
        defaultExpandAll: false,
        expandOnClickNode: false,
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '树形选择',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultTreeSelectAttrs }),
    componentSchema: treeSelectTemplateSchema,
    componentOptionsConfig: treeSelectTemplateOptionsConfig,
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
