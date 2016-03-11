import React, { PropTypes } from 'react'

const Buttons = ({}, { store }) => {
  const newGame = () => store.dispatch({ type: 'NEW_GAME' })
  const undoMove = () => store.dispatch({ type: 'UNDO_MOVE' })

  return <div className='new-game-btn'>
    <button onClick={newGame}>New Game</button><span> </span>
    <button onClick={undoMove}>Undo Move</button>
  </div>
}

Buttons.contextTypes = {
  store: PropTypes.object.isRequired
}

export default Buttons
