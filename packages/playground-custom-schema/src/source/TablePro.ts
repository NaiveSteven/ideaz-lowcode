import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import {
  formItemTemplateOptionsConfig,
  fieldTemplateSchema,
  inputTableProFormData,
  inputTableProSchema,
  tableColTemplateSchema,
  tableColTemplateOptionsConfig,
  tableColFormData,
  tableProTableTemplateSchema,
  tableProFormTemplateSchema,
} from '../schemas';

const FORM_COMPONENT_TYPE = [
  { label: '输入框', value: 'input' },
  { label: '单选框', value: 'select' },
  { label: '多选框', value: 'multipleSelect' },
  { label: '日期选择', value: 'datepicker' },
  { label: '插槽', value: 'slot' },
];

const tableCols = [
  {
    name: 'tableCol',
    prop: 'name',
    label: '姓名',
    title: '表格项',
    id: uid(),
    formItemProps: {
      id: uid(),
      name: 'tableForm',
      type: 'input',
      title: '表单项',
      prop: 'name',
      formItem: { label: '通知单名称' },
      templateFormData: reactive({
        ...inputTableProFormData,
        componentType: 'input',
      }),
      templateSchema: [
        {
          type: 'select',
          prop: 'componentType',
          formItem: {
            label: '组件类别',
          },
        },
        ...inputTableProSchema,
      ],
      templateOptionsConfig: {
        componentType: FORM_COMPONENT_TYPE,
      },
      fieldFormData: reactive({
        prop: 'name',
        default: '',
      }),
      fieldSchema: fieldTemplateSchema({ defaultType: 'el-input' }),
      formItemFormData: reactive({
        label: '通知单名称',
        tooltip: '',
        extra: '',
      }),
      formItemTemplateSchema: [
        {
          type: 'input',
          prop: 'label',
          formItem: { label: '标签' },
          attrs: {
            placeholder: '请输入标签',
          },
        },
        {
          type: 'input',
          prop: 'tooltip',
          formItem: { label: '提示' },
          attrs: {
            placeholder: '请输入提示',
          },
        },
        {
          type: 'input',
          prop: 'extra',
          formItem: { label: '额外信息' },
          attrs: {
            placeholder: '请输入额外信息',
          },
        },
      ],
      formItemOptionsConfig: formItemTemplateOptionsConfig,
      activeCollapseItems: ['field', 'component', 'formItem'],
      allowCopy: true,
      allowDelete: true,
    },
    templateSchema: tableColTemplateSchema,
    templateOptionsConfig: tableColTemplateOptionsConfig,
    templateFormData: reactive({
      ...tableColFormData,
      prop: 'name',
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
    formItemProps: {
      id: uid(),
      type: 'input',
      name: 'tableForm',
      title: '表单项',
      prop: 'address',
      formItem: { label: '地址' },
      templateFormData: reactive({
        ...inputTableProFormData,
        componentType: 'input',
      }),
      templateSchema: [
        {
          type: 'select',
          prop: 'componentType',
          formItem: {
            label: '组件类别',
          },
        },
        ...inputTableProSchema,
      ],
      templateOptionsConfig: {
        componentType: FORM_COMPONENT_TYPE,
      },
      fieldFormData: reactive({
        prop: 'address',
        default: '',
      }),
      fieldSchema: fieldTemplateSchema({ defaultType: 'el-input' }),
      formItemFormData: reactive({
        label: '地址',
        tooltip: '',
        extra: '',
      }),
      formItemTemplateSchema: [
        {
          type: 'input',
          prop: 'label',
          formItem: { label: '标签' },
          attrs: {
            placeholder: '请输入标签',
          },
        },
        {
          type: 'input',
          prop: 'tooltip',
          formItem: { label: '提示' },
          attrs: {
            placeholder: '请输入提示',
          },
        },
        {
          type: 'input',
          prop: 'extra',
          formItem: { label: '额外信息' },
          attrs: {
            placeholder: '请输入额外信息',
          },
        },
      ],
      formItemOptionsConfig: formItemTemplateOptionsConfig,
      activeCollapseItems: ['field', 'component', 'formItem'],
      allowCopy: true,
      allowDelete: true,
    },
    templateSchema: tableColTemplateSchema,
    templateOptionsConfig: tableColTemplateOptionsConfig,
    templateFormData: reactive({
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
    templateSchema: tableColTemplateSchema,
    templateOptionsConfig: tableColTemplateOptionsConfig,
    templateFormData: reactive({
      ...tableColFormData,
      prop: 'phone',
      label: '手机号',
    }),
    activeCollapseItems: ['column'],
    allowCopy: true,
    allowDelete: true,
  },
];

export const TableProTemplateComponent = () => ({
  id: uid(),
  name: 'tablePro',
  pid: '',
  icon: 'i-list',
  label: '表单表格',
  title: '表单表格',
  schema: {
    headerRowClassName: 'tableProHeader',
    draggable: true,
    defaultExpand: true,
    rowKey: 'id',
    formModel: {
      name: '',
      address: '',
    },
    formOptions: {},
    formConfig: {
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
      page_size: 10,
      total: 0,
    },
    tableCols: tableCols,
  },
  templateFormData: reactive({
    rowKey: 'id',
    formDecorator: 'el-card',
    tableDecorator: 'el-card',
    defaultExpand: true,
    pagination: true,
  }),
  templateSchema: tableProTableTemplateSchema,
  templateOptionsConfig: {},
  fieldSchema: tableProFormTemplateSchema,
  fieldFormData: reactive({
    labelWidth: '80px',
  }),
  allowCopy: true,
  allowDelete: true,
  activeCollapseItems: ['table', 'form'],
  children: [],
});
