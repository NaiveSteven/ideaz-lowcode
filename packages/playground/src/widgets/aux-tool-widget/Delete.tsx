import { useWorkspaceComponent } from '@ideal-schema/playground-store';

export default defineComponent({
  name: 'Delete',
  setup() {
    const { curOperateComponent, deleteComponentItem, updateCurOperateComponent } = useWorkspaceComponent();

    const handleDelete = () => {
      deleteComponentItem(curOperateComponent.value);
      updateCurOperateComponent({} as WorkspaceComponentItem);
    };

    return () => (
      <el-button type="primary" size="small" class="aux-button" onClick={handleDelete}>
        <el-icon>
          <i-delete />
        </el-icon>
      </el-button>
    );
  },
});
