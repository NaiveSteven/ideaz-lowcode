<template>
  <div>
    <el-table ref="cTableRefs" v-bind="attrsAll" v-loading="loading">
      <slot name="append"></slot>
      <template v-for="(item, index) in props.tableCols" :key="index">
        <c-table-column :table-col="item" :size="props.size">
          <template #[item.slot]="scope">
            <slot :name="item.slot" :row="scope.row" :index="index"></slot>
          </template>
          <template #[item.headerSlot]="scope">
            <slot :name="item.headerSlot" :column="scope.column" :index="index"></slot>
          </template>
        </c-table-column>
      </template>
    </el-table>
    <div class="c-flex c-justify-content-flex-end c-mt-4">
      <div></div>
      <el-pagination
        v-if="props.pagination.page_size"
        v-bind="paginationAttrs"
        background
        small
        :page-size="props.pagination.page_size"
        :current-page="props.pagination.page"
        :total="props.pagination.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAttrs, computed } from 'vue';
  import { useTableMethods } from '@ideal-schema/ideal-ui-v3';
  import CTableColumn from './TableColumn.vue';
  import type { TableCol, Pagination } from '@ideal-schema/ideal-ui-v3';

  interface CTableProps {
    pagination?: Pagination;
    paginationSizes?: number[];
    loading?: boolean;
    size?: string;
    border?: boolean;
    tableCols: TableCol[];
  }

  const {
    setCurrentRow,
    toggleRowSelection,
    clearSelection,
    clearFilter,
    toggleAllSelection,
    toggleRowExpansion,
    clearSort,
    sort,
  } = useTableMethods();
  const attrs = useAttrs();

  const props = withDefaults(defineProps<CTableProps>(), {
    pagination: () => ({ page: 1, page_size: 0, total: 0 }),
    paginationSizes: () => [10, 20, 40, 50, 100],
    size: 'small',
    border: true,
  });
  const emit = defineEmits(['refresh']);

  const attrsAll = computed(() => ({ ...attrs, size: props.size, border: props.border }));
  const paginationAttrs = computed(() => {
    return {
      ...props.pagination,
      layout: props.pagination.layout || 'total, prev, pager, next',
      pageSizes: props.pagination.pageSizes || [100, 200, 300, 400, 500],
    };
  });

  const handleCurrentChange = (val: number) => {
    emit('refresh', { page: val, page_size: props.pagination.page_size });
  };
  const handleSizeChange = (val: number) => {
    emit('refresh', { page: 1, page_size: val });
  };

  defineExpose({
    setCurrentRow,
    toggleRowSelection,
    clearSelection,
    clearFilter,
    toggleAllSelection,
    toggleRowExpansion,
    clearSort,
    sort,
  });
</script>
