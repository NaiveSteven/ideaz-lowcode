import { getCurrentInstance } from 'vue';
import type { ComponentInternalInstance } from 'vue';
import { ElTable } from 'element-plus';
import { isArray } from '@ideal-schema/shared';

export const useTableMethods = () => {
  const instance = getCurrentInstance() as ComponentInternalInstance;
  const ctx = instance.proxy;

  const clearSelection = () => {
    if (ctx?.$refs.cTableColumn && isArray(ctx?.$refs.cTableColumn)) {
      ctx?.$refs.cTableColumn.forEach((column: any) => {
        column.clearSelection && column.clearSelection();
      });
    }
    Object.keys(ctx!.$refs).forEach((key) => {
      if (key.startsWith('cTableColumn')) {
        (ctx?.$refs[key] as typeof ElTable).clearSelection &&
          (ctx?.$refs[key] as typeof ElTable).clearSelection();
      }
    });
    return (ctx?.$refs.cTableRefs as typeof ElTable).clearSelection();
  };

  const toggleRadioSelection = (row: any) => {
    if (ctx?.$refs.cTableColumn && isArray(ctx?.$refs.cTableColumn)) {
      ctx?.$refs.cTableColumn.forEach((column) => {
        column.toggleRadioSelection && column.toggleRadioSelection(row);
      });
    }
    Object.keys(ctx!.$refs).forEach((key) => {
      if (key.startsWith('cTableColumn')) {
        (ctx?.$refs[key] as typeof ElTable).toggleRadioSelection &&
          (ctx?.$refs[key] as typeof ElTable).toggleRadioSelection(row);
      }
    });
    if (ctx?.$refs.cTableRefs && (ctx?.$refs.cTableRefs as typeof ElTable).toggleRadioSelection) {
      (ctx?.$refs.cTableRefs as typeof ElTable).toggleRadioSelection(row);
    }
  };

  const setCurrentRow = (row: any) => {
    return (ctx?.$refs.cTableRefs as typeof ElTable).setCurrentRow(row);
  };

  const toggleRowSelection = (...args: any) => {
    return (ctx?.$refs.cTableRefs as typeof ElTable).toggleRowSelection(...args);
  };

  const clearFilter = (...args: any) => {
    return (ctx?.$refs.cTableRefs as typeof ElTable).clearFilter(...args);
  };

  const toggleAllSelection = () => {
    return (ctx?.$refs.cTableRefs as typeof ElTable).toggleAllSelection();
  };

  const toggleRowExpansion = (...args: any) => {
    return (ctx?.$refs.cTableRefs as typeof ElTable).toggleRowExpansion(...args);
  };

  const clearSort = () => {
    return (ctx?.$refs.cTableRefs as typeof ElTable).clearSort();
  };

  const sort = (...args: any) => {
    return (ctx?.$refs.cTableRefs as typeof ElTable).sort(...args);
  };

  const doLayout = () => {
    return (ctx?.$refs.cTableRefs as typeof ElTable).doLayout();
  };

  return {
    setCurrentRow,
    toggleRowSelection,
    clearSelection,
    clearFilter,
    toggleAllSelection,
    toggleRowExpansion,
    clearSort,
    toggleRadioSelection,
    sort,
    doLayout,
  };
};
