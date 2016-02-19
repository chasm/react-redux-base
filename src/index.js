import React from 'react'         // import React
import ReactDOM from 'react-dom'  // import the ReactDOM (needed here only)

import App from './components/App.jsx' // import our own App component

const app = document.createElement('div') // create a <div> element

document.body.appendChild(app) // append that <div> element to the <body>

ReactDOM.render(<App/>, app) // render our App into the <div> element
