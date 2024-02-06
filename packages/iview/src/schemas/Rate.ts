export const rateTemplateSchema = [
  {
    component: 'el-switch',
    field: 'disabled',
    label: '只读',
  },
  {
    component: 'el-input-number',
    field: 'lowThreshold',
    label: '低中界限值',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'el-input-number',
    field: 'highThreshold',
    label: '高中界限值',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'input',
    field: 'voidColor',
    label: '未选中颜色',
  },
  {
    component: 'input',
    field: 'disabledVoidColor',
    label: '只读未选中颜色',
  },
  {
    component: 'input',
    field: 'voidIcon',
    label: '未选中图标',
  },
  {
    component: 'input',
    field: 'disabledVoidIcon',
    label: '只读未选中图标',
  },
  {
    component: 'el-switch',
    field: 'showScore',
    label: '显示分数',
  },
  {
    component: 'el-switch',
    field: 'clearable',
    label: '重置为0',
  },
]

export const rateTemplateOptionsConfig = {}

export const defaultRateAttrs = {
  disabled: false,
  lowThreshold: 2,
  highThreshold: 4,
  voidColor: '#C6D1DE',
  disabledVoidColor: '#EFF2F7',
  voidIcon: 'i-star',
  disabledVoidIcon: 'i-star-filled',
  showScore: false,
  clearable: true,
}
