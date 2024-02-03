import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import './style.scss'

export default defineComponent({
  name: 'PadSimulatorWidget',
  setup() {
    const { updateBoardWH, boardHeight, boardWidth, originBoardHeight, originBoardWidth, updateOriginBoardWH } = useWorkspaceComponent()
    const slots = useSlots()

    watch(() => [boardHeight.value, boardWidth.value], () => {
      updateResizeWH()
    })

    const width = ref(0)
    const height = ref(0)
    const isLoading = ref(true)
    const vueDragResizeRotate = ref()
    const dragKey = ref(new Date().valueOf())

    onMounted(() => {
      const dom = document.getElementsByClassName('board')[0]
      const domRect = dom.getBoundingClientRect()
      width.value = domRect.width
      height.value = domRect.height
      updateBoardWH(width.value, height.value)
      updateOriginBoardWH(width.value, height.value)
      isLoading.value = false
    })

    const handleResizeStop = (left: number, top: number, width: number, height: number) => {
      updateBoardWH(width, height)
    }

    const updateResizeWH = async () => {
      await nextTick()
      width.value = boardWidth.value
      height.value = boardHeight.value
      if (Number(boardWidth.value) === Number(originBoardWidth.value) && Number(boardHeight.value) === Number(originBoardHeight.value))
        dragKey.value = new Date().valueOf()
    }

    return () => (
      <div class="board">
        {!isLoading.value && (
          <vue-drag-resize-rotate
            ref={vueDragResizeRotate}
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
