export function useCrudTemplateCode() {
  const isCrudIncludesSlot = (tableCols: TableCol[]) => {
    return (tableCols || []).some(
      (item: TableCol) => item.slot || (item.search && item.search.slot),
    )
  }

  const getCrudSlotCode = (tableCols: TableCol[]) => {
    let str = ``;
    (tableCols || []).forEach((item: TableCol) => {
      const formItemSlot = item.formItemProps ? item.formItemProps.slot : ''
      if (item.slot) {
        str = str.length
          ? `${str
            }
        `
            + `<template #${item.slot}>
            <div>占位代码</div>
        </template>`
          : `${str
            }<template #${item.slot}>
        <div>占位代码</div>
    </template>`
      }
      if (formItemSlot) {
        str = str.length
          ? `${str
            }
      `
            + `<template #${formItemSlot}>
          <div>占位代码</div>
      </template>`
          : `${str
            }<template #${formItemSlot}>
      <div>占位代码</div>
  </template>`
      }
    })
    return str
  }

  const getCrudTemplateCode = (tableCols: TableCol[]) => {
    return !isCrudIncludesSlot(tableCols)
      ? `<z-crud
        v-bind="config"
        v-model:formData="config.searchFormData"
        v-model:data="config.data"
        v-model:pagination="config.pagination"
        @reset="handleSearch"
        @search="handleSearch"
        @refresh="handlePaginationChange"
      />`
      : `<z-crud
          v-bind="config"
          v-model:formData="config.searchFormData"
          v-model:data="config.data"
          v-model:pagination="config.pagination"
          @reset="handleSearch"
          @search="handleSearch"
          @refresh="handlePaginationChange"
        >
      ${getCrudSlotCode(tableCols)}
    </z-crud>`
  }

  return { getCrudTemplateCode }
}
