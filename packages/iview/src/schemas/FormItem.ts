export const formItemTemplateSchema = [
  {
    component: 'input',
    field: 'label',
    label: '标签',
  },
  {
    component: 'input',
    field: 'tooltip',
    label: '提示',
  },
  {
    component: 'input',
    field: 'extra',
    label: '额外信息',
  },
  {
    component: 'input',
    field: 'errorMessage',
    label: '错误信息',
  },
  {
    component: 'el-switch',
    field: 'showMessage',
    label: '错误信息显示',
  },
]

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
}

export const formItemFormData = {
  label: '',
  tooltip: '',
  extra: '',
  errorMessage: '',
  showMessage: true,
  inlineMessage: false,
  required: false,
}
