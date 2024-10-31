export const crudTableTemplateSchema = [
  {
    component: 'switch',
    field: 'request',
    label: '内置接口处理',
    tooltip: '表格数据等接口组件内部处理，否则需要手动处理调用',
  },
  {
    component: 'switch',
    field: 'action',
    label: '内置操作',
    tooltip: '增删改查操作内置处理，否则需要手动处理，结合request使用风味更佳',
  },
  {
    component: 'select',
    field: 'background',
    label: '场景',
    tooltip: '代码生成会按照不同的场景生成适配的代码',
    fieldProps: {
      clearable: false,
    },
  },
  {
    component: 'select',
    field: 'size',
    label: '尺寸',
    fieldProps: {
      clearable: false,
    },
  },
  {
    component: 'input',
    field: 'rowKey',
    label: 'rowKey',
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
  size: [
    { label: 'large', value: 'large' },
    { label: 'default', value: 'default' },
    { label: 'small', value: 'small' },
  ],
}
