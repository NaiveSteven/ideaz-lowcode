import type { Ref } from 'vue';
import type { FormItemConfigItem } from '@ideal-schema/ideal-ui-v3';

export const useFormSlots = (formItems: Ref<FormItemConfigItem[]>, slots: IndexType) => {
  const scopedSlots: IndexType = {};
  formItems.value.map((item) => {
    if (item.slot && slots[item.slot]) {
      scopedSlots[item.slot] = () => slots[item.slot!]();
    }
  });

  return { scopedSlots };
};
