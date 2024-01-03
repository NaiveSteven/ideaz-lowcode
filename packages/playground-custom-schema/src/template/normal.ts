import { uid } from '@ideal-schema/shared';
import {
  InputTemplateComponent,
  TextareaTemplateComponent,
  SelectTemplateComponent,
  SwitchTemplateComponent,
  CheckboxTemplateComponent,
} from '../source';

export const normalTemplate = {
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
  label: '常规模板',
  title: '常规模板',
};
