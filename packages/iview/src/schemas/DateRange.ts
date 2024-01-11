export const dateRangeTemplateSchema = [
  {
    component: 'input',
    field: 'startPlaceholder',
    label: '开始日期占位内容',
  },
  {
    component: 'input',
    field: 'endPlaceholder',
    label: '结束日期占位内容',
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

export const dateRangeTemplateOptionsConfig = {
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

export const dateRangeTableProSchema = [
  {
    component: 'input',
    field: 'startPlaceholder',
    label: '开始日期占位内容',
  },
  {
    component: 'input',
    field: 'endPlaceholder',
    label: '结束日期占位内容',
  },
  {
    component: 'input',
    field: 'valueFormat',
    label: 'value格式',
  },
]

export const dateRangeTableProFormData = {
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间',
  valueFormat: 'yyyy-MM-dd',
}

export const defaultDateRangeAttrs = {
  component: 'daterange',
  clearable: true,
  disabled: false,
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  valueFormat: 'yyyy-MM-dd',
}
