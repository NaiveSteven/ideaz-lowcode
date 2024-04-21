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

  const getCrudRenderCode = (tableCols: TableCol[]) => {
    return !isCrudIncludesSlot(tableCols)
      ? `<z-crud
        v-model:searchFormData={searchFormData.value}
        {...config}
        columns={columns.value}
        onReset={handleSearch}
        onSearch={handleSearch}
        onRefresh={handlePaginationChange}
      />`
      : `<z-crud
          columns={columns.value}
        >
      ${getCrudSlotCode(tableCols)}
    </z-crud>`
  }

  return { getCrudRenderCode }
}
