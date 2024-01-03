import { ref, computed, watch } from 'vue';
import { isObject } from '@ideal-schema/shared';

export const usePagination = (props: Record<any, any>, attrs: IndexType, emit: any) => {
  const { pagination = {} } = props;

  const tableData = ref([]);

  const attrsAll = computed<IndexType>(() => {
    return { ...props, ...attrs, size: props.size, border: props.border };
  });

  watch(
    () => attrsAll.value,
    () => {
      if (
        attrsAll.value.data &&
        pagination.total &&
        attrsAll.value.data.length === pagination.total
      ) {
        getTableData(pagination);
      } else {
        tableData.value = attrsAll.value.data;
      }
    },
    { immediate: true }
  );

  const paginationAttrs = computed(() => {
    return {
      ...pagination,
      layout: pagination.layout || 'total, prev, pager, next',
      pageSizes: pagination.pageSizes || [100, 200, 300, 400, 500],
    };
  });

  const isPaginationByFront = computed(() => {
    if (attrsAll.value.data && attrsAll.value.data.length === pagination.total) return true;
    return false;
  });

  function getTableData(pagination: { page: number; page_size: number }) {
    const page = pagination.page;
    const page_size = pagination.page_size;
    const list = attrsAll.value.data;
    const length = attrsAll.value.data.length;
    let start = (page - 1) * page_size;
    let end = page * page_size;
    if (start >= length) start = 0;
    if (end >= length) end = length;
    tableData.value = list.slice(start, end);
  }

  const handleCurrentChange = (val: number) => {
    if (isPaginationByFront.value) {
      getTableData({
        page: val,
        page_size: pagination.page_size,
      });
    } else {
      emit('refresh', {
        page: val,
        page_size: pagination.page_size,
      });
    }
  };

  const handleSizeChange = (val: number) => {
    if (isPaginationByFront.value) {
      getTableData({ page: 1, page_size: val });
    } else {
      emit('refresh', { page: 1, page_size: val });
    }
  };

  const handleRefresh = () => {
    const page = isObject(props.pagination) && props.pagination.page ? props.pagination.page : 1;
    handleCurrentChange(page);
  };

  return {
    paginationAttrs,
    attrsAll,
    tableData,
    handleCurrentChange,
    handleSizeChange,
    handleRefresh,
  };
};
