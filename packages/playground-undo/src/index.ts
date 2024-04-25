import type { Command } from './undomanager'
import { UndoManager, commands, index } from './undomanager'

const undoManager = new UndoManager(commands, index)

export type { Command }
export {
  commands,
  index,
  undoManager,
}
