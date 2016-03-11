import React, { PropTypes } from 'react'

import { head } from 'ramda'

import Header from './Header.jsx'
import Board from './Board.jsx'
import Buttons from './Buttons.jsx'

const App = ({}, { store }) => {
  return <div className='app'>
    <Header/>
    <Board moves={head(store.getState())}/>
    <Buttons/>
  </div>
}

App.contextTypes = {
  store: PropTypes.object.isRequired
}

export default App
