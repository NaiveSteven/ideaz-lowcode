import { defineComponent, useAttrs, ref, onMounted } from 'vue';
import Sortable from 'sortablejs';
import CTableColumn from './CTableColumn';
import ToolBar from './ToolBar';
import { useExpose, useTableSlots, usePagination, useTableCols } from '../hooks';
import { useTableMethods } from '../hooks';
import { props } from './props';
import type { TableCol } from '@ideal-schema/ideal-ui-v3';

export default defineComponent({
  name: 'CTablePlus',
  components: { CTableColumn, ToolBar },
  inheritAttrs: false,
  props,
  emits: ['refresh', 'radio-change', 'on-update-table-column'],
  setup(props, { emit, slots }) {
    const attrs = useAttrs();
    const {
      setCurrentRow,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      toggleRadioSelection,
      sort,
    } = useTableMethods();

    useExpose({
      setCurrentRow,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      toggleRadioSelection,
      sort,
    });
    const {
      paginationAttrs,
      attrsAll,
      tableData,
      handleCurrentChange,
      handleSizeChange,
      handleRefresh,
    } = usePagination(props, attrs, emit);
    const tableKey = ref(new Date().valueOf());
    const { formatTableCols, middleTableCols, sortTableCols, originFormatTableCols } =
      useTableCols(props);
    const { scopedSlots } = useTableSlots(formatTableCols, slots);
    const size = ref(props.size);

    function columnDrop(dropCol: TableCol[], cls: string) {
      //获取dom节点
      const wrapperTr = document.querySelector(cls);
      Sortable.create(wrapperTr, {
        animation: 200,
        delay: 0,
        ghostClass: 'table-col__ghost',
        onEnd: (evt: any) => {
          emit(
            'on-update-table-column',
            formatTableCols.value.filter((item) => item.prop)[evt.oldIndex],
            evt.newIndex,
            evt.oldIndex
          );
          // const oldItem = dropCol[evt.oldIndex - 1];
          // dropCol.splice(evt.oldIndex - 1, 1);
          // dropCol.splice(evt.newIndex - 1, 0, oldItem);
        },
      });
      return dropCol;
    }

    onMounted(() => {
      if (props.draggable) {
        columnDrop(formatTableCols.value, '.el-table__header-wrapper tr');
        columnDrop(formatTableCols.value, '.el-table__body-wrapper .el-table__row');
      }
    });

    return () => {
      const { pagination, isPagination, loading, topRender, toolBar } = props;

      return (
        <div class="c-table-plus__container">
          <div class="tool-bar__container">
            <div class="tool-bar__left">
              {topRender ? topRender() : null}
              {slots.top ? slots.top() : null}
            </div>
            {toolBar && (
              <ToolBar
                formatTableCols={formatTableCols.value}
                middleTableCols={middleTableCols.value}
                originFormatTableCols={originFormatTableCols.value}
                sortTableCols={sortTableCols.value}
                size={size.value}
                onColumns-change={(data) => {
                  middleTableCols.value = data;
                  tableKey.value = new Date().valueOf();
                }}
                onSize-change={(val) => {
                  size.value = val;
                }}
                onTable-cols-change={(val) => {
                  sortTableCols.value = val;
                  tableKey.value = new Date().valueOf();
                }}
                onRefresh={() => handleRefresh()}
              />
            )}
          </div>
          {/* 表格顶部数据统计 */}
          {/* <TableStatistics {...props} /> */}
          <el-table
            ref="cTableRefs"
            v-loading={loading}
            class="c-table-plus"
            key={tableKey.value}
            // v-on={attrs}
            // v-bind={attrs}
            {...attrs}
            {...{ ...attrsAll.value, data: tableData.value, size: size.value }}
          >
            {slots.append && slots.append()}
            {formatTableCols.value.map((item, index) => {
              return (
                <c-table-column
                  ref={'cTableColumn' + index}
                  tableCol={item}
                  key={item.__uid}
                  size={size.value}
                  tableAttrs={attrsAll.value}
                  onRadio-change={(row: any) => emit('radio-change', row)}
                  v-slots={scopedSlots}
                />
              );
            })}
          </el-table>
          {isPagination || pagination.page_size ? (
            <el-pagination
              class="c-table-plus__pagination"
              background
              small
              pageSize={pagination.page_size}
              currentPage={pagination.page}
              total={pagination.total}
              {...paginationAttrs.value}
              onUpdate:current-page={handleCurrentChange}
              onUpdate:page-size={handleSizeChange}
            />
          ) : null}
        </div>
      );
    };
  },
});

export const TableStatistics = ({ props }: any) => {
  const { tableStatistics, statisticsCustomClass, pagination } = props;
  return (
    <div
      v-show={tableStatistics.length}
      class={['c-table-plus-data__statistics', statisticsCustomClass]}
    >
      <div>
        <span class="el-icon-info icon" />
        <span>
          共<em>{pagination.total}</em>项
        </span>
        {tableStatistics.map((item: { label: string; value: any }, index: number) => {
          return (
            <span key={index}>
              {item.label}
              <em>{item.value}</em>
            </span>
          );
        })}
      </div>
    </div>
  );
};
