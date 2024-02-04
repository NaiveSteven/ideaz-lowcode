import { useGlobalSetting } from '@ideal-schema/playground-store'
import mitt from '../event'

export function useAsideToggle(direction: 'right' | 'left', trueWidth: string, interval: number) {
  const { compositeArrowDirection, settingArrowDirection, updateCompositeArrowDirection, updateSettingArrowDirection } = useGlobalSetting()

  let timeout: NodeJS.Timeout

  const clickAsideToggleWidget = (hideDirection?: 'right' | 'left') => {
    let contentElement: HTMLElement
    if (direction === 'right')
      contentElement = document.getElementById('settings-panel') as HTMLElement
    else
      contentElement = document.getElementsByClassName('composite-panel-tabs-content')[0] as HTMLElement

    const width = contentElement.style.width
    if (((!width || width === '0px') && width !== '') || hideDirection)
      contentElement.style.width = trueWidth
    else
      contentElement.style.width = '0'

    if (direction === 'right')
      updateSettingArrowDirection(settingArrowDirection.value === 'right' ? 'left' : 'right')

    else
      updateCompositeArrowDirection(compositeArrowDirection.value === 'right' ? 'left' : 'right')

    timeout = setTimeout(() => mitt.emit('selection-change'), interval)
  }

  onBeforeUnmount(() => {
    clearTimeout(timeout)
  })

  return { compositeArrowDirection, settingArrowDirection, clickAsideToggleWidget }
}
