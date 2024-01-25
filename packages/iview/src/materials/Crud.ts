import { uid } from '@ideal-schema/shared'
import {
  crudFormTemplateSchema,
  crudTableTemplateSchema,
  fieldTemplateSchema,
  formItemTemplateOptionsConfig,
  inputCrudFormData,
  inputCrudSchema,
  tableColFormData,
  tableColTemplateOptionsConfig,
  tableColTemplateSchema,
} from '../schemas'

const FORM_COMPONENT_TYPE = [
  { label: '输入框', value: 'input' },
  { label: '单选框', value: 'select' },
  { label: '多选框', value: 'multipleSelect' },
  { label: '日期选择', value: 'datepicker' },
  { label: '插槽', value: 'slot' },
]

const columns = [
  {
    name: 'tableCol',
    prop: 'name',
    label: '姓名',
    title: '表格项',
    id: uid(),
    search: {
      id: uid(),
      name: 'tableForm',
      component: 'input',
      title: '表单项',
      field: 'name',
      label: '通知单名称',
      templateFormData: reactive({
        ...inputCrudFormData,
        componentType: 'input',
      }),
      templateSchema: [
        {
          component: 'select',
          field: 'componentType',
          label: '组件类别',
        },
        ...inputCrudSchema,
      ],
      templateOptionsConfig: {
        componentType: FORM_COMPONENT_TYPE,
      },
      fieldFormData: reactive({
        field: 'name',
        default: '',
      }),
      fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-input' }),
      formItemFormData: reactive({
        label: '通知单名称',
        tooltip: '',
        extra: '',
      }),
      formItemTemplateSchema: [
        {
          component: 'input',
          filed: 'label',
          label: '标签',
        },
        {
          component: 'input',
          filed: 'tooltip',
          label: '提示',
        },
        {
          component: 'input',
          filed: 'extra',
          label: '额外信息',
        },
      ],
      formItemOptionsConfig: formItemTemplateOptionsConfig,
      activeCollapseItems: ['field', 'component', 'formItem'],
      allowCopy: true,
      allowDelete: true,
    },
    componentSchema: tableColTemplateSchema,
    componentOptionsConfig: tableColTemplateOptionsConfig,
    componentFormData: reactive({
      ...tableColFormData,
      field: 'name',
      label: '姓名',
    }),
    activeCollapseItems: ['column'],
    allowCopy: true,
    allowDelete: true,
  },
  {
    name: 'tableCol',
    prop: 'address',
    label: '地址',
    title: '表格项',
    id: uid(),
    search: {
      id: uid(),
      component: 'input',
      name: 'tableForm',
      title: '表单项',
      field: 'address',
      label: '地址',
      componentFormData: reactive({
        ...inputCrudFormData,
        componentType: 'input',
      }),
      componentSchema: [
        {
          component: 'select',
          field: 'componentType',
          label: '组件类别',
        },
        ...inputCrudSchema,
      ],
      componentOptionsConfig: {
        componentType: FORM_COMPONENT_TYPE,
      },
      fieldFormData: reactive({
        field: 'address',
        default: '',
      }),
      fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-input' }),
      formItemFormData: reactive({
        label: '地址',
        tooltip: '',
        extra: '',
      }),
      formItemTemplateSchema: [
        {
          component: 'input',
          field: 'label',
          label: '标签',
        },
        {
          component: 'input',
          field: 'tooltip',
          label: '提示',
        },
        {
          component: 'input',
          field: 'extra',
          label: '额外信息',
        },
      ],
      formItemOptionsConfig: formItemTemplateOptionsConfig,
      activeCollapseItems: ['field', 'component', 'formItem'],
      allowCopy: true,
      allowDelete: true,
    },
    componentSchema: tableColTemplateSchema,
    componentOptionsConfig: tableColTemplateOptionsConfig,
    componentFormData: reactive({
      ...tableColFormData,
      prop: 'address',
      label: '地址',
    }),
    activeCollapseItems: ['column'],
    allowCopy: true,
    allowDelete: true,
  },
  {
    name: 'tableCol',
    id: uid(),
    title: '表格项',
    prop: 'phone',
    label: '手机号',
    componentSchema: tableColTemplateSchema,
    componentOptionsConfig: tableColTemplateOptionsConfig,
    componentFormData: reactive({
      ...tableColFormData,
      prop: 'phone',
      label: '手机号',
    }),
    activeCollapseItems: ['column'],
    allowCopy: true,
    allowDelete: true,
  },
]

export function CrudTemplateComponent() {
  return {
    id: uid(),
    name: 'crud',
    icon: 'i-list',
    title: '增删改查',
    schema: {
      headerRowClassName: 'crudHeader',
      draggable: true,
      collapsed: true,
      rowKey: 'id',
      searchFormData: {
        name: '',
        address: '',
      },
      form: {
        labelPosition: 'right',
        labelWidth: '80px',
        size: 'small',
        draggable: true,
      },
      data: [
        {
          id: 1,
          name: '姓名',
          address: '地址',
          phone: '手机号',
        },
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      columns,
    },
    componentFormData: reactive({
      rowKey: 'id',
      formDecorator: 'el-card',
      tableDecorator: 'el-card',
      collapsed: true,
      pagination: true,
    }),
    componentSchema: crudTableTemplateSchema,
    componentOptionsConfig: {},
    fieldSchema: crudFormTemplateSchema,
    fieldFormData: reactive({
      labelWidth: '80px',
    }),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['table', 'form'],
    children: [],
  }
}
