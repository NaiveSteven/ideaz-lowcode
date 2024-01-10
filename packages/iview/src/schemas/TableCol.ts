export function tableColTemplateSchema(formData: any) {
  return [
    {
      component: 'select',
      field: 'type',
      label: '类型',
    },
    {
      component: 'input',
      field: 'prop',
      label: 'field',
      fieldProps: {
        placeholder: '请输入列字段名',
      },
    },
    {
      component: 'input',
      field: 'label',
      label: '标题',
    },
    {
      component: 'input',
      field: 'width',
      label: '宽度',
    },
    {
      component: 'el-switch',
      field: 'showOverflowTooltip',
      label: '内容过长隐藏',
    },
    {
      component: 'buttons-config',
      field: 'btnList',
      hide: () => formData.type !== 'button',
      label: '按钮',
      formItemProps: { class: 'form-item-options__container' },
    },
  ]
}

export const tableColTemplateOptionsConfig = {
  type: [
    {
      label: '默认',
      value: 'default',
    },
    {
      label: '多选框',
      value: 'selection',
    },
    {
      label: '单选框',
      value: 'radio',
    },
    {
      label: '索引',
      value: 'index',
    },
    {
      label: '展开',
      value: 'expand',
    },
    {
      label: '选择框',
      value: 'select',
    },
    {
      label: '输入框',
      value: 'input',
    },
    {
      label: '按钮',
      value: 'button',
    },
    {
      label: '插槽',
      value: 'slot',
    },
  ],
}

export const tableColFormData = {
  type: 'default',
  prop: '',
  label: '',
  width: undefined,
  showOverflowTooltip: false,
  slot: '',
}
