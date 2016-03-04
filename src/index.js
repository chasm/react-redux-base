import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.jsx'

const app = document.createElement('div')

app.setAttribute('class', 'container')

document.body.appendChild(app)

ReactDOM.render(<App/>, app)
