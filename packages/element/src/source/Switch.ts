import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import {
  switchTemplateSchema,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  fieldTemplateSchema,
  formItemFormData,
} from '../schemas';

export const defaultSwitchAttrs = {
  width: 40,
  activeText: undefined,
  inactiveText: undefined,
  // activeColor: '#409EFF',
  // inactiveColor: '#C0CCDA',
  disabled: false,
};

export const SwitchTemplateComponent = (key = 'switch') => ({
  id: uid(),
  name: '',
  pid: '',
  formItemFormData: reactive({
    ...formItemFormData,
    label: '开关',
  }),
  formItemTemplateSchema: formItemTemplateSchema,
  formItemOptionsConfig: formItemTemplateOptionsConfig,
  icon: 'i-cpu',
  label: '开关',
  title: '开关',
  schema: {
    type: 'el-switch',
    prop: key,
    formItem: { label: '开关' },
    attrs: {
      width: 40,
      activeText: undefined,
      inactiveText: undefined,
      // activeColor: '#409EFF',
      // inactiveColor: '#C0CCDA',
      disabled: false,
    },
  },
  templateFormData: reactive({ ...defaultSwitchAttrs }),
  templateSchema: switchTemplateSchema,
  templateOptionsConfig: {},
  fieldFormData: reactive({
    prop: key,
    default: false,
  }),
  fieldSchema: fieldTemplateSchema({ defaultType: 'el-switch', required: true }),
  fieldOptionsConfig: {},
  allowCopy: true,
  allowDelete: true,
  activeCollapseItems: ['field', 'component', 'formItem'],
  children: [],
});
