import { useWorkspaceComponent, useWorkspaceForm } from '@ideal-schema/playground-store'
import WorkspaceComponent from '../workspace/WorkspaceComponent'

export default defineComponent({
  name: 'ViewPort',
  setup() {
    const { formData, formConfig } = useWorkspaceForm()
    const { pushComponentItem, updateActiveWidget, workspaceComponentList: list, activeWidget } = useWorkspaceComponent()

    const handleAddComponentItem = (item: WorkspaceComponentItem, index: number, toId: string) => {
      pushComponentItem(item, index, toId)
    }

    return () => {
      return (
        <div id="view-port" class="view-port" onClick={() => updateActiveWidget({} as WorkspaceComponentItem)}>
          {activeWidget.value.name === 'crud'
            ? (
              <WorkspaceComponent
                workspaceComponentList={list.value}
                activeWidget={activeWidget.value}
                formData={formData.value}
                onOn-update-cur-operate={(item: WorkspaceComponentItem) => updateActiveWidget(item)}
                onOn-add-item={handleAddComponentItem}
              />
            )
            : (
              <z-form class="h-full" modelValue={formData.value} {...formConfig.value}>
                <WorkspaceComponent
                  workspaceComponentList={list.value}
                  activeWidget={activeWidget.value}
                  formData={formData.value}
                  onOn-update-cur-operate={(item: WorkspaceComponentItem) => updateActiveWidget(item)}
                  onOn-add-item={handleAddComponentItem}
                />
              </z-form>
            )}
        </div>
      )
    }
  },
})
