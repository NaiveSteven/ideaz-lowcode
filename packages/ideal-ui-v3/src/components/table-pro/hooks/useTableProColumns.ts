import { computed } from 'vue';
import type { TableCol } from '@ideal-schema/ideal-ui-v3';

const COLUMN_TYPE_FIELDS = ['type', 'slot', 'headerSlot', 'prop', '__uid'];

export const useTableProColumns = (props: Record<any, any>) => {
  const tableCols = computed(() => {
    return props.config.tableCols?.filter((item: TableCol) => {
      return COLUMN_TYPE_FIELDS.some((key) => item[key]);
    });
  });

  return { tableCols };
};
