import { uid } from '@ideal-schema/shared'

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
    component: 'input',
    field: 'alias.value',
    label: 'value字段名',
    tooltip: 'value自定义字段名',
  },
  {
    component: 'input',
    field: 'alias.label',
    label: 'label字段名',
    tooltip: 'label自定义字段名',
  },
  {
    component: 'input',
    field: 'alias.disabled',
    label: '禁用字段名',
    tooltip: 'disabled自定义字段名',
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

export const defaultCheckboxAttrs = {
  checkbox: [],
  options: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  textColor: '#ffffff',
  fill: '#409Eff',
  disabled: false,
  min: undefined,
  max: undefined,
  alias: {
    value: 'value',
    label: 'label',
    disabled: 'disabled',
  },
}
