import { uid } from '@ideal-schema/shared'

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

export const defaultRadioAttrs = {
  radio: '',
  options: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  textColor: '#ffffff',
  fill: '#409Eff',
  disabled: false,
}