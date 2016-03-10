import React, { Component, PropTypes } from 'react'

class Square extends Component {
  render () {
    const { clickCb, player, win } = this.props
    const css = win ? `${player} win` : player

    return player
      ? <div className={css}>{player}</div>
      : <div onClick={clickCb}/>
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
