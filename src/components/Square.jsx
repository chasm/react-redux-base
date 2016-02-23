import React, { Component, PropTypes } from 'react'

class Square extends Component {

  handleClick () {
    this.props.clickCb()
  }

  render () {
    const { player, win } = this.props // win is a boolean

    const css = win ? `${player} win` : player // on a win, add 'win' class

    return player
      ? <div className={css}>{player}</div> // if played, no need to listen for clicks
      : <div onClick={this.handleClick.bind(this)}/> // if unplayed, listen for clicks
  }
}

// We will talk more about this next class, but we can tell React what the
// *types* of the props are, and whether they are required
Square.propTypes = {
  clickCb: PropTypes.func,    // clickCB is a function
  player: PropTypes.string,   // player is an optional string
  win: PropTypes.bool         // win is an optional boolean
}

Square.defaultProps = {
  win: false // BUT, we set win to default to false
}

export default Square
