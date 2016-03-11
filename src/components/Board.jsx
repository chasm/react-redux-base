import React, { Component, PropTypes } from 'react'

import { addIndex, contains, flatten, isEmpty, map } from 'ramda'

import { getBoard, getWins } from '../utilities/game'

import Square from './Square.jsx'

const mapIndexed = addIndex(map)

class Board extends Component {
  render () {
    const { moves, clickCb } = this.props
    const board = getBoard(moves)
    const wins = flatten(getWins(board))
    const inPlay = isEmpty(wins)

    const css = inPlay ? 'board' : 'board won'

    const squares = mapIndexed((player, square) => {
      if (inPlay) {
        return player
          ? <Square key={square} player={player}/>
          : <Square key={square} clickCb={() => clickCb(square)}/>
      } else {
        return <Square
          key={square}
          player={player}
          win={contains(square, wins)}
        />
      }
    }, board)

    return <div className={css}>{squares}</div>
  }
}

Board.propTypes = {
  clickCb: PropTypes.func.isRequired,
  moves: PropTypes.array.isRequired
}

export default Board
