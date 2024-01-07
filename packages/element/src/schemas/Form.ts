export const formTemplateSchema = [
  {
    type: 'select',
    prop: 'background',
    formItem: { label: '背景' },
    attrs: {
      placeholder: '请选择背景',
    },
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
    type: 'select',
    prop: 'labelPosition',
    formItem: { label: '标签位置' },
    attrs: {
      placeholder: '请选择标签位置',
    },
  },
  {
    type: 'input',
    prop: 'labelWidth',
    formItem: { label: '标签宽度' },
    attrs: {
      placeholder: '请输入标签宽度',
    },
  },
  {
    type: 'input',
    prop: 'labelSuffix',
    formItem: { label: '标签后缀' },
    attrs: {
      placeholder: '请输入标签后缀',
    },
  },
  {
    type: 'el-switch',
    prop: 'disabled',
    formItem: { label: '禁用' },
  },
  {
    type: 'el-switch',
    prop: 'colon',
    formItem: { label: '冒号' },
  },
  {
    type: 'el-switch',
    prop: 'hideRequiredAsterisk',
    formItem: { label: '必填星号隐藏' },
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
  {
    type: 'el-switch',
    prop: 'statusIcon',
    formItem: { label: '反馈图标显示' },
  },
  {
    type: 'el-switch',
    prop: 'validateOnRuleChange',
    formItem: { label: 'rule触发验证' },
  },
];

export const formTemplateOptionsConfig = {
  background: [
    {
      label: '页面',
      value: 'page',
    },
    {
      label: '弹窗',
      value: 'dialog',
    },
  ],
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
  labelPosition: [
    {
      label: 'left',
      value: 'left',
    },
    {
      label: 'right',
      value: 'right',
    },
    {
      label: 'top',
      value: 'top',
    },
  ],
};
