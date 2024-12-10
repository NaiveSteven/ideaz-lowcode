import { useGlobalSetting, useWorkspaceComponent, useWorkspaceForm } from '@ideal-schema/playground-store'
import WorkspaceComponent from '../workspace/WorkspaceComponent'

export default defineComponent({
  name: 'ViewPort',
  setup() {
    const { formData, formConfig } = useWorkspaceForm()
    const { pushWidget, updateActiveWidget, widgets: list, activeWidget } = useWorkspaceComponent()
    const { workspaceWidgetType } = useGlobalSetting()

    const handleAddComponentItem = (item: Widget, index: number, toId: string) => {
      pushWidget(item, index, toId)
    }

    const handleClickViewPort = () => {
      if (workspaceWidgetType.value !== 'crud') {
        updateActiveWidget({} as Widget)
      }
      else {
        const data = list.value[0]
        updateActiveWidget(data)
      }
    }

    return () => {
      return (
        <div id="view-port" class="view-port" onClick={handleClickViewPort}>
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
