export const formItemTemplateSchema = [
  // {
  //   type: 'select',
  //   prop: 'size',
  //   formItem: { label: '尺寸' },
  //   attrs: {
  //     placeholder: '请选择尺寸',
  //   },
  // },
  {
    type: 'input',
    prop: 'label',
    formItem: { label: '标签' },
    attrs: {
      placeholder: '请输入标签',
    },
  },
  // {
  //   type: 'input',
  //   prop: 'labelWidth',
  //   formItem: { label: '标签宽度' },
  //   attrs: {
  //     placeholder: '请输入标签宽度',
  //   },
  // },
  {
    type: 'input',
    prop: 'tooltip',
    formItem: { label: '提示' },
    attrs: {
      placeholder: '请输入提示',
    },
  },
  {
    type: 'input',
    prop: 'extra',
    formItem: { label: '额外信息' },
    attrs: {
      placeholder: '请输入额外信息',
    },
  },
  {
    type: 'input',
    prop: 'errorMessage',
    formItem: { label: '错误信息' },
    attrs: {
      placeholder: '请输入错误信息',
    },
  },
  {
    type: 'el-switch',
    prop: 'showMessage',
    formItem: { label: '错误信息显示' },
  },
  {
    type: 'el-switch',
    prop: 'inlineMessage',
    formItem: { label: '行内表单' },
  },
];

export const formItemTemplateOptionsConfig = {
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

export const formItemFormData = {
  label: '',
  size: 'default',
  // labelWidth: '100px',
  tooltip: '',
  extra: '',
  errorMessage: '',
  showMessage: true,
  inlineMessage: false,
};
