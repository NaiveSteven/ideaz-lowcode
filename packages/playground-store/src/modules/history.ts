import { defineStore } from 'pinia';

export interface Queue {
  redo: () => void;
  undo: () => void;
  time: Date;
  historyType: string;
  before: WorkspaceComponentItem[];
  after: WorkspaceComponentItem[];
  current: number;
}

interface HistoryState {
  queue: Queue[];
  current: number;
}

export const useHistoryStore = defineStore({
  id: 'history',
  state: (): HistoryState => ({
    queue: [],
    current: -1,
  }),
  getters: {
    getQueue(): Queue[] {
      return this.queue;
    },
    getCurrent(): number {
      return this.current;
    },
  },
  actions: {
    pushQueue(item: Queue) {
      this.queue.push(item);
    },
    updateQueue(queue: Queue[]) {
      this.queue = queue;
    },
    updateCurrent(current: number) {
      this.current = current;
    },
  },
});
