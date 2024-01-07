export const inputTemplateSchema = [
  {
    type: 'select',
    prop: 'size',
    formItem: { label: '尺寸' },
    attrs: {
      placeholder: '请选择尺寸',
    },
  },
  {
    type: 'el-input-number',
    prop: 'minlength',
    formItem: { label: '最小长度' },
    attrs: {
      // placeholder: '请输入最小长度',
      controlsPosition: 'right',
    },
  },
  {
    type: 'el-input-number',
    prop: 'maxlength',
    formItem: { label: '最大长度' },
    attrs: {
      // placeholder: '请输入最大长度',
      controlsPosition: 'right',
    },
  },
  {
    type: 'input',
    prop: 'placeholder',
    formItem: { label: '占位文本' },
    attrs: {
      placeholder: '请输入占位文本',
    },
  },
  {
    type: 'input',
    prop: 'suffixIcon',
    formItem: { label: '后缀图标' },
    attrs: {
      placeholder: '请输入后缀图标',
    },
  },
  {
    type: 'input',
    prop: 'prefixIcon',
    formItem: { label: '前缀图标' },
    attrs: {
      placeholder: '请输入前缀图标',
    },
  },
  {
    type: 'el-switch',
    prop: 'clearable',
    formItem: { label: '清空' },
  },
  {
    type: 'el-switch',
    prop: 'readonly',
    formItem: { label: '只读' },
  },
  {
    type: 'el-switch',
    prop: 'disabled',
    formItem: { label: '禁用' },
  },
  {
    type: 'el-switch',
    prop: 'showWordLimit',
    formItem: { label: '字数统计' },
  },
  {
    type: 'el-switch',
    prop: 'showPassword',
    formItem: { label: '密码切换' },
  },
];

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
};

export const inputTableProSchema = [
  {
    type: 'el-input-number',
    prop: 'minlength',
    formItem: { label: '最小长度' },
    attrs: {
      // placeholder: '请输入最小长度',
      controlsPosition: 'right',
    },
  },
  {
    type: 'el-input-number',
    prop: 'maxlength',
    formItem: { label: '最大长度' },
    attrs: {
      // placeholder: '请输入最大长度',
      controlsPosition: 'right',
    },
  },
  {
    type: 'input',
    prop: 'placeholder',
    formItem: { label: '占位文本' },
    attrs: {
      placeholder: '请输入占位文本',
    },
  },
  {
    type: 'el-switch',
    prop: 'clearable',
    formItem: { label: '清空' },
  },
  {
    type: 'el-switch',
    prop: 'showWordLimit',
    formItem: { label: '字数统计' },
  },
];

export const inputTableProFormData = {
  minlength: undefined,
  maxlength: undefined,
  placeholder: '',
  clearable: true,
  showWordLimit: false,
};
