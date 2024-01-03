import type { Ref } from 'vue';
import type { TableCol } from '@ideal-schema/ideal-ui-v3';

export const useTableSlots = (tableCols: Ref<TableCol[]>, slots: IndexType) => {
  const scopedSlots: IndexType = {};
  tableCols.value?.map((item: TableCol) => {
    if (item.slot && slots[item.slot]) {
      scopedSlots[item.slot] = (scope: any) => slots[item.slot]({ ...scope, $index: scope.index });
    }
    if (item.headerSlot && slots[item.headerSlot]) {
      scopedSlots[item.headerSlot] = (scope: any) =>
        slots[item.headerSlot]({ ...scope, $index: scope.index });
    }
  });

  return { scopedSlots };
};
