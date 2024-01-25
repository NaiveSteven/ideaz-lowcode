import { useWorkspaceStore } from '@ideal-schema/playground-store'

function randomlyGeneratedChineseCharacters(num: number) {
  const arr = []
  for (let i = 0; i < num; i++) {
    let str
    // 汉字对应的unicode编码为u4e00-u9fa5转为10进制为19968-40869，先取随机数，再转为16进制
    str = `\\u${(Math.floor(Math.random() * (40869 - 19968)) + 19968).toString(16)}`
    // 在用正则操作数据后进行解码。注意：unescape() 函数在 JavaScript 1.5 版中已弃用。请使用 decodeURI() 或 decodeURIComponent() 代替。
    str = unescape(str.replace(/\\u/g, '%u'))
    arr.push(str)
  }
  const chinese = arr.join('')
  return chinese
}

export function useMockTableData() {
  const workspaceStore = useWorkspaceStore()
  const workspaceComponentList = computed(() => workspaceStore.workspaceComponentList)

  const getTableData = () => {
    const tableData: IndexType[] = []
    const tableDataItem: IndexType = {}
    if (workspaceComponentList.value[0]?.schema?.columns) {
      workspaceComponentList.value[0]?.schema?.columns?.forEach((item) => {
        if (item.prop && !item.type)
          tableDataItem[item.prop] = randomlyGeneratedChineseCharacters(3)
      });
      ['', '', '', '', ''].forEach(() => {
        tableData.push({ id: randomlyGeneratedChineseCharacters(1), ...tableDataItem })
      })
    }
    return tableData
  }

  return { getTableData }
}
