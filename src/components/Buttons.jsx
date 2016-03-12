import React, { PropTypes } from 'react'

// We define two actions, one for NEW_GAME and one for UNDO_MOVE
// Easy peasy, no? One-way flow. And all our components are just functions.
const Buttons = ({}, { store }) => {
  const newGame = () => store.dispatch({ type: 'NEW_GAME' })
  const undoMove = () => store.dispatch({ type: 'UNDO_MOVE' })

  return <div className='new-game-btn'>
    <button onClick={newGame}>New Game</button><span> </span>
    <button onClick={undoMove}>Undo Move</button>
  </div>
}

// Set the context type
Buttons.contextTypes = {
  store: PropTypes.object.isRequired
}

export default Buttons
