import React, { Component } from 'react'

import Board from './Board.jsx'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      history: []
    }
  }

  makeMove (square) {
    this.setState({
      history: [ ...this.state.history, square ]
    })
  }

  render () {
    // Add the header
    return <div className='app'>
      <header>
        <h1>
          <span className='tic'>Tic</span>
          <span className='tac'>Tac</span>
          <span className='toe'>Toe</span>
        </h1>
      </header>
      <Board history={this.state.history} clickCb={this.makeMove.bind(this)/>
    </div>
  }
}

export default App
