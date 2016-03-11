import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import store from './store'
import App from './components/App.jsx'

const app = document.createElement('div')

document.body.appendChild(app)

const render = () => {
  ReactDOM.render(<Provider store={store}><App/></Provider>, app)
}

store.subscribe(render)

render()
