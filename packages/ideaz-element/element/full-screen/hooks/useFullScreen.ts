import type { EnhancedHTMLElement } from '../../../utils'
import {
  enterFullscreen,
  exitFullscreen,
  getFullscreenElement,
  isFullscreen,
  isFunction,
  listenFullscreen,
} from '../../../utils'

export interface UseFullscreenOptions {
  getElement?: (() => EnhancedHTMLElement) | HTMLElement
  onFullscreenChange?: (state: boolean) => void
}

export function useFullscreen({ getElement = () => document.body, onFullscreenChange }: UseFullscreenOptions = {}) {
  const isTargetFullscreen = ref(false)
  const checkFullscreenStatus = () => {
    const element = isFunction(getElement) ? getElement() : getElement
    const isFullscreenFlag = isFullscreen()
    isTargetFullscreen.value = isFullscreenFlag ? (getFullscreenElement() || document.body) === element : false
  }
  const toggleFullscreen = () => {
    const element = isFunction(getElement) ? getElement() : getElement
    checkFullscreenStatus()
    if (isTargetFullscreen.value === true)
      exitFullscreen()

    else
      enterFullscreen(element)
  }
  onMounted(() => {
    checkFullscreenStatus()
    listenFullscreen(() => {
      checkFullscreenStatus()
      onFullscreenChange?.(isTargetFullscreen.value)
    })
  })

  return {
    isTargetFullscreen,
    toggleFullscreen,
  }
}
