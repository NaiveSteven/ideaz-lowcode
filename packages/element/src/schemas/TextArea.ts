export const textareaTemplateSchema = [
  {
    component: 'el-input-number',
    field: 'rows',
    label: '行数',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'el-input-number',
    field: 'minlength',
    label: '最小长度',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'el-input-number',
    field: 'maxlength',
    label: '最大长度',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'input',
    field: 'placeholder',
    label: '占位文本',
  },
  {
    component: 'input',
    field: 'suffixIcon',
    label: '后缀图标',
  },
  {
    component: 'input',
    field: 'prefixIcon',
    label: '前缀图标',
  },
  {
    component: 'el-switch',
    field: 'clearable',
    label: '清空',
  },
  {
    component: 'el-switch',
    field: 'readonly',
    label: '只读',
  },
  {
    component: 'el-switch',
    field: 'disabled',
    label: '禁用',
  },
  {
    component: 'el-switch',
    field: 'showWordLimit',
    label: '字数统计',
  },
  {
    component: 'el-switch',
    field: 'autosize',
    label: '高度自适应',
  },
]

export const defaultTextareaAttrs = {
  type: 'textarea',
  rows: 2,
  minlength: undefined,
  maxlength: undefined,
  placeholder: '',
  suffixIcon: '',
  prefixIcon: '',
  clearable: true,
  readonly: false,
  disabled: false,
  showWordLimit: false,
  autosize: false,
}
