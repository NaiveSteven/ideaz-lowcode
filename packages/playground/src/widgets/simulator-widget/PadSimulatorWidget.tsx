import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import './style.scss'

export default defineComponent({
  name: 'PadSimulatorWidget',
  setup() {
    const { updateBoardWH } = useWorkspaceComponent()
    const slots = useSlots()

    const width = ref(0)
    const height = ref(0)
    const isLoading = ref(true)
    const dragKey = ref(new Date().valueOf())

    onMounted(() => {
      const dom = document.getElementsByClassName('board')[0]
      const domRect = dom.getBoundingClientRect()
      width.value = domRect.width
      height.value = domRect.height
      console.log(width.value, height.value, 'asdf')
      updateBoardWH(width.value, height.value)
      isLoading.value = false
    })

    const handleResizeStop = (left: number, top: number, width: number, height: number) => {
      updateBoardWH(width, height)
    }

    return () => (
      <div class="board">
        {!isLoading.value && (
          <vue-drag-resize-rotate
            isActive={true}
            class="pad-simulator"
            draggable={true}
            rotatable={false}
            key={dragKey.value}
            w={width.value}
            h={height.value}
            enableNativeDrag={true}
            onResizestop={handleResizeStop}
          >
            {slots.default && slots.default()}
          </vue-drag-resize-rotate>
        )}
      </div>
    )
  },
})
