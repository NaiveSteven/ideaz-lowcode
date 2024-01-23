export function useInElement(id: string) {
  const isOutside = ref(true)

  const changeBtnStatus = (status: boolean) => {
    isOutside.value = status
  }

  onMounted(() => {
    const selectorBtn = document.getElementById(id)
    selectorBtn?.addEventListener('mouseenter', () => changeBtnStatus(false))
    selectorBtn?.addEventListener('mouseleave', () => changeBtnStatus(true))
  })

  onBeforeUnmount(() => {
    const selectorBtn = document.getElementById('selector-btn')
    selectorBtn?.removeEventListener('mouseenter', () => changeBtnStatus(false))
    selectorBtn?.removeEventListener('mouseleave', () => changeBtnStatus(true))
  })

  return { isOutside, changeBtnStatus }
}
