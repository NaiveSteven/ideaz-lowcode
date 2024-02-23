export const sliderTemplateSchema = [
  {
    component: 'el-input-number',
    field: 'min',
    label: '最小值',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'el-input-number',
    field: 'max',
    label: '最大值',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'el-input-number',
    field: 'step',
    label: '计数器步长',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'el-switch',
    field: 'showStops',
    label: '显示间断点',
  },
  {
    component: 'el-switch',
    field: 'showTooltip',
    label: '显示提示信息',
  },
  {
    component: 'el-switch',
    field: 'validateEvent',
    label: '输入触发校验',
  },
]

export const sliderTemplateOptionsConfig = {}

export const defaultSliderAttrs = {
  min: 0,
  max: 100,
  step: 1,
  showStops: false,
  showTooltip: true,
  validateEvent: true
}
