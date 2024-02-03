import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import './style.scss'

export default defineComponent({
  name: 'Clear',
  setup() {
    const { updateBoardWH, boardHeight, boardWidth, originBoardHeight, originBoardWidth } = useWorkspaceComponent()

    return () => (
      <div class="board-wh">
        <el-input modelValue={boardWidth.value} onInput={(val: string) => updateBoardWH(Number(val), boardHeight.value)} />
        <span class="board-wh-md">x</span>
        <el-input class="mr-2" modelValue={boardHeight.value} onInput={(val: string) => updateBoardWH(boardWidth.value, Number(val))} />
        {(Number(boardHeight.value) !== Number(originBoardHeight.value) || Number(boardWidth.value) !== Number(originBoardWidth.value))
          ? (
            <el-tooltip effect="light" content="清空" placement="top" showAfter={500}>
              <el-button onClick={() => updateBoardWH(originBoardWidth.value, originBoardHeight.value)}>
                <el-icon><i-refresh-right /></el-icon>
              </el-button>
            </el-tooltip>
            )
          : null}
      </div>
    )
  },
})
