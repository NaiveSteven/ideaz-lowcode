export const inputTemplateSchema = [
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
    field: 'showPassword',
    label: '密码切换',
  },
]

export const inputTemplateOptionsConfig = {
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

export const inputTableProSchema = [
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
    component: 'el-switch',
    field: 'clearable',
    label: '清空',
  },
  {
    component: 'el-switch',
    field: 'showWordLimit',
    label: '字数统计',
  },
]

export const inputTableProFormData = {
  minlength: undefined,
  maxlength: undefined,
  placeholder: '',
  clearable: true,
  showWordLimit: false,
}
