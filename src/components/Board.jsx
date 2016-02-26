import React, { Component, PropTypes } from 'react'

import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import {
  addIndex,
  contains,
  filter,
  flatten,
  indexOf,
  isEmpty,
  map,
  reduce,
  repeat,
  update
} from 'ramda'

import Square from './Square.jsx'

const mapIndexed = addIndex(map)

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

class Board extends Component {

  // We need a clickCb now because we're passing the move up
  static propTypes = {
    clickCb: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  // Instead of maintaining state here, we just pass the move on up
  // to the App and let it be handled there.
  makeMove (square) {
    this.props.clickCb(square)
  }

  getPlayer (square, history) {
    return (indexOf(square, history) % 2 === 0) ? 'x' : 'o'
  }

  getBoard (history) {
    const initialBoard = repeat('', 9)

    return reduce((board, square) => {
      const player = this.getPlayer(square, history)

      return update(square, player, board)
    }, initialBoard, history)
  }

  getWins (board) {
    return filter((pattern) => {
      let s1 = board[pattern[0]]
      let s2 = board[pattern[1]]
      let s3 = board[pattern[2]]

      return s1 && s1 === s2 && s2 === s3
    }, WIN_PATTERNS)
  }

  render () {
    const board  = this.getBoard(this.props.history) // now it's props instead of state
    const wins   = flatten(this.getWins(board))
    const inPlay = isEmpty(wins)
    const css    = inPlay ? 'board' : 'board won'

    return <div className={css}>{this.renderBoard(board, wins)}</div>
  }

  renderBoard (board, wins) {
    return mapIndexed((player, square) => {

      if (isEmpty(wins)) {
        return player
          ? <Square key={square} player={player}/>
          : <Square key={square} clickCb={this.makeMove.bind(this, square)}/>
      } else {
        return <Square
          key={square}
          player={player}
          win={contains(square, wins)}
        />
      }
    }, board)
  }
}

export default Board
