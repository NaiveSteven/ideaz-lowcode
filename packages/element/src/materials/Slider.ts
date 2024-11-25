import { uid } from '@ideal-schema/shared'
import {
  defaultSliderAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  sliderTemplateOptionsConfig,
  sliderTemplateSchema,
} from '../schemas'

export function SliderTemplateComponent(): Widget {
  const field = uid()
  return {
    id: uid(),
    icon: 'icon-huakuai',
    title: '滑块',
    schema: {
      component: 'el-slider',
      field,
      label: '滑块',
      fieldProps: {
        min: 0,
        max: 100,
        step: 1,
        showStops: false,
        showTooltip: true,
        validateEvent: true,
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '滑块',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultSliderAttrs }),
    componentSchema: sliderTemplateSchema,
    componentOptionsConfig: sliderTemplateOptionsConfig,
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
