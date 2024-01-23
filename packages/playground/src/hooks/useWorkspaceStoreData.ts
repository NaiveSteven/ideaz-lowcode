import { useWorkspaceStore } from '@ideal-schema/playground-store'

export function useWorkspaceStoreData() {
  const workspaceStore = useWorkspaceStore()

  const workspaceComponentList = computed(() => workspaceStore.getWorkspaceComponentList)
  const curOperateComponent = computed(() => workspaceStore.getCurOperateComponent)

  return { workspaceComponentList, curOperateComponent }
}
