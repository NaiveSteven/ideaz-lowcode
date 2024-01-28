import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'

export default defineComponent({
  name: 'Delete',
  setup() {
    const { curOperateComponent, deleteComponentItem, updateCurOperateComponent } = useWorkspaceComponent()
    const { updateWorkspaceComponentType } = useGlobalSetting()

    const handleDelete = () => {
      deleteComponentItem(curOperateComponent.value)
      if (curOperateComponent.value.name === 'crud')
        updateWorkspaceComponentType('form')

      updateCurOperateComponent({} as WorkspaceComponentItem)
    }

    return () => (
      <el-button type="primary" size="small" class="aux-button" onClick={handleDelete}>
        <el-icon>
          <i-delete />
        </el-icon>
      </el-button>
    )
  },
})
