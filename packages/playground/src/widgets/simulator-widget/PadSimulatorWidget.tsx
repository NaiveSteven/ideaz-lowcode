import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import mitt from '../../event'
import './style.scss'

export default defineComponent({
  name: 'PadSimulatorWidget',
  setup() {
    const { updateBoardWH, boardHeight, boardWidth, originBoardHeight, originBoardWidth, updateOriginBoardWH } = useWorkspaceComponent()
    const { compositeArrowDirection, settingArrowDirection } = useGlobalSetting()
    const slots = useSlots()

    const width = ref(0)
    const height = ref(0)
    const isLoading = ref(true)
    const vueDragResizeRotate = ref()
    const dragKey = ref(new Date().valueOf())

    onMounted(() => {
      mitt.on('board-drag-reset', () => {
        updateBoardWH(originBoardWidth.value, originBoardHeight.value)
        dragKey.value = new Date().valueOf()
      })
    })

    onBeforeUnmount(() => {
      mitt.off('board-drag-reset')
    })

    watch(() => [boardHeight.value, boardWidth.value], async () => {
      await nextTick()
      width.value = boardWidth.value
      height.value = boardHeight.value
    })

    watch(() => [compositeArrowDirection.value, settingArrowDirection.value], async () => {
      await delay(300)
      await nextTick()
      // When the user expands the board, the drag-and-drop area needs to be extended simultaneously
      if (boardWidth.value === originBoardWidth.value && boardHeight.value === originBoardHeight.value)
        initResizeWH()
    })

    onMounted(() => {
      initResizeWH()
      isLoading.value = false
    })

    const handleResizeStop = (left: number, top: number, width: number, height: number) => {
      updateBoardWH(width, height)
    }

    async function initResizeWH() {
      const dom = document.getElementsByClassName('board')[0]
      const domRect = dom.getBoundingClientRect()
      width.value = domRect.width
      height.value = domRect.height
      updateBoardWH(width.value, height.value)
      updateOriginBoardWH(width.value, height.value)
    }

    function delay(time: number) {
      return new Promise((resolve) => {
        setTimeout(resolve, time)
      })
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
