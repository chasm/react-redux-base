import React from 'react'
import ReactDOM from 'react-dom'

// The Provider will wrap our application and insert the store into
// the context. Then in sub-components we can pull the store back out
// of the context.
import { Provider } from 'react-redux'

// Import the store
import store from './store'
import App from './components/App.jsx'

const app = document.createElement('div')

document.body.appendChild(app)

// We create a render method (or call it something else, like main)
// so that we can use it as a callback for the `store.subscribe` method.
// Now when the store changes state, the app will re-render.
const render = () => {
  ReactDOM.render(<Provider store={store}><App/></Provider>, app)
}

// Subscribe to the store so we can track changes
store.subscribe(render)

// Call render for the initial page render
render()
