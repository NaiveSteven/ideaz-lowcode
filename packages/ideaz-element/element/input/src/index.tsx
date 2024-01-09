import { reactiveOmit } from '@vueuse/core'
import { useInputMethods } from '../hooks'
import { useExpose, useFormComponentSlots, useFormSize, useVModel } from '../../../hooks'
import { INPUT_SLOTS, inputEmits, inputProps } from './input'

export default defineComponent({
  name: 'ZInput',
  inheritAttrs: false,
  props: inputProps,
  emits: inputEmits,
  setup: (props, { emit, slots, attrs }) => {
    const { vModelVal, handleInput } = useVModel(props, emit)
    const { scopedSlots } = useFormComponentSlots(props, slots, INPUT_SLOTS)
    const { focus, blur, select, clear, resizeTextarea } = useInputMethods()
    const size = useFormSize()
    useExpose({ focus, blur, select, clear, resizeTextarea })

    return () => {
      const vue3Props = reactiveOmit(props, 'value', 'prefix')

      return (
        <el-input
          ref="inputRef"
          {...vue3Props}
          {...attrs}
          size={size.value}
          modelValue={vModelVal.value}
          onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
          onInput={handleInput}
          v-slots={scopedSlots.value}
        />
      )
    }
  },
})
