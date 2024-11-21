import { useWorkspaceStore } from '../modules/workspace'

export function useWorkspaceComponent() {
  const workspaceStore = useWorkspaceStore()

  const widgets = computed(() => workspaceStore.widgets)
  const activeWidget = computed(() => workspaceStore.activeWidget)
  const viewType = computed(() => workspaceStore.viewType)
  const boardHeight = computed(() => workspaceStore.boardHeight)
  const boardWidth = computed(() => workspaceStore.boardWidth)
  const originBoardHeight = computed(() => workspaceStore.originBoardHeight)
  const originBoardWidth = computed(() => workspaceStore.originBoardWidth)
  const simulatorType = computed(() => workspaceStore.simulatorType)

  return {
    widgets,
    activeWidget,
    viewType,
    boardHeight,
    boardWidth,
    originBoardHeight,
    originBoardWidth,
    simulatorType,
    addHistory: workspaceStore.addHistory,
    pushWidget: workspaceStore.pushWidget,
    updateWidget: workspaceStore.updateWidget,
    deleteWidget: workspaceStore.deleteWidget,
    copyWidget: workspaceStore.copyWidget,
    updateComponentList: workspaceStore.updateComponentList,
    clearWorkspaceComponentList: workspaceStore.clearWorkspaceComponentList,
    updateActiveWidget: workspaceStore.updateActiveWidget,
    updateViewType: workspaceStore.updateViewType,
    updateBoardWH: workspaceStore.updateBoardWH,
    updateOriginBoardWH: workspaceStore.updateOriginBoardWH,
    updateSimulatorType: workspaceStore.updateSimulatorType,
  }
}
