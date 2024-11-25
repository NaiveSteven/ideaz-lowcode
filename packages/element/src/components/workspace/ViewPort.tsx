import { useWorkspaceComponent, useWorkspaceForm } from '@ideal-schema/playground-store'
import WorkspaceComponent from '../workspace/WorkspaceComponent'

export default defineComponent({
  name: 'ViewPort',
  setup() {
    const { formData, formConfig } = useWorkspaceForm()
    const { pushWidget, updateActiveWidget, widgets: list, activeWidget } = useWorkspaceComponent()

    const handleAddComponentItem = (item: Widget, index: number, toId: string) => {
      pushWidget(item, index, toId)
    }

    return () => {
      return (
        <div id="view-port" class="view-port" onClick={() => updateActiveWidget({} as Widget)}>
          {activeWidget.value.name === 'crud'
            ? (
              <WorkspaceComponent
                widgets={list.value}
                activeWidget={activeWidget.value}
                formData={formData.value}
                onOn-update-cur-operate={(item: Widget) => updateActiveWidget(item)}
                onOn-add-item={handleAddComponentItem}
              />
            )
            : (
              <z-form class="h-full" modelValue={formData.value} {...formConfig.value}>
                <WorkspaceComponent
                  widgets={list.value}
                  activeWidget={activeWidget.value}
                  formData={formData.value}
                  onOn-update-cur-operate={(item: Widget) => updateActiveWidget(item)}
                  onOn-add-item={handleAddComponentItem}
                />
              </z-form>
            )}
        </div>
      )
    }
  },
})
