import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import './style.scss'

export default defineComponent({
  name: 'Clear',
  setup() {
    const { updateBoardWH, boardHeight, boardWidth } = useWorkspaceComponent()

    return () => (
      <div class="board-wh">
        <el-input modelValue={boardWidth.value} onInput={(val: string) => updateBoardWH(Number(val), boardHeight.value)} />
        <span class="board-wh-md">x</span>
        <el-input modelValue={boardHeight.value} onInput={(val: string) => updateBoardWH(boardWidth.value, Number(val))} />
      </div>
    )
  },
})
