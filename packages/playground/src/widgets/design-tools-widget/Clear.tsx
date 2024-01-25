import { useGlobalSettingStore } from '@ideal-schema/playground-store'
import { useWorkspaceStoreMethods } from '../../hooks'

export default defineComponent({
  name: 'Clear',
  setup() {
    const globalSettingStore = useGlobalSettingStore()
    const { updateCurOperateComponent, clearWorkspaceComponentList } = useWorkspaceStoreMethods()

    const handleClearAll = () => {
      clearWorkspaceComponentList()
      globalSettingStore.updateWorkspaceComponentType('form')
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
