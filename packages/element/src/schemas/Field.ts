export function fieldTemplateSchema(opts: { defaultComponent: string, defaultProps?: IndexType, required?: boolean } = {
  defaultComponent: 'input',
  defaultProps: {},
  required: true,
}) {
  const arr: FormItemConfigItem[] = [
    {
      component: 'input',
      field: 'field',
      label: '字段名',
    },
    {
      component: opts.defaultComponent,
      field: 'default',
      label: '默认值',
      fieldProps: opts.defaultProps,
    },
  ]
  if (opts.required) {
    return arr.concat([
      {
        component: 'el-switch',
        field: 'required',
        label: '必填',
      },
    ])
  }
  return arr
}
