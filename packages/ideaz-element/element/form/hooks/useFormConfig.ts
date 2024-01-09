import { omit } from 'lodash-unified'
import { FORM_FILTER_KEYS } from '../src/props'
import { useFormSize } from '../../../hooks'
import type { FormProps } from '../src/props'

export function useFormConfig(props: FormProps) {
  const size = useFormSize()

  const formConfig = computed(() => {
    return {
      size: size.value,
      ...omit(props, FORM_FILTER_KEYS),
    }
  })

  return { formConfig }
}
