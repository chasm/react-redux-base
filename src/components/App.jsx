import React, { Component } from 'react'

import { head, tail } from 'ramda'

import Header from './Header.jsx'
import Board from './Board.jsx'
import ResetButton from './ResetButton.jsx'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      games: [
        { moves: [] }
      ]
    }
  }

  makeMove (square) {
    let h = head(this.state.games)
    let t = tail(this.state.games)

    this.setState({
      games: [ { moves: [ ...h.moves, square ] }, ...t ]
    })
  }

  newGame () {
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
