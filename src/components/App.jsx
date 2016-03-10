import React, { Component } from 'react'

import { head, tail } from 'ramda'

import Header from './Header.jsx'
import Board from './Board.jsx'
import ResetButton from './ResetButton.jsx'

class App extends Component {

  constructor (props) {
    super(props)

    // Now we can have multiple games, though we can only see the latest one (so far)
    this.state = {
      games: [
        { moves: [] }
      ]
    }
  }

  makeMove (square) {
    let h = head(this.state.games) // grab the first game off the games array
    let t = tail(this.state.games) // grab the rest of the games array

    // Append the square to the *moves* array inside the first game object
    // and return the entire state
    this.setState({
      games: [ { moves: [ ...h.moves, square ] }, ...tail ]
    })
  }

  newGame () {
    // Prepend a new, empty game to the games array
    this.setState({
      games: [ { moves: [] }, ...this.state.games ]
    })
  }

  render () {
    return <div className='app'>
      <Header/>
      <Board
        moves={this.state.games[0].moves}
        clickCb={this.makeMove.bind(this)}
      />
      <ResetButton clickCb={this.newGame.bind(this)}/>
    </div>
  }
}

export default App
