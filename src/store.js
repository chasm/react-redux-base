// The redux createStore method converts our reducer to a store
// with a `dispatch` method
import { createStore } from 'redux'

// Drop last takes a number of items to drop and drops them from
// then end of a list, returning a new list of all items except those
import { dropLast, head, tail } from 'ramda'

// This reducer is subordinate to the game reducer below.
// It handles move-related actions.
// For a MOVE, it takes a square (number) and appends it to the moves array.
// For UNDO_MOVE, it drops the last move from the moves array.
// It always returns a state -- defualt is to return it unchanged.
const move = (state = [], action) => {
  switch (action.type) {
    case 'MOVE':
      return [
        ...state, // spread operator turns [1, 2, 3] into 1, 2, 3
        action.square // adds the new square
      ]
    case 'UNDO_MOVE':
      return dropLast(1, state) // drop the last move in the list
    default:
      return state // always return the state!
  }
}

// The game reducer handles adding new games. For moves, it delegates to
// the move reducer above. NEW_GAME simply prepends an empty array to the state.
const game = (state = [[]], action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return [
        [], // Prepend an empty array
        ...state // Spread the previous game arrays: [ [], [] ] to [], []
      ]
    case 'MOVE':
    case 'UNDO_MOVE': // MOVE and UNDO_MOVE delegate to the `move` reducer
      return [
        move(head(state), action), // pass the first array as the state
        ...tail(state) // spread the old games out
      ]
    default:
      return state
  }
}

// Call createStore to convert the reducers above to a store with store methods.
// The devToolsExtension is optional and works with the Chrome extension.
const store = createStore(
  game,
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

export default store
