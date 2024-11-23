import { useWorkspaceComponent } from '@ideal-schema/playground-store'

export function useMockTableData() {
  const { widgets } = useWorkspaceComponent()

  const getTableData = () => {
    const tableData: IndexType[] = []
    const tableDataItem: IndexType = {}
    if (widgets.value[0]?.schema?.columns) {
      widgets.value[0]?.schema?.columns?.forEach((item) => {
        if (item.prop && !item.type)
          tableDataItem[item.prop] = `${item.prop} mock data`
      });
      ['', '', '', '', ''].forEach((item, index) => {
        tableData.push({ id: index, ...tableDataItem })
      })
    }
    return tableData
  }

  return { getTableData }
}
