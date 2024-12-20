export const formTemplateSchema = [
  {
    component: 'select',
    field: 'background',
    label: '使用场景',
    fieldProps: {
      clearable: false,
    },
  },
  {
    component: 'select',
    field: 'column',
    label: '列数',
    fieldProps: {
      clearable: false,
    },
  },
  {
    component: 'select',
    field: 'size',
    label: '尺寸',
    fieldProps: {
      clearable: false,
    },
  },
  {
    component: 'select',
    field: 'labelPosition',
    label: '标签位置',
    fieldProps: {
      clearable: false,
    },
  },
  {
    component: 'input',
    field: 'labelWidth',
    label: '标签宽度',
  },
  {
    component: 'input',
    field: 'labelSuffix',
    label: '标签后缀',
  },
  {
    component: 'select',
    field: 'requireAsteriskPosition',
    label: '必填星号位置',
    fieldProps: {
      clearable: false,
    },
  },
  {
    component: 'el-switch',
    field: 'hideRequiredAsterisk',
    label: '必填星号隐藏',
  },
  {
    component: 'el-switch',
    field: 'disabled',
    label: '禁用',
  },
  {
    component: 'el-switch',
    field: 'colon',
    label: '冒号',
  },
  {
    component: 'el-switch',
    field: 'showMessage',
    label: '错误信息显示',
  },
  {
    component: 'el-switch',
    field: 'inlineMessage',
    label: '行内表单',
  },
  {
    component: 'el-switch',
    field: 'statusIcon',
    label: '反馈图标显示',
  },
  {
    component: 'el-switch',
    field: 'validateOnRuleChange',
    label: 'rule触发验证',
  },
  {
    component: 'el-switch',
    field: 'scrollToError',
    label: '校验失败滚动',
  },
]

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
  requireAsteriskPosition: [
    {
      label: 'left',
      value: 'left',
    },
    {
      label: 'right',
      value: 'right',
    },
  ],
  column: [
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    },
  ],
}
