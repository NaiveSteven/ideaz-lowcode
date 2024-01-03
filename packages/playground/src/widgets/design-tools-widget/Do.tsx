import { defineComponent, computed } from 'vue';
import { useCommand } from '@/hooks';
import { useHistoryStore, useWorkspaceStore } from '@ideal-schema/playground-store';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'Do',
  props: {
    value: {
      type: String as PropType<'undo' | 'redo'>,
      default: 'undo',
    },
  },
  emits: ['clickDo'],
  setup() {
    const { commands } = useCommand();
    const historyStory = useHistoryStore();
    const workspaceStore = useWorkspaceStore();

    const current = computed(() => historyStory.getCurrent);
    const queue = computed(() => historyStory.getQueue);
    const viewType = computed(() => workspaceStore.getViewType);

    return () => (
      <el-button-group size="small" type="default">
        <el-button
          onClick={() => commands.undo()}
          disabled={queue.value.length === 0 || current.value === -1 || viewType.value !== 'design'}
        >
          <el-tooltip effect="light" content="后退" placement="top" showAfter={500}>
            <el-icon>
              <i-back />
            </el-icon>
          </el-tooltip>
        </el-button>
        <el-button
          onClick={() => commands.redo()}
          disabled={
            queue.value.length === 0 ||
            current.value === queue.value.length - 1 ||
            viewType.value !== 'design'
          }
        >
          <el-tooltip effect="light" content="前进" placement="top" showAfter={500}>
            <el-icon>
              <i-right />
            </el-icon>
          </el-tooltip>
        </el-button>
      </el-button-group>
    );
  },
});
