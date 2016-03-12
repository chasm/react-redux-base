import React, { PropTypes } from 'react'

import { addIndex, contains, map } from 'ramda'

import game from '../utilities/game'

import Square from './Square.jsx'

const mapIndexed = addIndex(map)

// We'll need the `store` from the context to use in our `makeMove` function.
const Board = ({ moves }, { store }) => {
  const { board, wins, inPlay } = game(moves)

  const css = inPlay ? 'board' : 'board won'

  // We dispatch a MOVE action to the store, passing the square being played.
  const makeMove = (square) => {
    store.dispatch({ type: 'MOVE', square: square })
  }

  // We bind the square in our clickCb.
  // The square remains unaware of its position on the board.
  // That's why we handle the move here instead of in the square.
  // We could also have given the square its number as a prop,
  // and then made the call to `store.dispatch` from there, instead
  // of passing a callback.
  return <div className={css}>{
    mapIndexed((player, square) => {
      if (inPlay) {
        return player
          ? <Square key={square} player={player}/>
          : <Square key={square} clickCb={() => makeMove(square)}/>
      } else {
        return <Square
          key={square}
          player={player}
          win={contains(square, wins)}
        />
      }
    }, board)
  }</div>
}

Board.propTypes = {
  moves: PropTypes.array.isRequired
}

// Don't forget to define the context types if you need to get something
// from the context.
Board.contextTypes = {
  store: PropTypes.object.isRequired
}

export default Board
