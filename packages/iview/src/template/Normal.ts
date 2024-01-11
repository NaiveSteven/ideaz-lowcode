import { uid } from '@ideal-schema/shared'

import {
  CheckboxTemplateComponent,
  InputTemplateComponent,
  SelectTemplateComponent,
  SwitchTemplateComponent,
  TextareaTemplateComponent,
} from '../materials'

export const NormalTemplate = {
  id: uid(),
  name: '',
  pid: '',
  templates: [
    InputTemplateComponent(uid()),
    SelectTemplateComponent(uid()),
    SwitchTemplateComponent(uid()),
    CheckboxTemplateComponent(uid()),
    TextareaTemplateComponent(uid()),
  ],
  icon: 'i-printer',
  title: '常规模板',
}
