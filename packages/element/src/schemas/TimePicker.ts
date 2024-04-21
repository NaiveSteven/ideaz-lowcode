export const timePickerTemplateSchema = [
  {
    component: 'input',
    field: 'format',
    label: '输入框格式',
  },
  {
    component: 'input',
    field: 'valueFormat',
    label: '绑定值格式',
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
    label: '清除图标',
  },
  {
    component: 'el-switch',
    field: 'arrowControl',
    label: '箭头选择',
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

export const timePickerTemplateOptionsConfig = {}

export const defaultTimePickerAttrs = {
  clearable: true,
  disabled: false,
  placeholder: '',
  format: 'HH:mm:ss',
  valueFormat: 'HH:mm:ss',
  arrowControl: false,
  editable: true,
  prefixIcon: 'i-clock',
  clearIcon: 'i-circle-close',
}
