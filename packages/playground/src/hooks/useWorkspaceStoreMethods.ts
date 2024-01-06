import { useWorkspaceStore } from '@ideal-schema/playground-store'

export function useWorkspaceStoreMethods() {
  const workspaceStore = useWorkspaceStore()

  const pushComponentItem = workspaceStore.pushComponentItem
  const updateComponentItem = workspaceStore.updateComponentItem
  const deleteComponentItem = workspaceStore.deleteComponentItem
  const copyComponentItem = workspaceStore.copyComponentItem
  const updateCurOperateComponent = workspaceStore.updateCurOperateComponent
  const clearWorkspaceComponentList = workspaceStore.clearWorkspaceComponentList
  const updateComponentList = workspaceStore.updateComponentList

  return {
    pushComponentItem,
    updateComponentItem,
    deleteComponentItem,
    copyComponentItem,
    updateCurOperateComponent,
    clearWorkspaceComponentList,
    updateComponentList,
  }
}
