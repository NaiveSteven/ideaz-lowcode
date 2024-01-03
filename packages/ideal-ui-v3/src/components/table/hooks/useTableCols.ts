import { computed, ref, watch } from 'vue';
import { cloneDeep } from 'lodash-es';
import { isFunction, uid } from '@ideal-schema/shared';
import type { TableCol } from '@ideal-schema/ideal-ui-v3';

export const useTableCols = (props: IndexType) => {
  const middleTableCols = ref<TableCol[]>([]);
  const sortTableCols = ref<TableCol[]>([]);

  if (props.tableCols && props.tableCols.length) {
    props.tableCols.forEach((item: TableCol) => {
      item.__uid = uid();
    });
  }

  watch(
    () => props.tableCols,
    () => {
      if (props.tableCols.length) {
        middleTableCols.value = cloneDeep(props.tableCols);
      }
    },
    { immediate: true, deep: true }
  );

  const formatTableCols = computed(() => {
    return middleTableCols.value.filter((item) => {
      // item.__uid = item.prop + item.label + item.slot + item.type
      return isFunction(item.hide) ? !item.hide() : !item.hide;
    });
  });

  const originFormatTableCols = computed(() => {
    sortTableCols.value = props.tableCols.filter((item: TableCol) => {
      return isFunction(item.hide) ? !item.hide() : !item.hide;
    });
    return props.tableCols.filter((item: TableCol) => {
      // item.__uid = item.prop + item.label + item.slot + item.type
      return isFunction(item.hide) ? !item.hide() : !item.hide;
    });
  });

  return { formatTableCols, middleTableCols, originFormatTableCols, sortTableCols };
};
