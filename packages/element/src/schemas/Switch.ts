export const switchTemplateSchema = [
  {
    type: 'el-input-number',
    prop: 'width',
    formItem: { label: '宽度' },
    attrs: {
      controlsPosition: 'right',
    },
  },
  {
    type: 'input',
    prop: 'activeText',
    formItem: { label: '文字描述' },
    attrs: {
      placeholder: '请输入switch打开的文字描述',
    },
  },
  {
    type: 'input',
    prop: 'inactiveText',
    formItem: { label: '关闭时文字描述' },
    attrs: {
      placeholder: '请输入switch关闭的文字描述',
    },
  },
  // {
  //   type: 'input',
  //   prop: 'activeColor',
  //   formItem: { label: '打开的背景色' },
  //   attrs: {
  //     placeholder: '请输入switch打开的背景色',
  //   },
  // },
  // {
  //   type: 'input',
  //   prop: 'inactiveColor',
  //   formItem: { label: '关闭的背景色' },
  //   attrs: {
  //     placeholder: '请输入switch关闭的背景色',
  //   },
  // },
  {
    type: 'el-switch',
    prop: 'disabled',
    formItem: { label: '禁用' },
  },
];
