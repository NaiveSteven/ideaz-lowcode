import { uid } from '@ideal-schema/shared';

export const selectTemplateSchema = [
  {
    type: 'option-item-widget',
    prop: 'options',
    formItem: { label: '数据源', class: 'form-item-options__container' },
  },
  {
    type: 'select',
    prop: 'size',
    formItem: { label: '尺寸' },
    attrs: {
      placeholder: '请选择尺寸',
    },
  },
  {
    type: 'input',
    prop: 'placeholder',
    formItem: { label: '占位文本' },
    attrs: {
      placeholder: '请输入占位文本',
    },
  },
  {
    type: 'input',
    prop: 'popperClass',
    formItem: { label: '下拉框类名' },
    attrs: {
      placeholder: '请输入下拉框类名',
    },
  },
  {
    type: 'el-switch',
    prop: 'clearable',
    formItem: { label: '清空' },
  },
  {
    type: 'el-switch',
    prop: 'disabled',
    formItem: { label: '禁用' },
  },
  {
    type: 'el-switch',
    prop: 'filterable',
    formItem: { label: '搜索' },
  },
];

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
};

export const selectTableProSchema = [
  {
    type: 'option-item-widget',
    prop: 'options',
    formItem: { label: '数据源', class: 'form-item-options__container' },
  },
  {
    type: 'input',
    prop: 'placeholder',
    formItem: { label: '占位文本' },
    attrs: {
      placeholder: '请输入占位文本',
    },
  },
  {
    type: 'el-switch',
    prop: 'clearable',
    formItem: { label: '清空' },
  },
  {
    type: 'el-switch',
    prop: 'disabled',
    formItem: { label: '禁用' },
  },
  {
    type: 'el-switch',
    prop: 'filterable',
    formItem: { label: '搜索' },
  },
];

export const SelectTableProFormData = {
  options: [{ label: '标签', value: '1', key: uid() }],
  placeholder: '',
  clearable: true,
  disabled: false,
  filterable: true,
};
