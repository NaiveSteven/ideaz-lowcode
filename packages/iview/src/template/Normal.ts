import { uid } from '@ideal-schema/shared'

// import {
//   CheckboxTemplateComponent,
//   InputTemplateComponent,
//   SelectTemplateComponent,
//   SwitchTemplateComponent,
//   TextareaTemplateComponent,
// } from '../schemas'

export const NormalTemplate = {
  id: uid(),
  name: '',
  pid: '',
  templates: [
    // InputTemplateComponent(uid()),
    // SelectTemplateComponent(uid()),
    // SwitchTemplateComponent(uid()),
    // CheckboxTemplateComponent(uid()),
    // TextareaTemplateComponent(uid()),
  ],
  icon: 'i-printer',
  label: '常规模板',
  title: '常规模板',
}
