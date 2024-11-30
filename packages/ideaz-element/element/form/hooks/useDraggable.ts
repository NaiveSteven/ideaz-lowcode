import type { Ref } from 'vue'
import type { FormColumn } from '../../types'

export function useDraggable(emit: any, columns: Ref<FormColumn[]>) {
  const dragging = ref(false)

  const draggableOptions = [
    {
      options: {
        draggable: '.z-form-item-draggable',
        ghostClass: 'ghost',
        group: 'people',
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
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
