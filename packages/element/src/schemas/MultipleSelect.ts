import { uid } from '@ideal-schema/shared'

export const multipleSelectTemplateSchema = [
  {
    component: 'option-item-widget',
    field: 'options',
    label: '数据源',
    formItemProps: { class: 'form-item-options__container' },
  },
  {
    component: 'select',
    field: 'size',
    label: '尺寸',
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
    component: 'el-input-number',
    field: 'multipleLimit',
    label: '最多选择数',
    fieldProps: {
      controlsPosition: 'right',
    },
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
  {
    component: 'el-switch',
    field: 'collapseTags',
    label: '值按文字展示',
  },
]

export const multipleSelectTemplateOptionsConfig = {
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

export const multipleSelectCrudSchema = [
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
]

export const multipleSelectCrudFormData = {
  options: [{ label: '标签', value: '1', key: uid() }],
  placeholder: '',
}

export const defaultMultipleSelectAttrs = {
  multipleSelect: [],
  options: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  multiple: true,
  placeholder: '',
  popperClass: '',
  clearable: true,
  disabled: false,
  filterable: true,
  collapseTags: false,
  multipleLimit: 0,
  alias: {
    value: 'value',
    label: 'label',
    disabled: 'disabled',
  },
}
