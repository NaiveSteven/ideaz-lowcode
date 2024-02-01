import './style.scss'

export default defineComponent({
  name: 'PadSimulatorWidget',
  setup() {
    const slots = useSlots()
    const width = ref(0)
    const height = ref(0)
    const isLoading = ref(true)

    onMounted(() => {
      const dom = document.getElementsByClassName('board')[0]
      const domRect = dom.getBoundingClientRect()
      width.value = domRect.width
      height.value = domRect.height
      isLoading.value = false
    })

    return () => (
      <div class="board">
        {!isLoading.value && (
          <drag-resize
            isActive={true}
            class="pad-simulator"
            isDraggable={false}
            w={width.value}
            h={height.value}
          >
            <div class="h-full w-full" onMousedown={(e: MouseEvent) => { e.stopPropagation() }} onMouseup={(e: MouseEvent) => { e.stopPropagation() }}>
              {slots.default && slots.default()}
            </div>
          </drag-resize>
        )}
      </div>
    )
  },
})
