import { uid } from '@ideal-schema/shared'

export const selectTemplateSchema = [
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
    field: 'alias.value',
    label: 'value字段名',
    tooltip: 'value自定义字段名',
  },
  {
    component: 'input',
    field: 'alias.label',
    label: 'label字段名',
    tooltip: 'label自定义字段名',
  },
  {
    component: 'input',
    field: 'alias.disabled',
    label: '禁用字段名',
    tooltip: 'disabled自定义字段名',
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

export const selectTemplateOptionsConfig = {
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

export const selectCrudSchema = [
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
    field: 'alias.value',
    label: 'value字段名',
    tooltip: 'value自定义字段名',
  },
  {
    component: 'input',
    field: 'alias.label',
    label: 'label字段名',
    tooltip: 'label自定义字段名',
  },
  {
    component: 'input',
    field: 'alias.disabled',
    label: '禁用字段名',
    tooltip: 'disabled自定义字段名',
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

export const SelectCrudFormData = {
  options: [{ label: '标签', value: '1', key: uid() }],
  placeholder: '',
  clearable: true,
  disabled: false,
  filterable: true,
  alias: {
    value: 'value',
    label: 'label',
    disabled: 'disabled',
  },
}

export const defaultSelectAttrs = {
  options: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  alias: {
    value: 'value',
    label: 'label',
    disabled: 'disabled',
  },
  select: '',
  placeholder: '',
  popperClass: '',
  clearable: true,
  disabled: false,
  filterable: true,
}
