export const timeSelectTemplateSchema = [
  {
    component: 'input',
    field: 'start',
    label: '开始时间',
  },
  {
    component: 'input',
    field: 'end',
    label: '结束时间',
  },
  {
    component: 'input',
    field: 'step',
    label: '间隔时间',
  },
  {
    component: 'input',
    field: 'minTime',
    label: '最早时间点',
  },
  {
    component: 'input',
    field: 'maxTime',
    label: '最晚时间点',
  },
  {
    component: 'input',
    field: 'format',
    label: '时间格式',
  },
  {
    component: 'input',
    field: 'placeholder',
    label: '占位内容',
  },
  {
    component: 'input',
    field: 'prefixIcon',
    label: '前缀图标',
  },
  {
    component: 'input',
    field: 'clearIcon',
    label: '清空图标',
  },
  {
    component: 'el-switch',
    field: 'editable',
    label: '可输入',
  },
  {
    component: 'el-switch',
    field: 'disabled',
    label: '禁用',
  },
  {
    component: 'el-switch',
    field: 'clearable',
    label: '清空',
  },
]

export const timeSelectTemplateOptionsConfig = {}

export const defaultTimeSelectAttrs = {
  clearable: true,
  disabled: false,
  placeholder: '',
  format: 'HH:mm',
  start: '09:00',
  end: '18:00',
  step: '00:30',
  minTime: '',
  maxTime: '',
  editable: false,
  prefixIcon: 'i-clock',
  clearIcon: 'i-circle-close',
}
