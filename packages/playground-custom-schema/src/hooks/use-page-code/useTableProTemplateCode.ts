export const useTableProTemplateCode = () => {
  const isTableProIncludesSlot = (tableCols: TableCol[]) => {
    return (tableCols || []).some(
      (item: TableCol) => item.slot || (item.formItemProps && item.formItemProps.slot)
    );
  };

  const getTableProSlotCode = (tableCols: TableCol[]) => {
    let str = ``;
    (tableCols || []).forEach((item: TableCol) => {
      const formItemSlot = item.formItemProps ? item.formItemProps.slot : '';
      if (item.slot) {
        str = str.length
          ? str +
            `
        ` +
            `<template #${item.slot}>
            <div>占位代码</div>
        </template>`
          : str +
            `<template #${item.slot}>
        <div>占位代码</div>
    </template>`;
      }
      if (formItemSlot) {
        str = str.length
          ? str +
            `
      ` +
            `<template #${formItemSlot}>
          <div>占位代码</div>
      </template>`
          : str +
            `<template #${formItemSlot}>
      <div>占位代码</div>
  </template>`;
      }
    });
    return str;
  };

  const getTableProTemplateCode = (tableCols: TableCol[]) => {
    return !isTableProIncludesSlot(tableCols)
      ? `<c-table-pro
        :config="config"
        @reset="handleSearch"
        @search="handleSearch"
        @refresh="handlePaginationChange"
      />`
      : `<c-table-pro
          :config="config"
        >
      ${getTableProSlotCode(tableCols)}
    </c-table-pro>`;
  };

  return { getTableProTemplateCode };
};
