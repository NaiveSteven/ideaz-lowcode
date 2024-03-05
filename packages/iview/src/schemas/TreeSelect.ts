import { uid } from '@ideal-schema/shared'

export const treeSelectTemplateSchema = [
  {
    component: 'option-item-widget',
    field: 'data',
    label: '数据源',
    formItemProps: { class: 'form-item-options__container' },
  },
  {
    component: 'input',
    field: 'placeholder',
    label: '占位文本',
  },
  {
    component: 'input',
    field: 'props.label',
    label: '标签字段',
    tooltip: '指定节点标签为节点对象的某个属性值',
  },
  {
    component: 'input',
    field: 'props.children',
    label: '子树字段',
    tooltip: '指定子树为节点对象的某个属性值',
  },
  {
    component: 'input',
    field: 'props.disabled',
    label: '禁用字段',
    tooltip: '指定节点选择框是否禁用为节点对象的某个属性值',
  },
  {
    component: 'el-switch',
    field: 'multiple',
    label: '开启多选',
  },
  {
    component: 'el-switch',
    field: 'showCheckbox',
    label: '开启复选',
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
  {
    component: 'el-switch',
    field: 'highlightCurrent',
    label: '节点高亮',
  },
  {
    component: 'el-switch',
    field: 'defaultExpandAll',
    label: '默认展开节点',
  },
  {
    component: 'el-switch',
    field: 'expandOnClickNode',
    label: '点击节点展开',
    tooltip: '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
  },
]

export const treeSelectTemplateOptionsConfig = {}

export const treeSelectCrudSchema = [
  {
    component: 'option-item-widget',
    field: 'data',
    label: '数据源',
    formItemProps: { class: 'form-item-options__container' },
  },
  {
    component: 'input',
    field: 'placeholder',
    label: '占位文本',
  },
  {
    component: 'input',
    field: 'props.label',
    label: '标签字段',
    tooltip: '指定节点标签为节点对象的某个属性值',
  },
  {
    component: 'input',
    field: 'props.children',
    label: '子树字段',
    tooltip: '指定子树为节点对象的某个属性值',
  },
  {
    component: 'input',
    field: 'props.disabled',
    label: '禁用字段',
    tooltip: '指定节点选择框是否禁用为节点对象的某个属性值',
  },
  {
    component: 'el-switch',
    field: 'multiple',
    label: '开启多选',
  },
  {
    component: 'el-switch',
    field: 'showCheckbox',
    label: '开启复选',
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
  {
    component: 'el-switch',
    field: 'highlightCurrent',
    label: '节点高亮',
  },
  {
    component: 'el-switch',
    field: 'defaultExpandAll',
    label: '默认展开节点',
  },
  {
    component: 'el-switch',
    field: 'expandOnClickNode',
    label: '点击节点展开',
    tooltip: '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
  },
]

export const TreeSelectCrudFormData = {
  data: [{ label: '标签', value: '1', key: uid() }],
  placeholder: '',
  clearable: true,
  disabled: false,
  multiple: false,
  filterable: true,
  showCheckbox: false,
  highlightCurrent: false,
  defaultExpandAll: false,
  expandOnClickNode: false,
}

export const defaultTreeSelectAttrs = {
  data: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  props: {
    label: 'label',
    children: 'children',
    disabled: 'disabled',
  },
  multiple: false,
  placeholder: '',
  clearable: true,
  disabled: false,
  filterable: true,
  showCheckbox: false,
  highlightCurrent: false,
  defaultExpandAll: false,
  expandOnClickNode: false,
}
