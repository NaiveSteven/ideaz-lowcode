export const checkboxTemplateSchema = [
  {
    component: 'option-item-widget',
    field: 'options',
    label: '数据源',
    formItemProps: {
      class: 'form-item-options__container',
    },
  },
  {
    component: 'select',
    field: 'size',
    label: '尺寸',
  },
  {
    component: 'el-input-number',
    field: 'min',
    label: '勾选的最小数量',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'el-input-number',
    field: 'max',
    label: '勾选的最大数量',
    fieldProps: {
      controlsPosition: 'right',
    },
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

export const checkboxTemplateOptionsConfig = {
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
