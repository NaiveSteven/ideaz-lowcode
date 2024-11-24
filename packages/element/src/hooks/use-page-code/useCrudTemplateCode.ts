export function useCrudTemplateCode() {
  const isCrudIncludesSlot = (tableCols: CrudColumnWidget[]) => {
    return (tableCols || []).some(
      (item: CrudColumnWidget) => item.slot || (item.search && item.search.slot),
    )
  }

  const getCrudSlotCode = (tableCols: CrudColumnWidget[]) => {
    let str = ``;
    (tableCols || []).forEach((item: CrudColumnWidget) => {
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

  const getCrudTemplateCode = (tableCols: CrudColumnWidget[], config: any) => {
    if (config.request) {
      return `<z-crud
      v-bind="config"
      v-model:formData="config.searchFormData"
      v-model:data="config.data"
      ${config.pagination ? 'v-model:pagination="config.pagination"' : ''}
      v-model:loading="config.loading"
    />`
    }
    return !isCrudIncludesSlot(tableCols)
      ? `<z-crud
        v-bind="config"
        v-model:formData="config.searchFormData"
        v-model:data="config.data"
        ${config.pagination ? 'v-model:pagination="config.pagination"' : ''}
        v-model:loading="config.loading"
        @reset="handleSearch"
        @search="handleSearch"
        ${config.pagination ? '@refresh="handlePaginationChange"' : ''}
      />`
      : `<z-crud
          v-bind="config"
          v-model:formData="config.searchFormData"
          v-model:data="config.data"
          ${config.pagination ? 'v-model:pagination="config.pagination"' : ''}
          v-model:loading="config.loading"
          @reset="handleSearch"
          @search="handleSearch"
          ${config.pagination ? '@refresh="handlePaginationChange"' : ''}
        >
      ${getCrudSlotCode(tableCols)}
    </z-crud>`
  }

  return { getCrudTemplateCode }
}
