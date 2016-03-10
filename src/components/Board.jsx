import React, { Component, PropTypes } from 'react'

import { addIndex, contains, flatten, isEmpty, map } from 'ramda'

// Let's move our game utility functions out to another file to keep
// the board file clean and focused on react
import { getBoard, getWins } from '../utilities/game'

import Square from './Square.jsx'

// Ramda's map does not include the index, so we'll use addIndex to make our own
const mapIndexed = addIndex(map)

class Board extends Component {
  render () {
    const { moves, clickCb } = this.props
    const board  = getBoard(moves)          // Convert the moves to a board array
    const wins   = flatten(getWins(board))  // Get a list of winning cells
    const inPlay = isEmpty(wins)            // No winning cells? Still in play then

    const css = inPlay ? 'board' : 'board won' // Mark a winning board (grays out squares)

    // Get an array of Squares by looping through the board array
    // and mapping it to Square components
    const squares = mapIndexed((player, square) => {
      if (inPlay) {
        // If played, pass the player.
        // Else, set the callback and *bind the square number*.
        // The callback is a closure!
        return player
          ? <Square key={square} player={player}/>
          : <Square key={square} clickCb={() => clickCb(square)}/>
      } else {
        // Else, mark winning and non-winning squares (for colors)
        return <Square
          key={square}
          player={player}
          win={contains(square, wins)}
        />
      }
    }, board)

    // Wrap our array of Square components in a <div> and return it.
    // Note: we can only return ONE root element, so we must wrap the array.
    return <div className={css}>{squares}</div>
  }
}

// Can still set prop types
Board.propTypes = {
  clickCb: PropTypes.func.isRequired
}

export default Board
