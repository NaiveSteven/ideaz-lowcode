import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import './style.scss'

export default defineComponent({
  name: 'Clear',
  setup() {
    const { boardHeight, boardWidth } = useWorkspaceComponent()

    return () => (
      <div class="board-wh">
        <el-input modelValue={boardWidth.value} />
        <span class="board-wh-md">x</span>
        <el-input modelValue={boardHeight.value} />
      </div>
    )
  },
})
