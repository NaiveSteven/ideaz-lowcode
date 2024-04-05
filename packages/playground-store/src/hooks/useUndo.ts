import { useUndoStore } from '../modules/undo'

export const useUndo = ()=> {
  const undoStore = useUndoStore()

  const commands = computed(() => undoStore.getCommands)
  const index = computed(() => undoStore.getIndex)

  return {
    commands,
    index,
    pushCommands: undoStore.pushCommands,
    updateIndex: undoStore.updateIndex,
    updateCommands: undoStore.updateCommands
  }
}
