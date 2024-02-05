export const dateTemplateSchema = [
  {
    component: 'input',
    field: 'placeholder',
    label: '占位内容',
  },
  {
    component: 'input',
    field: 'valueFormat',
    label: '日期格式',
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

export const dateTemplateOptionsConfig = {}

export const dateCrudSchema = [
  {
    component: 'input',
    field: 'placeholder',
    label: '占位内容',
  },
  {
    component: 'input',
    field: 'valueFormat',
    label: 'value格式',
  },
]

export const dateCrudFormData = {
  placeholder: '',
  valueFormat: 'yyyy-MM-dd',
}

export const defaultDateAttrs = {
  type: 'date',
  clearable: true,
  disabled: false,
  placeholder: '',
  valueFormat: 'yyyy-MM-dd',
}
