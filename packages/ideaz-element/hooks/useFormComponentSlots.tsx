import type { Ref, Slot } from 'vue'
import { isFunction, isString } from '../utils'

export interface Slots {
  [name: string]: undefined | string | (() => JSX.Element) | Slot
}

export function useFormComponentSlots(props: Record<any, any>, slots: Slots, slotKeys: string[]) {
  const scopedSlots: Ref<Slots> = shallowRef({})

  const getSlotContent = (
    slot: string | (() => JSX.Element) | undefined | Slot,
    defaultContent: Slot | (() => JSX.Element) | undefined = () => <span />,
  ) => {
    if (isFunction(slot))
      return slot

    else if (isString(slot))
      return () => <span>{slot}</span>

    return defaultContent
  }

  watchEffect(() => {
    scopedSlots.value = {}
    slotKeys.forEach((key) => {
      if (slots[key] || props[key])
        scopedSlots.value[key] = getSlotContent((slots[key]), getSlotContent(props[key]))
    })
  })

  return { scopedSlots }
}
