import { defineStore } from 'pinia';

export interface Command {
  redo: () => void;
  undo: () => void;
}

interface UndoState {
  commands: Command[];
  index: number;
}

export const useUndoStore = defineStore({
  id: 'undo',
  state: (): UndoState => ({
    commands: [],
    index: -1,
  }),
  getters: {
    getCommands(): Command[] {
      return this.getCommands;
    },
    getIndex(): number {
      return this.getIndex;
    },
  },
  actions: {
    pushCommands(item: Command) {
      this.commands.push(item);
    },
    updateCommands(queue: Command[]) {
      this.commands = queue;
    },
    updateIndex(current: number) {
      this.index = current;
    },
  },
});
