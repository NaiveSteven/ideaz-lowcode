import { getCurrentInstance, onBeforeUnmount, ref } from 'vue'
import mitt from '@ideal-schema/playground-event'
import type { ComponentInternalInstance } from 'vue'

export function useAsideToggle(direction: 'right' | 'left', trueWidth: string, interval: number, fixedDirection?: 'right' | 'left') {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance

  const arrowDirection = ref(direction)

  let timeout: NodeJS.Timeout

  const clickAsideToggleWidget = (hideDirection?: 'right' | 'left') => {
    let contentElement: HTMLElement
    if (fixedDirection === 'right' || hideDirection === 'right')
      contentElement = document.getElementById('settings-panel') as HTMLElement
    else
      contentElement = ctx?.$refs.content as HTMLElement

    const width = contentElement.style.width
    if (((!width || width === '0px') && width !== '' && !fixedDirection) || hideDirection)
      contentElement.style.width = trueWidth
    else
      contentElement.style.width = '0'

    arrowDirection.value = arrowDirection.value === 'right' ? 'left' : 'right'
    timeout = setTimeout(() => mitt.emit('selection-change'), interval)
  }

  onBeforeUnmount(() => {
    clearTimeout(timeout)
  })

  return { arrowDirection, clickAsideToggleWidget }
}
