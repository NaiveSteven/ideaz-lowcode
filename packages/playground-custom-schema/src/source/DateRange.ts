import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import {
  dateRangeTemplateOptionsConfig,
  dateRangeTemplateSchema,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  fieldTemplateSchema,
  formItemFormData,
} from '../schemas';

export const defaultInputAttrs = {
  type: 'daterange',
  size: 'default',
  clearable: true,
  disabled: false,
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  valueFormat: 'yyyy-MM-dd',
};

export const DateRangeTemplateComponent = () => ({
  id: uid(),
  name: '',
  pid: '',
  formItemFormData: reactive({
    ...formItemFormData,
    label: '日期范围',
  }),
  formItemTemplateSchema: formItemTemplateSchema,
  formItemOptionsConfig: formItemTemplateOptionsConfig,
  icon: 'i-calendar',
  label: '日期范围',
  title: '日期范围',
  schema: {
    type: 'datepicker',
    prop: 'datepicker',
    formItem: { label: '日期范围' },
    attrs: {
      type: 'daterange',
      size: 'default',
      clearable: true,
      disabled: false,
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'yyyy-MM-dd',
    },
  },
  templateFormData: reactive({ ...defaultInputAttrs }),
  templateSchema: dateRangeTemplateSchema,
  templateOptionsConfig: dateRangeTemplateOptionsConfig,
  fieldOptionsConfig: {},
  fieldFormData: reactive({
    prop: 'datepicker',
    default: [],
  }),
  fieldSchema: fieldTemplateSchema(),
  allowCopy: true,
  allowDelete: true,
  activeCollapseItems: ['field', 'component', 'formItem'],
  children: [],
});
