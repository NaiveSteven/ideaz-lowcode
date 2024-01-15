import WorkspaceComponent from '../workspace/WorkspaceComponent'
import { useMiddleFormStoreData, useWorkspaceStoreData, useWorkspaceStoreMethods } from '../../../../playground/src/hooks'

export default defineComponent({
  name: 'ViewPort',
  setup() {
    const { workspaceComponentList: list, curOperateComponent } = useWorkspaceStoreData()
    const { formData, formConfig } = useMiddleFormStoreData()
    const { pushComponentItem, updateCurOperateComponent } = useWorkspaceStoreMethods()

    const handleAddComponentItem = (item: WorkspaceComponentItem, index: number, toId: string) => {
      pushComponentItem(item, index, toId)
    }

    return () => {
      return (
        <div id="view-port" class="view-port" onClick={() => updateCurOperateComponent({} as WorkspaceComponentItem)}>
          asf
          {curOperateComponent.value.name}
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
