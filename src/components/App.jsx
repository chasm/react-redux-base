import React, { Component } from 'react'

import { head, tail } from 'ramda'

import Board from './Board.jsx'

// Here's how you might style an element inline
const btnStyle = {
  backgroundColor: '#E61919',
  border: '1px solid white',
  borderRadius: 5,
  color: 'white',
  fontSize: 40,
  margin: 'auto 0'
}

class App extends Component {

  constructor (props) {
    super(props)

    // Now we can have multiple games, though we can only see the latest one (so far)
    this.state = {
      games: [
        { history: [] }
      ]
    }
  }

  makeMove (square) {
    let h = head(this.state.games) // grab the first game off the games array
    let t = tail(this.state.games) // grab the rest of the games array

    // Append the square to the *history* array inside the first game object
    // and return the entire state
    this.setState({
      games: [ { history: [ ...h.history, square ] }, ...tail ]
    })
  }

  newGame () {
    // Prepend a new, empty game to the games array
    this.setState({
      games: [ { history: [] }, ...this.state.games ]
    })
  }

  render () {
    // Add a button to start a new game
    return <div className='app'>
      <header>
        <h1>
          <span className='tic'>Tic</span>
          <span className='tac'>Tac</span>
          <span className='toe'>Toe</span>
        </h1>
      </header>
      <Board history={this.state.games[0].history} clickCb={this.makeMove.bind(this)} />
      <div style={{textAlign: 'center'}}>
        <button style={btnStyle} onClick={this.newGame.bind(this)}>New Game</button>
      </div>
    </div>
  }
}

export default App
