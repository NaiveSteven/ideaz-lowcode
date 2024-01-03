import { defineComponent } from 'vue';
import { cloneDeep } from 'lodash-es';
import { useWorkspaceStoreMethods } from '@/hooks';
import { useWorkspaceStore } from '@ideal-schema/playground-store';
import mitt from '@ideal-schema/playground-event';

export default defineComponent({
  name: 'Clear',
  setup() {
    const workspaceStore = useWorkspaceStore();
    const { updateCurOperateComponent, clearWorkspaceComponentList } = useWorkspaceStoreMethods();

    const handleClearAll = () => {
      mitt.emit('attribute-start', {
        type: '删除全部',
        data: cloneDeep(workspaceStore.getWorkspaceComponentList),
      });
      mitt.emit('attribute-end');
      clearWorkspaceComponentList();
      updateCurOperateComponent({} as WorkspaceComponentItem);
    };

    return () => (
      <el-tooltip effect="light" content="清空" placement="top" showAfter={500}>
        <el-button onClick={handleClearAll}>
          <el-icon>
            <i-delete />
          </el-icon>
        </el-button>
      </el-tooltip>
    );
  },
});
