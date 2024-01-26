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
    field: 'pagination',
    label: '分页',
  },
]

export const crudFormTemplateSchema = [
  {
    component: 'input',
    field: 'labelWidth',
    label: '标签宽度',
  },
  {
    component: 'el-switch',
    field: 'collapsed',
    label: '表单默认展开',
  },
]

export const crudTableOptionsConfig = {
  background: [
    { label: '页面', value: 'page' },
    { label: '弹窗', value: 'dialog' },
  ],
}
