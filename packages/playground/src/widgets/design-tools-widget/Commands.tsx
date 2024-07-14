import { useWorkspaceComponent } from '@ideal-schema/playground-store'
import { commands, index as currentIndex, undoManager } from '@ideal-schema/playground-undo'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'Commands',
  props: {
    value: {
      type: String as PropType<'undo' | 'redo'>,
      default: 'undo',
    },
  },
  emits: ['clickDo'],
  setup() {
    const { viewType } = useWorkspaceComponent()

    return () => {
      return (
        <el-button-group size="small" type="default">
          <el-button
            onClick={() => { undoManager.undo() }}
            disabled={commands.value.length === 0 || currentIndex.value === 0 || viewType.value !== 'design'}
          >
            <el-tooltip effect="light" content="后退" placement="top" showAfter={500}>
              <el-icon>
                <i-back />
              </el-icon>
            </el-tooltip>
          </el-button>
          <el-button
            onClick={() => { undoManager.redo() }}
            disabled={commands.value.length === 0 || currentIndex.value === commands.value.length - 1 || viewType.value !== 'design'}
          >
            <el-tooltip effect="light" content="前进" placement="top" showAfter={500}>
              <el-icon>
                <i-right />
              </el-icon>
            </el-tooltip>
          </el-button>
        </el-button-group>
      )
    }
  },
})
