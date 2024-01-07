export const dateRangeTemplateSchema = [
  {
    type: 'select',
    prop: 'size',
    formItem: { label: '尺寸' },
    attrs: {
      placeholder: '请选择尺寸',
    },
  },
  {
    type: 'input',
    prop: 'startPlaceholder',
    formItem: { label: '开始日期占位内容' },
  },
  {
    type: 'input',
    prop: 'endPlaceholder',
    formItem: { label: '结束日期占位内容' },
  },
  {
    type: 'input',
    prop: 'valueFormat',
    formItem: { label: '日期格式' },
  },
  {
    type: 'el-switch',
    prop: 'disabled',
    formItem: { label: '禁用' },
  },
  {
    type: 'el-switch',
    prop: 'clearable',
    formItem: { label: '清空' },
  },
];

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
};

export const dateRangeTableProSchema = [
  {
    type: 'input',
    prop: 'startPlaceholder',
    formItem: { label: '开始日期占位内容' },
  },
  {
    type: 'input',
    prop: 'endPlaceholder',
    formItem: { label: '结束日期占位内容' },
  },
  {
    type: 'input',
    prop: 'valueFormat',
    formItem: { label: 'value绑定格式' },
  },
];

export const dateRangeTableProFormData = {
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间',
  valueFormat: 'yyyy-MM-dd',
};
