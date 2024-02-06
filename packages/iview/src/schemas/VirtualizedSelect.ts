import { uid } from '@ideal-schema/shared'

export const VirtualizedSelectTemplateSchema = [
  {
    component: 'option-item-widget',
    field: 'options',
    label: '数据源',
    formItemProps: { class: 'form-item-options__container' },
  },
  {
    component: 'input',
    field: 'placeholder',
    label: '占位文本',
  },
  {
    component: 'input',
    field: 'popperClass',
    label: '下拉框类名',
  },
  {
    component: 'el-switch',
    field: 'clearable',
    label: '清空',
  },
  {
    component: 'el-switch',
    field: 'disabled',
    label: '禁用',
  },
  {
    component: 'el-switch',
    field: 'filterable',
    label: '搜索',
  },
]

export const VirtualizedSelectTemplateOptionsConfig = {
  size: [
    {
      label: 'large',
      value: 'large',
    },
    {
      label: 'default',
      value: 'default',
    },
    {
      label: 'small',
      value: 'small',
    },
  ],
}

export const VirtualizedSelectCrudSchema = [
  {
    component: 'option-item-widget',
    field: 'options',
    label: '数据源',
    formItemProps: { class: 'form-item-options__container' },
  },
  {
    component: 'input',
    field: 'placeholder',
    label: '占位文本',
  },
  {
    component: 'el-switch',
    field: 'clearable',
    label: '清空',
  },
  {
    component: 'el-switch',
    field: 'disabled',
    label: '禁用',
  },
  {
    component: 'el-switch',
    field: 'filterable',
    label: '搜索',
  },
]

export const VirtualizedSelectCrudFormData = {
  options: [{ label: '标签', value: '1', key: uid() }],
  placeholder: '',
  clearable: true,
  disabled: false,
  filterable: true,
}

export const defaultVirtualizedSelectAttrs = {
  options: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  select: '',
  placeholder: '',
  popperClass: '',
  clearable: true,
  disabled: false,
  filterable: true,
}
