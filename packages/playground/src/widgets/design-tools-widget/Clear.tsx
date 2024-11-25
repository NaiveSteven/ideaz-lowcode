import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'
import { copy } from '@ideal-schema/shared'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Clear',
  setup() {
    const { updateWorkspaceComponentType } = useGlobalSetting()
    const { updateActiveWidget, clearWorkspaceComponentList } = useWorkspaceComponent()

    const handleClearAll = () => {
      copy('')
      clearWorkspaceComponentList()
      updateWorkspaceComponentType('form')
      updateActiveWidget({} as Widget)
    }

    return () => (
      <el-tooltip effect="light" content="清空" placement="top" showAfter={500}>
        <el-button onClick={handleClearAll}>
          <el-icon size="20"><i class={['icon-shanchu', 'iconfont']}></i></el-icon>
        </el-button>
      </el-tooltip>
    )
  },
})
