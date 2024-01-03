import { getCurrentInstance } from 'vue';
import { ElTable } from 'element-plus';
import type { ComponentInternalInstance } from 'vue';
// import type { OptionsItem } from '../../types';

// export interface Pagination {
//   page: number;
//   page_size: number;
//   total: number;
// }

// export interface BtnItem {
//   label?: string;
//   type?: string;
//   isDisabled?: (row: any, index: number) => boolean;
//   whenShowCb?: (row: any, index: number) => boolean;
//   click?: (row: any, index: number) => void;
//   [propName: string]: any;
// }

// export interface TableCol {
//   // slot?: string;
//   // headerSlot?: string;
//   type?: string;
//   btnList?: BtnItem[];
//   attrs?: {
//     [propName: string]: any;
//   };
//   on?: {
//     [propName: string]: any;
//   };
//   isDisabled?: any;
//   options?: OptionsItem[];
//   [propName: string]: any;
// }

export const useTableMethods = () => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;

  const clearSelection = () => {
    if (ctx?.$refs.cTableColumn && Array.isArray(ctx?.$refs.cTableColumn)) {
      ctx?.$refs.cTableColumn.forEach((column: any) => {
        column.clearSelection && column.clearSelection();
      });
    } else {
      (ctx?.$refs.cTableColumn as typeof ElTable).clearSelection();
    }
    Object.keys(ctx!.$refs).forEach((key) => {
      if (key.startsWith('cTableColumn')) {
        (ctx?.$refs[key] as typeof ElTable).clearSelection &&
          (ctx?.$refs[key] as typeof ElTable).clearSelection();
      }
    });
    return (ctx?.$refs.tablePlus as typeof ElTable).clearSelection();
  };

  const toggleRadioSelection = (row: any) => {
    if (ctx?.$refs.cTableColumn && Array.isArray(ctx?.$refs.cTableColumn)) {
      ctx?.$refs.cTableColumn.forEach((column) => {
        column.toggleRadioSelection && column.toggleRadioSelection(row);
      });
    } else {
      (ctx?.$refs.cTableColumn as typeof ElTable).toggleRadioSelection(row);
    }
    Object.keys(ctx!.$refs).forEach((key) => {
      if (key.startsWith('cTableColumn')) {
        (ctx?.$refs[key] as typeof ElTable).toggleRadioSelection &&
          (ctx?.$refs[key] as typeof ElTable).toggleRadioSelection(row);
      }
    });
    if (ctx?.$refs.tablePlus && (ctx?.$refs.tablePlus as typeof ElTable).toggleRadioSelection) {
      (ctx?.$refs.tablePlus as typeof ElTable).toggleRadioSelection(row);
    }
  };

  const setCurrentRow = <T = any>(row: T) => {
    (ctx?.$refs.cTableRefs as typeof ElTable).setCurrentRow(row);
  };

  const toggleRowSelection = <T = any>(row: T, selected: boolean) => {
    (ctx?.$refs.cTableRefs as typeof ElTable).toggleRowSelection(row, selected);
  };

  // const clearSelection = () => {
  //   (ctx?.$refs.cTableRefs as typeof ElTable).clearSelection();
  // };

  const clearFilter = (columnKeys: string[]) => {
    (ctx?.$refs.cTableRefs as typeof ElTable).clearFilter(columnKeys);
  };

  const toggleAllSelection = () => {
    (ctx?.$refs.cTableRefs as typeof ElTable).toggleAllSelection();
  };

  const toggleRowExpansion = <T = any>(row: T, expanded: boolean) => {
    (ctx?.$refs.cTableRefs as typeof ElTable).toggleRowExpansion(row, expanded);
  };

  const clearSort = () => {
    (ctx?.$refs.cTableRefs as typeof ElTable).clearSort();
  };

  const sort = (prop: string, order: string) => {
    (ctx?.$refs.cTableRefs as typeof ElTable).sort(prop, order);
  };

  return {
    setCurrentRow,
    toggleRowSelection,
    clearSelection,
    clearFilter,
    toggleAllSelection,
    toggleRowExpansion,
    clearSort,
    sort,
    toggleRadioSelection,
  };
};
