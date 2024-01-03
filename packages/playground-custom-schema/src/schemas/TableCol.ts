export const tableColTemplateSchema = (formData: any) => [
  {
    type: 'select',
    prop: 'type',
    formItem: { label: '类型' },
    attrs: {
      placeholder: '请选择列类型',
      filterable: true,
    },
  },
  {
    type: 'input',
    prop: 'prop',
    formItem: { label: 'prop' },
    attrs: {
      placeholder: '请输入列字段名',
    },
  },
  {
    type: 'input',
    prop: 'label',
    formItem: { label: '标题' },
    attrs: {
      placeholder: '请输入列标题',
    },
  },
  {
    type: 'input',
    prop: 'width',
    formItem: { label: '宽度' },
    attrs: {
      placeholder: '请输入列宽度',
    },
  },
  {
    type: 'el-switch',
    prop: 'showOverflowTooltip',
    formItem: { label: '内容过长隐藏' },
  },
  {
    type: 'buttons-config',
    prop: 'btnList',
    hide: () => formData.type !== 'button',
    formItem: { label: '按钮', class: 'form-item-options__container' },
  },
];

export const tableColTemplateOptionsConfig = {
  type: [
    {
      label: '默认',
      value: 'default',
    },
    {
      label: '插槽',
      value: 'slot',
    },
    {
      label: 'expand',
      value: 'expand',
    },
    {
      label: 'select',
      value: 'select',
    },
    {
      label: 'input',
      value: 'input',
    },
    {
      label: '按钮',
      value: 'button',
    },
    {
      label: 'selection',
      value: 'selection',
    },
    {
      label: 'radio',
      value: 'radio',
    },
    {
      label: 'index',
      value: 'index',
    },
  ],
};

export const tableColFormData = {
  type: 'default',
  prop: '',
  label: '',
  width: undefined,
  showOverflowTooltip: false,
  slot: '',
};
