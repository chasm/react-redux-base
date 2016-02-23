import React, { Component } from 'react' // get React and the Component superclass

// Get a whole bunch of wonderful Ramda functions that we can use to
// make our code *very* clean, functional, and immutable
import {
  addIndex,
  append,
  indexOf,
  map,
  reduce,
  repeat,
  update
} from 'ramda'

import Square from './Square.jsx' // import our Square component

// Wrap Ramda's `map` so that it passes the index as well
// We'll want that index, so we'll use this "higher-order" function a lot
const mapIndexed = addIndex(map)

// Create our Board by extending React's Component
class Board extends Component {

  // The constructor is called ONCE when the Component is first created
  constructor (props) {
    super(props) // pass the props up to the Component superclass's constructor

    // This is where we add *state* to our component
    // We can add any key-value pairs we want, as deep as we want
    this.state = {
      history: []
    }
  }

  // This is our move callback. We pass it down to the Squares and then they
  // call it when they are clicked. In the render function below we *bind*
  // the index of the Square to this callback, so we know that it will always
  // be set
  makeMove (square) {
    // We update state by calling the state setter method and passing it a new
    // state object. React *merges* this object with the old state and replaces
    // the state with the newly merged object.
    // Here we just append the index of the square that was just clicked to
    // our history of moves. For example, if squares 4 and 3 had been clicked
    // (current history [4, 3]), and then we clicked square 0, then our new
    // history would be [4, 3, 0].
    this.setState({
      history: append(square, this.state.history)
    })
  }

  // We need to convert our history (e.g., [4, 3, 0]) to an actual nine-square
  // board (e.g., ['x', '', '', 'o', 'x', '', '', '', '']). We call this method
  // from the `render` method below and pass in our current history from the state
  getBoard (history) {
    // Ramda's reduce method takes a function, a starting value, and the array,
    // Then it loops through the array, updating the starting value (called the
    // accumulator) on each iteration. Finally, it returns the accumulator.

    // Here our function takes the accumlator and the next value from the history
    // array. Then it gets the index of that value in the history array and
    // determines the player (even is x, odd is o). Then it returns a new array
    // with the cell at index "val" replaced with that player

    // In other words, if my history is [4, 3], then my first loop through the
    // reduce function gets the acc == ['', '', '', '', '', '', '', '', '']
    // and the value 4. It figures out that the 4 is at index 0 in the history
    // array, so that's an even move so the player is 'x'.
    // Then it updates the acc by putting an 'x' at index 4 and returns the acc:
    // ['', '', '', '', 'x', '', '', '', '']

    // The next iteration gets that as the starting array and the next value
    // from history, which is 3 at position 1. 1 is odd, so the player is 'o'.
    // The function then inserts that 'o' at position 3 in the array, and returns:
    // ['', '', '', 'o', 'x', '', '', '', '']

    // And so on
    return reduce((acc, val) => {
      let player = (indexOf(val, history) % 2 === 0) ? 'x' : 'o'

      return update(val, player, acc) // update returns a copy of *acc* with *player* at index *val*
    }, repeat('', 9), history) // note: repeat('', 0) returns an array of 9 empty strings
  }

  // The render method renders our output. When the state changes, React calls it again.
  render () {
    // We use our indexed map function to loop through the board array we returned
    // from the call to `getBoard(history)`. Map replaces each player string in the board
    // with a Square, and returns the array of Squares
    const squares = mapIndexed((player, square) => {
      return <Square
        key={square} // the unique key helps React to tell the squares apart
        player={player} // the player (x or o) is used by the Square for content and class
        clickCb={this.makeMove.bind(this, square)} // we pass in a callback to be called on click
      />
    }, this.getBoard(this.state.history))

    // Now we dump our Squares into the board div and return it
    return <div className='board'>{squares}</div>
  }
}

// Export the Board so we can import it into App
export default Board
