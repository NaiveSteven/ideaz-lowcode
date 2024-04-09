import { UndoManager, commands, index } from './undomanager'

const undoManager = new UndoManager(commands, index)

export {
  commands,
  index,
  undoManager,
}
