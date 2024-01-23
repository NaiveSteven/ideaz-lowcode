interface CommonDialogProps<T = any> {
  mode?: string
  modelValue: boolean
  curItem?: T
}

export function useShowDialog(
  props: CommonDialogProps,
  emit: any,
  showDialogCallback: Function = function () {},
  hideDialogCallback: Function = function () {},
) {
  const visible = ref<boolean>(false)

  watch(
    () => props.modelValue,
    (newValue) => {
      visible.value = newValue
    },
    { immediate: true },
  )

  watch(visible, async (newValue) => {
    await nextTick()
    if (!newValue)
      hideDialogCallback()

    else
      showDialogCallback()

    emit('update:modelValue', newValue)
  })

  return { visible }
}
