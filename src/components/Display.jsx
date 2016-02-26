import React, { Component } from 'react'

class Display extends Component {

  constructor (props) {
    super(props)

    console.log(
      `  Display.constructor receives props.count == ${props.count}`
    )
  }

  componentWillMount () {
    console.log(
      `  Display.componentWillMount: this.props.count == ${this.props.count}`
    )
  }

  componentDidMount () {
    console.log(
      `  Display.componentDidMount: this.props.count == ${this.props.count}`
    )
  }

  componentWillUnmount () {
    console.log(
      `  Display.componentWillUnmount: this.props.count == ${this.props.count}`
    )
  }

  componentWillReceiveProps (nextProps) {
    console.log(
      '  Display.componentWillReceiveProps: ' +
      `nextProps.count == ${nextProps.count} ` +
      `and this.props.count == ${this.props.count}`
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    let decision = Math.floor(Math.random() * 2) % 2 === 1

    console.log(
      '  Display.shouldComponentUpdate with ' +
      `nextProps.count == '${nextProps.count}' and ` +
      `nextState.count == ${Object.keys(nextState || {})}`
    )
    console.log(`  Display.shouldComponentUpdate? ${decision ? 'YES' : 'NO'}`)

    return decision
  }

  componentWillUpdate (nextProps, nextState) {
    console.log(
      '  Display.componentWillUpdate with ' +
      `nextProps.count == '${nextProps.count}' and ` +
      `nextState.count == ${Object.keys(nextState || {})}`
    )
  }

  componentDidUpdate (nextProps, nextState) {
    console.log(
      '  Display.componentDidUpdate with ' +
      `nextProps.count == '${nextProps.count}' and ` +
      `nextState.count == ${Object.keys(nextState || {})}`
    )
  }

  componentWillUnmount () {
    console.log(` Display.componentWillUnmount`)
  }

  render () {
    console.log(`  Display.render: this.props.count == ${this.props.count}`)

    return <div>{this.props.count}</div>
  }
}

export default Display
