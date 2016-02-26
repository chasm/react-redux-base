import React, { Component } from 'react'

function log(name, e) {
  console.log(name, JSON.parse(JSON.stringify(e)))
}

class App extends Component {

  handleClick (e) {
    log('click', e)
  }

  handleCopy (e) {
    log('copy', e)
  }

  render () {
    return <div
        onClick={this.handleClick.bind(this)}
        onCopy={this.handleCopy.bind(this)}
      >App!</div>
  }
}

export default App
