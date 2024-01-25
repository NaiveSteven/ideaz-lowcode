import type { Ref } from 'vue'
import type { FormColumn } from '../../types'

export function useDraggable(emit: any, columns: Ref<FormColumn[]>) {
  const dragging = ref(false)

  // remark draggable
  const draggableOptions = [
    {
      options: {
        draggable: '.el-form-item',
        animation: 200,
        ghostClass: 'ghost',
        onStart: () => {
          dragging.value = true
        },
        onEnd: (evt: any) => {
          dragging.value = false
          const { oldIndex, newIndex } = evt
          const newArr = [...columns.value]
          const objToMove = newArr[oldIndex]
          newArr.splice(oldIndex, 1)
          newArr.splice(newIndex, 0, objToMove)
          emit('update:columns', { columns: newArr, dragEvent: evt })
        },
      },
    },
  ]

  return { draggableOptions, dragging }
}
