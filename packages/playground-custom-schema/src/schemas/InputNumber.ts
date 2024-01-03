export const inputNumberTemplateSchema = [
  {
    type: 'select',
    prop: 'size',
    formItem: { label: '尺寸' },
    attrs: {
      placeholder: '请选择尺寸',
    },
  },
  {
    type: 'select',
    prop: 'controlsPosition',
    formItem: { label: '控制按钮位置' },
    attrs: {
      placeholder: '请选择控制按钮位置',
    },
  },
  {
    type: 'el-input-number',
    prop: 'min',
    formItem: { label: '最小值' },
    attrs: {
      controlsPosition: 'right',
    },
  },
  {
    type: 'el-input-number',
    prop: 'max',
    formItem: { label: '最大值' },
    attrs: {
      controlsPosition: 'right',
    },
  },
  {
    type: 'el-input-number',
    prop: 'step',
    formItem: { label: '计数器步长' },
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
    prop: 'precision',
    formItem: { label: '数值精度' },
    attrs: {
      placeholder: '请输入数值精度',
    },
  },
  {
    type: 'el-switch',
    prop: 'disabled',
    formItem: { label: '禁用' },
  },
  {
    type: 'el-switch',
    prop: 'controls',
    formItem: { label: '控制按钮' },
  },
  {
    type: 'el-switch',
    prop: 'stepStrictly',
    formItem: { label: 'Step倍数', tooltip: '是否只能输入 step 的倍数' },
  },
];

export const inputNumberTemplateOptionsConfig = {
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
  controlsPosition: [
    {
      label: '默认',
      value: '',
    },
    {
      label: 'right',
      value: 'right',
    },
  ],
};
