import { uid } from '@ideal-schema/shared'
import mitt from '../event'
import {
  crudFormTemplateSchema,
  crudTableOptionsConfig,
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

export const COMPONENT_SELECT = {
  component: 'select',
  field: 'componentType',
  label: '组件类别',
  fieldProps: {
    clearable: false,
  },
}

function getColumns() {
  const mockNameId = uid()
  const mockAddressId = uid()
  return [
    {
      name: 'tableCol',
      prop: 'name',
      label: '姓名',
      title: '表格项',
      icon: 'icon-biaoge-lie',
      id: uid(),
      search: {
        id: mockNameId,
        name: 'tableForm',
        formItemProps: {
          id: `schema-field${mockNameId}`,
          onClick: (e: PointerEvent) => { mitt.emit('form-item-click', { event: e, id: mockNameId }) },
        },
        component: 'input',
        title: '表单项',
        field: mockNameId,
        label: '表单项1',
        icon: 'icon-biaodanxiang',
        componentFormData: reactive({
          ...inputCrudFormData,
          componentType: 'input',
        }),
        componentSchema: [
          COMPONENT_SELECT,
          ...inputCrudSchema,
        ],
        componentOptionsConfig: {
          componentType: FORM_COMPONENT_TYPE,
        },
        fieldFormData: reactive({
          field: mockNameId,
          default: '',
        }),
        fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-input' }),
        formItemFormData: reactive({
          label: '表单项1',
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
        prop: 'name',
        label: '姓名',
        buttons: [
          {
            key: uid(),
            type: 'primary',
            link: true,
            label: '编辑',
          },
          {
            type: 'primary',
            label: '删除',
            link: true,
            key: uid(),
          },
        ],
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
      icon: 'icon-biaoge-lie',
      id: uid(),
      search: {
        id: mockAddressId,
        formItemProps: {
          id: `schema-field${mockAddressId}`,
          onClick: (e: PointerEvent) => { mitt.emit('form-item-click', { event: e, id: mockAddressId }) },
        },
        component: 'input',
        name: 'tableForm',
        title: '表单项',
        field: mockAddressId,
        label: '表单项2',
        icon: 'icon-biaodanxiang',
        componentFormData: reactive({
          ...inputCrudFormData,
          componentType: 'input',
        }),
        componentSchema: [
          COMPONENT_SELECT,
          ...inputCrudSchema,
        ],
        componentOptionsConfig: {
          componentType: FORM_COMPONENT_TYPE,
        },
        fieldFormData: reactive({
          field: mockAddressId,
          default: '',
        }),
        fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-input' }),
        formItemFormData: reactive({
          label: '表单项2',
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
        buttons: [
          {
            key: uid(),
            type: 'primary',
            link: true,
            label: '编辑',
          },
          {
            type: 'primary',
            label: '删除',
            link: true,
            key: uid(),
          },
        ],
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
      icon: 'icon-biaoge-lie',
      label: '手机号',
      componentSchema: tableColTemplateSchema,
      componentOptionsConfig: tableColTemplateOptionsConfig,
      componentFormData: reactive({
        ...tableColFormData,
        prop: 'phone',
        label: '手机号',
        buttons: [
          {
            key: uid(),
            type: 'primary',
            label: '编辑',
            link: true,
          },
          {
            type: 'primary',
            label: '删除',
            link: true,
            key: uid(),
          },
        ],
      }),
      activeCollapseItems: ['column'],
      allowCopy: true,
      allowDelete: true,
    },
    // {
    //   name: 'tableCol',
    //   id: uid(),
    //   title: '表格项',
    //   prop: 'operation',
    //   label: '操作',
    //   icon: 'icon-biaoge-lie',
    //   type: 'button',
    //   buttons: [
    //     {
    //       key: uid(),
    //       type: 'primary',
    //       link: true,
    //       label: '添加',
    //     },
    //     {
    //       type: 'primary',
    //       link: true,
    //       label: '删除',
    //       key: uid(),
    //     },
    //   ],
    //   componentSchema: tableColTemplateSchema,
    //   componentOptionsConfig: tableColTemplateOptionsConfig,
    //   componentFormData: reactive({
    //     ...tableColFormData,
    //     type: 'button',
    //     prop: 'operation',
    //     label: '操作',
    //     buttons: [
    //       {
    //         type: 'primary',
    //         key: uid(),
    //         link: true,
    //         label: '编辑',
    //       },
    //       {
    //         type: 'primary',
    //         link: true,
    //         label: '删除',
    //         key: uid(),
    //       },
    //     ],
    //   }),
    //   activeCollapseItems: ['column'],
    //   allowCopy: true,
    //   allowDelete: true,
    // },
  ]
}

export function CrudTemplate(): WorkspaceComponentItem {
  const columns = getColumns()
  return {
    id: uid(),
    name: 'crud',
    icon: 'icon-bushu',
    title: '增删改查',
    schema: {
      action: true,
      headerRowClassName: 'crudHeader',
      cellClassName: ({ columnIndex }: { columnIndex: number }) => {
        if (columns[columnIndex])
          return `schema-field${columns[columnIndex].id}`
      },
      draggable: true,
      collapsed: true,
      size: 'default',
      rowKey: 'id',
      searchFormData: {
        name: '',
        address: '',
      },
      search: {
        labelPosition: 'right',
        labelWidth: '80px',
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
      size: 'default',
      rowKey: 'id',
      formDecorator: 'el-card',
      tableDecorator: 'el-card',
      pagination: true,
      background: 'page',
      action: true,
      request: true,
    }),
    componentSchema: crudTableTemplateSchema,
    componentOptionsConfig: crudTableOptionsConfig,
    fieldSchema: crudFormTemplateSchema,
    fieldFormData: reactive({
      labelWidth: '80px',
      collapsed: true,
    }),
    allowCopy: false,
    allowDelete: true,
    activeCollapseItems: ['table', 'form'],
    children: [],
  }
}
