import { useWorkspaceForm } from '@ideal-schema/playground-store'
import { useWorkspaceStoreData, useWorkspaceStoreMethods } from '../../../../playground/src/hooks'
import WorkspaceComponent from '../workspace/WorkspaceComponent'

export default defineComponent({
  name: 'ViewPort',
  setup() {
    const { workspaceComponentList: list, curOperateComponent } = useWorkspaceStoreData()
    const { formData, formConfig } = useWorkspaceForm()
    const { pushComponentItem, updateCurOperateComponent } = useWorkspaceStoreMethods()

    const handleAddComponentItem = (item: WorkspaceComponentItem, index: number, toId: string) => {
      pushComponentItem(item, index, toId)
    }

    return () => {
      return (
        <div id="view-port" class="view-port" onClick={() => updateCurOperateComponent({} as WorkspaceComponentItem)}>
          {curOperateComponent.value.name === 'crud'
            ? (
              <WorkspaceComponent
                workspaceComponentList={list.value}
                curOperateComponent={curOperateComponent.value}
                formData={formData.value}
                onOn-update-cur-operate={(item: WorkspaceComponentItem) => updateCurOperateComponent(item)}
                onOn-add-item={handleAddComponentItem}
              />
              )
            : (
              <z-form class="h-full" modelValue={formData.value} {...formConfig.value}>
                <WorkspaceComponent
                  workspaceComponentList={list.value}
                  curOperateComponent={curOperateComponent.value}
                  formData={formData.value}
                  onOn-update-cur-operate={(item: WorkspaceComponentItem) => updateCurOperateComponent(item)}
                  onOn-add-item={handleAddComponentItem}
                />
              </z-form>
              )}

        </div>
      )
    }
  },
})
