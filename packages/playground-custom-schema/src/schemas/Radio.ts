export const radioTemplateSchema = [
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
    prop: 'textColor',
    formItem: { label: '激活文本颜色' },
    attrs: {
      placeholder: '请输入激活文本颜色',
    },
  },
  {
    type: 'input',
    prop: 'fill',
    formItem: { label: '激活填充色和边框色' },
    attrs: {
      placeholder: '请输入激活填充色和边框色',
    },
  },
  {
    type: 'el-switch',
    prop: 'disabled',
    formItem: { label: '禁用' },
  },
];

export const radioTemplateOptionsConfig = {
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
