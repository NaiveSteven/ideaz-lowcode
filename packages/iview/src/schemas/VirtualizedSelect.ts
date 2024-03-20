import { uid } from '@ideal-schema/shared'

export const VirtualizedSelectTemplateSchema = [
  {
    component: 'option-item-widget',
    field: 'options',
    label: '数据源',
    formItemProps: { class: 'form-item-options__container' },
  },
  {
    component: 'input',
    field: 'props.value',
    label: 'value字段名',
    tooltip: 'value自定义字段名',
  },
  {
    component: 'input',
    field: 'props.label',
    label: 'label字段名',
    tooltip: 'label自定义字段名',
  },
  {
    component: 'input',
    field: 'props.disabled',
    label: '禁用字段名',
    tooltip: 'disabled自定义字段名',
  },
  {
    component: 'input',
    field: 'placeholder',
    label: '占位文本',
  },
  {
    component: 'input',
    field: 'popperClass',
    label: '下拉框类名',
  },
  {
    component: 'el-switch',
    field: 'multiple',
    label: '开启多选',
  },
  {
    component: 'el-switch',
    field: 'collapseTags',
    label: '文字形式',
    hide: (formData: IndexType) => formData.multiple === false,
    tooltip: '多选时是否将选中值按文字的形式展示',
  },
  {
    component: 'el-input-number',
    field: 'multipleLimit',
    label: '可选最大数',
    hide: (formData: IndexType) => formData.multiple === false,
    tooltip: '多选时可被选择的最大数目。 当被设置为0时，可被选择的数目不设限。',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'el-input-number',
    field: 'maxCollapseTags',
    label: 'Tag显示数',
    hide: (formData: IndexType) => formData.multiple === false,
    tooltip: '需要显示的 Tag 的最大数量 只有当 collapse-tags 设置为 true 时才会生效。',
    fieldProps: {
      controlsPosition: 'right',
    },
  },
  {
    component: 'el-switch',
    field: 'collapseTagsTooltip',
    label: '悬停显示',
    hide: (formData: IndexType) => formData.multiple === false,
    tooltip: '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 只有当 collapse-tags 设置为 true 时才会生效。',
  },
  {
    component: 'el-switch',
    field: 'clearable',
    label: '清空',
  },
  {
    component: 'el-switch',
    field: 'disabled',
    label: '禁用',
  },
  {
    component: 'el-switch',
    field: 'filterable',
    label: '搜索',
  },
]

export const VirtualizedSelectTemplateOptionsConfig = {
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

export const VirtualizedSelectCrudSchema = [
  {
    component: 'option-item-widget',
    field: 'options',
    label: '数据源',
    formItemProps: { class: 'form-item-options__container' },
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
    field: 'disabled',
    label: '禁用',
  },
  {
    component: 'el-switch',
    field: 'filterable',
    label: '搜索',
  },
]

export const VirtualizedSelectCrudFormData = {
  options: [{ label: '标签', value: '1', key: uid() }],
  placeholder: '',
  clearable: true,
  disabled: false,
  filterable: true,
}

export const defaultVirtualizedSelectAttrs = {
  options: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  props: {
    value: 'value',
    label: 'label',
    disabled: 'disabled',
  },
  select: '',
  placeholder: '',
  popperClass: '',
  clearable: true,
  disabled: false,
  filterable: true,
  multiple: false,
  collapseTags: false,
  multipleLimit: 0,
  collapseTagsTooltip: false,
  maxCollapseTags: 1,
}
