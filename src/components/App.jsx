import React, { PropTypes } from 'react'

import { head } from 'ramda'

import Header from './Header.jsx'
import Board from './Board.jsx'
import Buttons from './Buttons.jsx'

// With a pure function, the context is passed as the *second* argument.
// The `moves` paramenter uses `store.getState()` to get the array of game
// arrays, then uses ramda's `head` method to grab the current (first) array.
const App = ({}, { store }) => {
  return <div className='app'>
    <Header/>
    <Board moves={head(store.getState())}/>
    <Buttons/>
  </div>
}

// We must define our context types if we want to use them in this component.
App.contextTypes = {
  store: PropTypes.object.isRequired
}

export default App
