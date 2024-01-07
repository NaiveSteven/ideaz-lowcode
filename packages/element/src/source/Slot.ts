import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';

export const SlotTemplateComponent = () => ({
  id: uid(),
  name: '',
  pid: '',
  formItemFormData: reactive({
    label: '插槽',
  }),
  formItemTemplateSchema: {},
  formItemOptionsConfig: {},
  icon: 'i-van',
  label: '插槽',
  title: '插槽',
  schema: {
    type: 'placeholder-block',
    formItem: { label: '插槽' },
    attrs: {},
  },
  templateFormData: reactive({}),
  templateSchema: [],
  templateOptionsConfig: {},
  fieldOptionsConfig: {},
  fieldFormData: reactive({
    prop: 'slot',
    slot: 'slot',
  }),
  fieldSchema: [
    {
      type: 'input',
      prop: 'prop',
      formItem: { label: '字段名' },
      attrs: {
        placeholder: '请输入字段名',
      },
    },
    {
      type: 'input',
      prop: 'slot',
      formItem: { label: '插槽名' },
      attrs: {
        placeholder: '请输入插槽名',
      },
    },
  ],
  allowCopy: true,
  allowDelete: true,
  activeCollapseItems: ['field', 'component', 'formItem'],
  children: [],
});
