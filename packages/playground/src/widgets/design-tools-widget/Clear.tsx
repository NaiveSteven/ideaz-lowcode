import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'

export default defineComponent({
  name: 'Clear',
  setup() {
    const { updateWorkspaceComponentType } = useGlobalSetting()
    const { updateCurOperateComponent, clearWorkspaceComponentList } = useWorkspaceComponent()

    const handleClearAll = () => {
      clearWorkspaceComponentList()
      updateWorkspaceComponentType('form')
      updateCurOperateComponent({} as WorkspaceComponentItem)
    }

    return () => (
      <el-tooltip effect="light" content="清空" placement="top" showAfter={500}>
        <el-button onClick={handleClearAll}>
          <el-icon>
            <i-delete />
          </el-icon>
        </el-button>
      </el-tooltip>
    )
  },
})
