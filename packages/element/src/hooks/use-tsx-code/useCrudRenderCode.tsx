export function useCrudRenderCode() {
  const isCrudIncludesSlot = (tableCols: TableCol[]) => {
    return (tableCols || []).some(
      (item: TableCol) => item.slot || (item.search && item.search.slot),
    )
  }

  const getCrudSlotCode = (tableCols: TableCol[]) => {
    const slots: IndexType = {};
    (tableCols || []).forEach((item: TableCol) => {
      const formItemSlot = item.formItemProps ? item.formItemProps.slot : ''
      if (item.slot)
        slots[item.slot] = () => <div>占位代码</div>

      if (formItemSlot)
        slots[formItemSlot] = () => <div>占位代码</div>
    })
    return slots
  }

  const getCrudRenderCode = (tableCols: TableCol[], config: any) => {
    if (config.request) {
      return `<z-crud
        v-model:formData={config.searchFormData}
        v-model:data={config.data}
        ${config.pagination ? 'v-model:pagination={config.pagination}' : ''}
        v-model:loading={config.loading}
        {...config}
      />`
    }
    return !isCrudIncludesSlot(tableCols)
      ? `<z-crud
        v-model:formData={config.searchFormData}
        v-model:data={config.data}
        ${config.pagination ? 'v-model:pagination={config.pagination}' : ''}
        v-model:loading={config.loading}
        {...config}
        onReset={handleSearch}
        onSearch={handleSearch}
        ${config.pagination ? 'onRefresh={handlePaginationChange}' : ''}
      />`
      : `<z-crud
          v-model:formData={config.searchFormData}
          v-model:data={config.data}
          ${config.pagination ? 'v-model:pagination={config.pagination}' : ''}
          v-model:loading={config.loading}
          {...config}
          onReset={handleSearch}
          onSearch={handleSearch}
          ${config.pagination ? 'onRefresh={handlePaginationChange}' : ''}
        >
      ${getCrudSlotCode(tableCols)}
      </z-crud>`
  }

  return { getCrudRenderCode }
}
