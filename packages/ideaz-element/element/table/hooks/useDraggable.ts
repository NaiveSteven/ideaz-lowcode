import type { Ref } from 'vue'

export function useDraggable(emit: any, tableData: Ref<any>, middleTableCols: Ref<any>) {
  const dragging = ref(false)

  const draggableOptions = [
    {
      selector: '.el-table__header-wrapper tr',
      options: {
        animation: 150,
        delay: 0,
        ghostClass: 'table-col__ghost',
        filter: '.inline-column-operation',
        onEnd: (evt: any) => {
          const { newIndex, oldIndex } = evt
          const arr = [...middleTableCols.value]
          const [moveRowData] = [...arr.splice(oldIndex as number, 1)]
          arr.splice(newIndex as number, 0, moveRowData)
          middleTableCols.value = []
          nextTick(() => {
            middleTableCols.value = [...arr]
            emit(
              'drag-column-end',
              middleTableCols.value.filter((item: any) => item.prop)[evt.newIndex],
              evt.newIndex,
              evt.oldIndex,
            )
          })
        },
      },
    },
    {
      selector: '.el-table__body-wrapper .el-table__row',
      options: {
        animation: 150,
        delay: 0,
        ghostClass: 'table-col__ghost',
        filter: '.inline-column-operation',
        onEnd: (evt: any) => {
          const { newIndex, oldIndex } = evt
          const arr = [...middleTableCols.value]
          const [moveRowData] = [...arr.splice(oldIndex as number, 1)]
          arr.splice(newIndex as number, 0, moveRowData)
          middleTableCols.value = []
          nextTick(() => {
            middleTableCols.value = [...arr]
            emit(
              'drag-column-end',
              middleTableCols.value.filter((item: any) => item.prop)[evt.newIndex],
              evt.newIndex,
              evt.oldIndex,
            )
          })
        },
      },
    },
  ]

  return { draggableOptions, dragging }
}
