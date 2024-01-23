import { useWorkspaceStoreMethods, useWorkspaceStoreData } from '../../hooks';

export default defineComponent({
  name: 'Delete',
  setup() {
    const { curOperateComponent } = useWorkspaceStoreData();
    const { deleteComponentItem, updateCurOperateComponent } = useWorkspaceStoreMethods();

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
