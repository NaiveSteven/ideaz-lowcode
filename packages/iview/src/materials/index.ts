import { CrudTemplate } from '../template'
import { CheckboxTemplateComponent } from './Checkbox'
import { DateTemplateComponent } from './Date'
import { DateRangeTemplateComponent } from './DateRange'
import { InputTemplateComponent } from './Input'
import { InputNumberTemplateComponent } from './InputNumber'
import { MultipleSelectTemplateComponent } from './MultipleSelect'
import { RadioTemplateComponent } from './Radio'
import { SelectTemplateComponent } from './Select'
import { SlotTemplateComponent } from './Slot'
import { SwitchTemplateComponent } from './Switch'
import { TextareaTemplateComponent } from './Textarea'

export * from './Checkbox'
export * from './Input'
export * from './InputNumber'
export * from './MultipleSelect'
export * from './Radio'
export * from './Select'
export * from './Slot'
export * from './Switch'
export * from './Textarea'

export const FORM_COMPONENT_TYPE = [
  { label: '输入框', value: 'input' },
  { label: '单选框', value: 'select' },
  { label: '多选框', value: 'multipleSelect' },
  { label: '日期选择', value: 'datepicker' },
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
      RadioTemplateComponent(),
      SwitchTemplateComponent(),
      MultipleSelectTemplateComponent(),
      CheckboxTemplateComponent(),
      DateTemplateComponent(),
      DateRangeTemplateComponent(),
      SlotTemplateComponent(),
    ],
  },
  {
    collapseTitle: '高阶组件',
    components: [CrudTemplate()],
  },
  // {
  //   collapseTitle: '组件模板',
  //   components: [NormalTemplate, CrudTemplate()],
  // },
]
