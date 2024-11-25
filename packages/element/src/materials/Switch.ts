import { uid } from '@ideal-schema/shared'
import {
  defaultSwitchAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  switchTemplateSchema,
} from '../schemas'

export function SwitchTemplateComponent(key = uid()): Widget {
  return {
    id: uid(),
    icon: 'icon-kaiguan',
    title: '开关',
    schema: {
      component: 'el-switch',
      field: key,
      label: '开关',
      fieldProps: {
        width: 40,
        activeText: undefined,
        inactiveText: undefined,
        disabled: false,
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '开关',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultSwitchAttrs }),
    componentSchema: switchTemplateSchema,
    componentOptionsConfig: {},
    fieldFormData: reactive({
      field: key,
      default: false,
    }),
    fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-switch', required: true }),
    fieldOptionsConfig: {},
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
