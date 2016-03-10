import React, { Component } from 'react'

import { concat, head, split } from 'ramda'
import { v4 } from 'uuid'

import Header from './Header.jsx'
import Board from './Board.jsx'
import ResetButton from './ResetButton.jsx'

import Rebase from 're-base'

const base = Rebase.createClass('https://sizzling-torch-4082.firebaseio.com/games')

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      id: split('=', window.location.search)[1],
      moves: []
    }
  }

  componentWillMount () {
    base.bindToState(this.state.id, {
      context: this,
      state: 'moves',
      asArray: true
    })
  }

  checkTurn () {
    return (this.state.moves.length % 2) !== (this.state.player % 2)
  }

  makeMove (square) {
    const player = (this.state.player === undefined)
      ? this.state.moves.length + 1
      : this.state.player

    if (this.checkTurn()) {
      this.setState({
        moves: [ ...this.state.moves, square ],
        player: player
      }, () => {
        base.post(this.state.id, {
          data: this.state.moves,
          then: () => {
            console.log(this.state)
          }
        })
      })
    }
  }

  newGame () {
    const id = v4()
    window.location.href = concat(
      head(split('?', window.location.href)),
      `?game=${id}`
    )
  }

  render () {
    return <div className='app'>
      <Header/>
      <Board
        moves={this.state.moves}
        clickCb={this.makeMove.bind(this)}
      />
      <ResetButton clickCb={this.newGame.bind(this)}/>
    </div>
  }
}

export default App
