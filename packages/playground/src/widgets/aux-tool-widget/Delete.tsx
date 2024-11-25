import { useGlobalSetting, useWorkspaceComponent } from '@ideal-schema/playground-store'

export default defineComponent({
  name: 'Delete',
  setup() {
    const { activeWidget, deleteWidget, updateActiveWidget } = useWorkspaceComponent()
    const { updateWorkspaceComponentType } = useGlobalSetting()

    const handleDelete = () => {
      deleteWidget(activeWidget.value)
      if (activeWidget.value.name === 'crud')
        updateWorkspaceComponentType('form')

      updateActiveWidget({} as Widget)
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
