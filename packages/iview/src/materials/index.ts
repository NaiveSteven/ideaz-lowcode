import { CrudTemplate } from '../template'
import { InputTemplateComponent } from './Input'
import { TextareaTemplateComponent } from './Textarea'
import { InputNumberTemplateComponent } from './InputNumber'
import { SelectTemplateComponent } from './Select'
import { RadioTemplateComponent } from './Radio'
import { SwitchTemplateComponent } from './Switch'
import { MultipleSelectTemplateComponent } from './MultipleSelect'
import { CheckboxTemplateComponent } from './Checkbox'
import { SlotTemplateComponent } from './Slot'
import { DateRangeTemplateComponent } from './DateRange'
import { CrudTemplateComponent } from './Crud'

export * from './Checkbox'
export * from './Input'
export * from './InputNumber'
export * from './MultipleSelect'
export * from './Radio'
export * from './Select'
export * from './Switch'
export * from './Textarea'
export * from './Slot'

export const FORM_COMPONENT_TYPE = [
  { label: '输入框', value: 'input' },
  { label: '单选框', value: 'select' },
  { label: '多选框', value: 'multipleSelect' },
  { label: '日期选择', value: 'datepicker' },
  { label: '插槽', value: 'slot' },
]

export const DEFAULT_COMPONENT_TEMPLATES: ExpandTemplateItem[] = [
  {
    collapseTitle: '表单组件',
    components: [
      InputTemplateComponent(),
      TextareaTemplateComponent(),
      InputNumberTemplateComponent,
      SelectTemplateComponent(),
      RadioTemplateComponent,
      SwitchTemplateComponent(),
      MultipleSelectTemplateComponent,
      CheckboxTemplateComponent(),
      DateRangeTemplateComponent(),
      SlotTemplateComponent(),
    ],
  },
  {
    collapseTitle: '高阶组件',
    components: [CrudTemplateComponent()],
  },
  {
    collapseTitle: '组件模板',
    components: [CrudTemplate()],
  },
]
