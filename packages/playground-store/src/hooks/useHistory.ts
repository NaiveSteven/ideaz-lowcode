import { useHistoryStore } from '../modules/history'

export const useGlobalSetting = ()=> {
  const historyStore = useHistoryStore()

  const queue = computed(() => historyStore.queue)
  const current = computed(() => historyStore.current)

  return {
    queue,
    current,
    pushQueue: historyStore.pushQueue,
    updateCurrent: historyStore.updateCurrent,
    updateQueue: historyStore.updateQueue
  }
}
