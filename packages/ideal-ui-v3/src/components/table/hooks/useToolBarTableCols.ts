import { ref } from 'vue';
import type { TableCol } from '@ideal-schema/ideal-ui-v3';

export const useToolBarTableCols = (props: IndexType, emit: any) => {
  const checkAll = ref(true);
  const isIndeterminate = ref(false);
  const checkedTableCols = ref(props.sortTableCols.map((item: TableCol) => item.__uid));

  const handleCheckAllChange = (val: string[]) => {
    checkedTableCols.value = val ? props.sortTableCols.map((item: TableCol) => item.__uid) : [];
    isIndeterminate.value = false;
    handleChangeTableCols(val ? props.sortTableCols.map((item: TableCol) => item.__uid) : []);
  };

  const handleCheckedTableColsChange = (val: string[]) => {
    checkAll.value = val.length === props.sortTableCols.length;
    isIndeterminate.value = val.length > 0 && val.length < props.sortTableCols.length;
    handleChangeTableCols(val);
  };

  const handleChangeTableCols = (values: string[]) => {
    const data: TableCol[] = [];
    if (values && values.length > 0) {
      props.sortTableCols.forEach((tableCol: TableCol) => {
        values.forEach((value) => {
          if (value === tableCol.__uid) {
            data.push(tableCol);
          }
        });
      });
    }
    emit('columns-change', data);
  };

  const handleDataChange = (val: TableCol[], tableCols: TableCol[]) => {
    const data: TableCol[] = [];
    if (tableCols && tableCols.length > 0) {
      val.forEach((tableCol: TableCol) => {
        const item = tableCols.find((item) => item.__uid === tableCol.__uid);
        if (item && item.__uid) {
          data.push(item);
        }
      });
    }
    emit('table-cols-change', val);
    emit('columns-change', data);
  };

  const handleReset = () => {
    isIndeterminate.value = false;
    checkAll.value = true;
    checkedTableCols.value = props.originFormatTableCols.map((item: TableCol) => item.__uid);
    handleDataChange(props.originFormatTableCols, props.originFormatTableCols);
  };

  return {
    checkAll,
    isIndeterminate,
    checkedTableCols,
    handleCheckAllChange,
    handleCheckedTableColsChange,
    handleReset,
    handleDataChange,
  };
};
