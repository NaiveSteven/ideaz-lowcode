export const crudTableTemplateSchema = [
  {
    component: 'select',
    field: 'background',
    label: '背景',
  },
  {
    component: 'input',
    field: 'rowKey',
    label: '行数据的key',
  },
  {
    component: 'input',
    field: 'formDecorator',
    label: '表单容器',
  },
  {
    component: 'input',
    field: 'tableDecorator',
    label: '表格容器',
  },
  {
    component: 'el-switch',
    field: 'defaultExpand',
    label: '表单默认展开',
  },
  {
    component: 'el-switch',
    field: 'pagination',
    label: '分页',
  },
]

export const crudFormTemplateSchema = [
  // {
  //   component: 'select',
  //   field: 'size',
  //   formItem: { label: '尺寸' },
  //   attrs: {
  //     placeholder: '请选择尺寸',
  //   },
  // },
  {
    component: 'input',
    field: 'labelWidth',
    label: '标签宽度',
  },
]

export const crudTableOptionsConfig = {
  background: [
    { label: '页面', value: 'page' },
    { label: '弹窗', value: 'dialog' },
  ],
}
