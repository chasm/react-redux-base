import React, { PropTypes } from 'react'

import { addIndex, contains, map } from 'ramda'

import game from '../utilities/game'

import Square from './Square.jsx'

const mapIndexed = addIndex(map)

const Board = ({ moves }, { store }) => {
  const { board, wins, inPlay } = game(moves)

  const css = inPlay ? 'board' : 'board won'

  const makeMove = (square) => {
    store.dispatch({ type: 'MOVE', square: square })
  }

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

Board.contextTypes = {
  store: PropTypes.object.isRequired
}

export default Board
