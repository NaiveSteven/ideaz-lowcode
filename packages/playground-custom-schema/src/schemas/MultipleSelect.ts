import { uid } from '@ideal-schema/shared';

export const multipleSelectTemplateSchema = [
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
    type: 'el-input-number',
    prop: 'multipleLimit',
    formItem: { label: '最多选择数' },
    attrs: {
      controlsPosition: 'right',
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
  {
    type: 'el-switch',
    prop: 'collapseTags',
    formItem: { label: '多选值按文字展示' },
  },
];

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
};

export const multipleSelectTableProSchema = [
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
];

export const multipleSelectTableProFormData = {
  options: [{ label: '标签', value: '1', key: uid() }],
  placeholder: '',
};
