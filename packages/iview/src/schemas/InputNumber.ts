export const inputNumberTemplateSchema = [
  {
    component: 'select',
    field: 'controlsPosition',
    label: '控制按钮位置',
  },
  {
    component: 'el-input-number',
    field: 'min',
    label: '最小值',
  },
  {
    component: 'el-input-number',
    field: 'max',
    label: '最大值',
  },
  {
    component: 'el-input-number',
    field: 'step',
    label: '计数器步长',
  },
  {
    component: 'input',
    field: 'placeholder',
    label: '占位文本',
  },
  {
    component: 'input',
    field: 'precision',
    label: '数值精度',
  },
  {
    component: 'el-switch',
    field: 'disabled',
    label: '禁用',
  },
  {
    component: 'el-switch',
    field: 'controls',
    label: '控制按钮',
  },
  {
    component: 'el-switch',
    field: 'stepStrictly',
    label: 'Step倍数',
    tooltip: '是否只能输入 step 的倍数',
  },
]

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
}
