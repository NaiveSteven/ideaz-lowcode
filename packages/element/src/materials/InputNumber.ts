import { uid } from '@ideal-schema/shared'
import {
  defaultInputNumberAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  inputNumberTemplateOptionsConfig,
  inputNumberTemplateSchema,
} from '../schemas'

export function InputNumberTemplateComponent(): Widget {
  const field = uid()
  return {
    id: uid(),
    icon: 'icon-fuhao-shuzishurukuang',
    title: '数字输入',
    schema: {
      component: 'el-input-number',
      field,
      label: '数字输入',
      fieldProps: {
        min: undefined,
        max: undefined,
        step: 1,
        precision: 1,
        placeholder: '',
        disabled: false,
        controls: true,
        stepStrictly: false,
        controlsPosition: 'right',
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '数字输入',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultInputNumberAttrs }),
    componentSchema: inputNumberTemplateSchema,
    componentOptionsConfig: inputNumberTemplateOptionsConfig,
    fieldOptionsConfig: {},
    fieldFormData: reactive({
      field,
      default: 0,
    }),
    fieldSchema: fieldTemplateSchema({
      defaultComponent: 'el-input-number',
      defaultProps: { controlsPosition: 'right' },
      required: true,
    }),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
