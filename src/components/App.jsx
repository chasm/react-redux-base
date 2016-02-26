import React, { Component } from 'react'

import Display from './Display.jsx'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      count: 0
    }

    console.log(`App.constructor sets the this.state.count to ${this.state.count}`)
  }

  componentWillMount () {
    console.log(
      `App.componentWillMount: this.state.count == ${this.state.count}`
    )
  }

  componentDidMount () {
    console.log(
      `App.componentDidMount: this.state.count == ${this.state.count}`
    )
  }

  componentWillUnmount () {
    console.log(
      `App.componentWillUnmount: this.state.count == ${this.state.count}`
    )
  }

  componentWillReceiveProps (nextProps) {
    console.log(
      'App.componentWillReceiveProps: ' +
      `nextProps == ${nextProps}`
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    let decision = Math.floor(Math.random() * 2) % 2 === 1

    console.log(
      'App.shouldComponentUpdate with ' +
      `nextProps keys == '${Object.keys(nextProps || {})}' and ` +
      `nextState.count == ${nextState.count}`
    )
    console.log(`App.shouldComponentUpdate? ${decision ? 'YES' : 'NO'}`)

    return decision
  }

  componentWillUpdate (nextProps, nextState) {
    console.log(
      'App.componentWillUpdate with ' +
      `nextProps keys == '${Object.keys(nextProps || {})}' and ` +
      `nextState.count == ${nextState.count}`
    )
  }

  componentDidUpdate (nextProps, nextState) {
    console.log(
      'App.componentDidUpdate with ' +
      `nextProps keys == '${Object.keys(nextProps || {})}' and ` +
      `nextState.count == ${nextState.count}`
    )
  }

  componentWillUnmount () {
    console.log(`App.componentWillUnmount`)
  }

  increment () {
    console.log(`App.increment: this.state.count == ${this.state.count}`)

    let callback = () => {
      console.log(`callback: new this.state.count == ${this.state.count}`)
    }

    this.setState({
      count: this.state.count + 1
    }, callback)
  }

  render () {
    console.log(`App.render: this.state.count == ${this.state.count}`)

    return <div>
      <div><button onClick={this.increment.bind(this)}>Another!</button></div>
      <Display count={this.state.count}/>
    </div>
  }
}

export default App
