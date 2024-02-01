import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import './style.scss'

export default defineComponent({
  name: 'PadSimulatorWidget',
  setup() {
    const slots = useSlots()
    const { curOperateComponent } = useWorkspaceComponent()

    const width = ref(0)
    const height = ref(0)
    const y = ref(0)
    const x = ref(0)
    const isLoading = ref(true)
    const dragKey = ref(new Date().valueOf())

    watch(() => curOperateComponent.value, () => {
      const dom = document.getElementsByClassName('pad-simulator')[0]
      const domRect = dom.getBoundingClientRect()
      width.value = domRect.width
      height.value = domRect.height
      y.value = domRect.top - 83
      x.value = domRect.left - 354
      dragKey.value = new Date().valueOf()
    })

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
            key={dragKey.value}
            w={width.value}
            h={height.value}
            y={y.value}
            x={x.value}
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
