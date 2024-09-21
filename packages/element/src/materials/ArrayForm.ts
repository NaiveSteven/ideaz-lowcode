import { uid } from '@ideal-schema/shared'
import {
  arrayFormTemplateSchema,
  defaultArrayFormAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
} from '../schemas'
import { InputTemplateComponent } from './Input'

const formColumn1 = {
  id: uid(),
  draggable: true,
  name: 'tableForm',
  component: 'input',
  title: '表单项',
  field: 'name',
  label: '通知单名称1',
  templateFormData: reactive({
    componentType: 'input',
  }),
  templateSchema: [
    {
      component: 'select',
      field: 'componentType',
      label: '组件类别',
    },
  ],
  templateOptionsConfig: {
  },
  fieldFormData: reactive({
    field: 'name',
    default: '',
  }),
  fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-input' }),
  formItemFormData: reactive({
    label: '通知单名称1',
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
}

const formColumn2 = {
  id: uid(),
  draggable: true,
  name: 'tableForm',
  component: 'input',
  title: '表单项',
  field: 'name',
  label: '通知单名称2',
  templateFormData: reactive({
    componentType: 'input',
  }),
  templateSchema: [
    {
      component: 'select',
      field: 'componentType',
      label: '组件类别',
    },
  ],
  templateOptionsConfig: {
  },
  fieldFormData: reactive({
    field: 'name',
    default: '',
  }),
  fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-input' }),
  formItemFormData: reactive({
    label: '通知单名称2',
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
}

export function ArrayFormTemplateComponent(key = uid()): WorkspaceComponentItem {
  // const arrayFormId = uid()
  // const arrayFormId2 = uid()
  return {
    id: uid(),
    icon: 'i-lightning',
    title: '数组表单',
    schema: {
      component: 'z-form',
      field: key,
      label: '数组表单',
      fieldProps: {
        action: false,
        type: 'array',
        max: undefined,
        draggable: true,
        style: {
          width: '100%',
        },
        columns: [
          { ...InputTemplateComponent(), component: 'input', label: '通知单1' },
          { ...InputTemplateComponent(), component: 'input', label: '通知单2' },
          // formColumn1,
          // formColumn2,
        ],
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '数组表单',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultArrayFormAttrs }),
    componentSchema: arrayFormTemplateSchema,
    // componentOptionsConfig: checkboxTemplateOptionsConfig,
    fieldFormData: reactive({
      field: key,
      default: [{}],
      required: false,
    }),
    fieldSchema: fieldTemplateSchema({
      defaultComponent: 'select',
      defaultProps: { multiple: true },
      required: true,
    }),
    fieldOptionsConfig: {
      default: [
        { label: '标签1', value: '1', key: uid() },
        { label: '标签2', value: '2', key: uid() },
      ],
    },
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
  }
}
