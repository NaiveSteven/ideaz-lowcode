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

export function ArrayFormTemplateComponent(key = uid()): Widget {
  // const arrayFormId = uid()
  // const arrayFormId2 = uid()
  return {
    id: uid(),
    icon: 'icon-shuzubiaodan',
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
        labelWidth: '100px',
        style: {
          width: '100%',
        },
        columns: [
          {
            ...InputTemplateComponent(),
            schema: { ...InputTemplateComponent().schema, label: '通知单1' },
            formItemFormData: { ...InputTemplateComponent().schema, label: '通知单1' },
          },
          {
            ...InputTemplateComponent(),
            schema: { ...InputTemplateComponent().schema, label: '通知单2' },
            formItemFormData: { ...InputTemplateComponent().schema, label: '通知单2' },
          },
        ],
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '数组表单',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultArrayFormAttrs, labelWidth: '100px' }),
    componentSchema: [
      ...arrayFormTemplateSchema,
      {
        component: 'input',
        field: 'labelWidth',
        label: '标签宽度',
      },
    ],
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
