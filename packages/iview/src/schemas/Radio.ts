export const radioTemplateSchema = [
  {
    component: 'option-item-widget',
    field: 'options',
    label: '数据源',
    formItemProps: { class: 'form-item-options__container' },
  },
  {
    component: 'input',
    field: 'textColor',
    label: '激活文本颜色',
  },
  {
    component: 'input',
    field: 'fill',
    label: '激活填充色和边框色',
  },
  {
    component: 'el-switch',
    field: 'disabled',
    label: '禁用',
  },
]

export const radioTemplateOptionsConfig = {
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
