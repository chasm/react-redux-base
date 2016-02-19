import React, { Component } from 'react' // import React and Component from inside React

import Board from './Board.jsx'  // import our own Board component from this folder

// Create our top-level App component by subclassing React's Component
class App extends Component {

  // React calls render to render our component to the virtual DOM
  // Here we just return a <div class="app"> with whatever our Board renders
  // inside of it
  render () {
    return <div className='app'>
      <Board/>
    </div>
  }
}

export default App // export the App so we can import it into index.js
