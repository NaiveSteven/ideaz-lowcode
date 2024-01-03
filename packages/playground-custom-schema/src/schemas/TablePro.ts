export const tableProTableTemplateSchema = [
  {
    type: 'select',
    prop: 'background',
    formItem: { label: '背景' },
  },
  {
    type: 'input',
    prop: 'rowKey',
    formItem: { label: '行数据的key' },
    attrs: {
      placeholder: '请输入行数据key',
    },
  },
  {
    type: 'input',
    prop: 'formDecorator',
    formItem: { label: '表单容器' },
    attrs: {
      placeholder: '请输入表单容器',
    },
  },
  {
    type: 'input',
    prop: 'tableDecorator',
    formItem: { label: '表格容器' },
    attrs: {
      placeholder: '请输入表格容器',
    },
  },
  {
    type: 'el-switch',
    prop: 'defaultExpand',
    formItem: { label: '表单默认展开' },
  },
  {
    type: 'el-switch',
    prop: 'pagination',
    formItem: { label: '分页' },
  },
];

export const tableProFormTemplateSchema = [
  // {
  //   type: 'select',
  //   prop: 'size',
  //   formItem: { label: '尺寸' },
  //   attrs: {
  //     placeholder: '请选择尺寸',
  //   },
  // },
  {
    type: 'input',
    prop: 'labelWidth',
    formItem: { label: '标签宽度' },
    attrs: {
      placeholder: '请输入标签宽度',
    },
  },
];

export const tableProTableOptionsConfig = {
  background: [
    { label: '页面', value: 'page' },
    { label: '弹窗', value: 'dialog' },
  ],
};
