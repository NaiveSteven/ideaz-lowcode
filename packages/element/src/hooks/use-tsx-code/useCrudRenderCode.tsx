export function useCrudRenderCode() {
  const isCrudIncludesSlot = (tableCols: CrudColumnWidget[]) => {
    return (tableCols || []).some(
      (item: CrudColumnWidget) => item.slot || (item.search && item.search.slot),
    )
  }

  const getCrudSlotCode = (tableCols: CrudColumnWidget[]) => {
    const slots: IndexType = {};
    (tableCols || []).forEach((item: CrudColumnWidget) => {
      const formItemSlot = item.formItemProps ? item.formItemProps.slot : ''
      if (item.slot)
        slots[item.slot] = () => <div>占位代码</div>

      if (formItemSlot)
        slots[formItemSlot] = () => <div>占位代码</div>
    })
    return slots
  }

  const getCrudRenderCode = (tableCols: CrudColumnWidget[], config: any) => {
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
