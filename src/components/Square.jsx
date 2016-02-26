import React, { Component, PropTypes } from 'react'

import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

class Square extends Component {

  constructor (props) {
    super(props)

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  handleClick () {
    this.props.clickCb()
  }

  render () {
    const { player, win } = this.props

    console.log('rendering square')

    const css = win ? `${player} win` : player

    return player
      ? <div className={css}>{player}</div>
      : <div onClick={this.handleClick.bind(this)}/>
  }
}

Square.propTypes = {
  clickCb: PropTypes.func,
  player: PropTypes.string,
  win: PropTypes.bool
}

Square.defaultProps = {
  win: false
}

export default Square
