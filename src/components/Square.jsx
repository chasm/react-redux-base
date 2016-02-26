import React, { Component, PropTypes } from 'react'

import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

class Square extends Component {

  // We've added the prop types. Don't forget the closing semicolon
  static propTypes = {
    clickCb: PropTypes.func,
    player: PropTypes.string,
    win: PropTypes.bool
  };

  // We're also setting the win prop to a default of false
  static defaultProps = {
    win: false
  };

  constructor (props) {
    super(props)

    // This will speed up rendering by only rerendering when necessary
    // Don't use it if you have complex values in your props or state
    // or if any subcomponents do (they might not re-render properly)
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  handleClick () {
    this.props.clickCb()
  }

  render () {
    const { player, win } = this.props

    const css = win ? `${player} win` : player

    return player
      ? <div className={css}>{player}</div>
      : <div onClick={this.handleClick.bind(this)}/>
  }
}

export default Square
