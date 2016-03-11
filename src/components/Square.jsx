import React, { PropTypes } from 'react'

const Square = ({ clickCb, player, win }) => {
  const css = win ? `${player} win` : player

  return player
    ? <div className={css}>{player}</div>
    : <div onClick={clickCb}/>
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
