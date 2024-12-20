import { CrudTemplate } from '../template'
import { CheckboxTemplateComponent } from './Checkbox'
import { DateTemplateComponent } from './Date'
import { DateRangeTemplateComponent } from './DateRange'
import { InputTemplateComponent } from './Input'
import { InputNumberTemplateComponent } from './InputNumber'
import { MultipleSelectTemplateComponent } from './MultipleSelect'
import { RadioTemplateComponent } from './Radio'
import { RateTemplateComponent } from './Rate'
import { SelectTemplateComponent } from './Select'
import { SliderTemplateComponent } from './Slider'
import { SlotTemplateComponent } from './Slot'
import { SwitchTemplateComponent } from './Switch'
import { TextareaTemplateComponent } from './Textarea'
import { TimePickerTemplateComponent } from './TimePicker'
import { TimeRangePickerTemplateComponent } from './TimeRangePicker'
import { TimeSelectTemplateComponent } from './TimeSelect'
import { TreeSelectTemplateComponent } from './TreeSelect'
import { VirtualizedSelectTemplateComponent } from './VirtualizedSelect'
import { ArrayFormTemplateComponent } from './ArrayForm'

export * from './Checkbox'
export * from './Input'
export * from './InputNumber'
export * from './MultipleSelect'
export * from './Radio'
export * from './Select'
export * from './Slot'
export * from './Switch'
export * from './Textarea'
export * from './ArrayForm'

export const FORM_COMPONENT_TYPE = [
  { label: '输入框', value: 'input' },
  { label: '单选框', value: 'select' },
  { label: '多选框', value: 'multipleSelect' },
  { label: '日期选择', value: 'el-date-picker' },
  { label: '插槽', value: 'slot' },
]

export const DEFAULT_COMPONENT_TEMPLATES: ExpandTemplateItem[] = [
  {
    collapseTitle: '基础组件',
    components: [
      InputTemplateComponent(),
      TextareaTemplateComponent(),
      InputNumberTemplateComponent(),
      SelectTemplateComponent(),
      VirtualizedSelectTemplateComponent(),
      RadioTemplateComponent(),
      SwitchTemplateComponent(),
      MultipleSelectTemplateComponent(),
      CheckboxTemplateComponent(),
      TreeSelectTemplateComponent(),
      TimeSelectTemplateComponent(),
      DateTemplateComponent(),
      DateRangeTemplateComponent(),
      TimePickerTemplateComponent(),
      TimeRangePickerTemplateComponent(),
      RateTemplateComponent(),
      SliderTemplateComponent(),
      SlotTemplateComponent(),
    ],
  },
  {
    collapseTitle: '高阶组件',
    components: [CrudTemplate(), ArrayFormTemplateComponent()],
  },
  // {
  //   collapseTitle: '组件模板',
  //   components: [NormalTemplate, CrudTemplate()],
  // },
]
