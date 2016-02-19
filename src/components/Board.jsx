import React, { Component } from 'react'

import {
  addIndex,
  contains,  // returns true if the array contains the passed value
  filter,    // returns only those cells for which passed in function returns true
  flatten,   // flattens an array of arrays into a single array
  indexOf,
  isEmpty,   // true if array is empty, false if it isn't
  map,
  reduce,
  repeat,
  update
} from 'ramda'

import Square from './Square.jsx'

const mapIndexed = addIndex(map)

// These are the winning patters. If the squares in any pattern contain the same
// player, then that pattern is a win. It is not possible for both players to
// win, but it is possible for one player to win more than one pattern,
// e.g., [0, 4, 8] *and* [2, 4, 6] (the diagonals).
// That said, WHO can win with two patterns? Both X and O? Just X? Just O?
// Do you know?
const winPatterns = [
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

  constructor (props) {
    super(props)

    this.state = {
      history: []
    }
  }

  makeMove (square) {
    // Here we use an alternative to Ramda's `append` function by
    // using the new ES6 spread (...) operator
    this.setState({
      history: [ ...this.state.history, square ]
    })
  }

  // Cleaner to break out the choosing of player into its own method
  getPlayer (square, history) {
    return (indexOf(square, history) % 2 === 0) ? 'x' : 'o' // x moves first
  }

  // Now this is nice and clean
  // We'll call the accumulator "board" as that's what we're building
  getBoard (history) {
    const blank = repeat('', 9) // array of nine empty strings: blank board

    return reduce((board, square) => {
      const player = this.getPlayer(square, history) // 'x' or 'o'

      return update(square, player, board)
    }, blank, history)
  }

  // Check a given board for winning patterns and return an array of wins
  getWins (board) {
    // Loop through the winPatterns array and check the corresponding squares
    // on the board for each pattern in turn.
    // Return an array of winPatterns for which the three squares in the pattern
    // have the same mark, x or o
    return filter((pattern) => {
      let s1 = board[pattern[0]] // get the player in the 1st square of the pattern
      let s2 = board[pattern[1]] // get the player in the 2nd square of the pattern
      let s3 = board[pattern[2]] // get the player in the 3rd square of the pattern

      return s1 && s1 === s2 && s2 === s3 // squares are non-empty and equal
    }, winPatterns)
  }

  render () {
    // Get the board (e.g., ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'])
    const board  = this.getBoard(this.state.history)
    const wins   = flatten(this.getWins(board))   // e.g, [0, 2, 4, 6, 8]
    const inPlay = isEmpty(wins)                  // is the game still in play
    const css    = inPlay ? 'board' : 'board won' // add a 'won' class for a win

    // Let's break out part of the rendering to a separate method, below
    return <div className={css}>{this.renderBoard(board, wins)}</div>
  }

  // We'll render the board here and pass it back to `render`
  renderBoard (board, wins) {
    return mapIndexed((player, square) => {

      if (isEmpty(wins)) {
        // If the game is still in play then return the square with player
        // or, if unplayed, bind the click callback instead
        return player
          ? <Square key={square} player={player}/>
          : <Square key={square} clickCb={this.makeMove.bind(this, square)}/>
      } else {
        // If the game is won, mark those squares that are part of a winning
        // pattern by setting our `win` prop to true (see the Square for details)
        return <Square
          key={square}
          player={player}
          win={contains(square, wins)}
        />
      }
    }, board) // Loop through the board converting 'x', 'o', and '' to Squares
  }
}

export default Board
