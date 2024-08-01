export const arrayFormTemplateSchema = [
  {
    component: 'el-input-number',
    field: 'max',
    label: '最大表单项数量',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'el-switch',
    field: 'action',
    label: '操作项',
  },
]

export const defaultArrayFormAttrs = {
  action: false,
  max: undefined,
}
