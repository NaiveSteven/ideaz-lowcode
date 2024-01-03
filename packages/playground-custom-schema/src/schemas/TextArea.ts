export const textareaTemplateSchema = [
  {
    type: 'el-input-number',
    prop: 'rows',
    formItem: { label: '行数' },
    attrs: {
      controlsPosition: 'right',
    },
  },
  {
    type: 'el-input-number',
    prop: 'minlength',
    formItem: { label: '最小长度' },
    attrs: {
      controlsPosition: 'right',
    },
  },
  {
    type: 'el-input-number',
    prop: 'maxlength',
    formItem: { label: '最大长度' },
    attrs: {
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
    prop: 'autosize',
    formItem: { label: '高度自适应' },
  },
];
