import { createStore } from 'redux'

import { dropLast, head, tail } from 'ramda'

const move = (state = [], action) => {
  switch (action.type) {
    case 'MOVE':
      return [
        ...state,
        action.square
      ]
    case 'UNDO_MOVE':
      return dropLast(1, state)
    default:
      return state
  }
}

const game = (state = [[]], action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return [
        [],
        ...state
      ]
    case 'MOVE':
    case 'UNDO_MOVE':
      return [
        move(head(state), action),
        ...tail(state)
      ]
    default:
      return state
  }
}

const store = createStore(
  game,
  window.defToolsExtension ? window.devToolsExtension() : f => f
)

export default store
