import React, { Component, PropTypes } from 'react'

class ResetButton extends Component {
  render () {
    const { clickCb, label } = this.props

    return <div className='new-game-btn'>
      <button onClick={clickCb}>{label}</button>
    </div>
  }
}

ResetButton.propTypes = {
  clickCb: PropTypes.func.isRequired,
  label: PropTypes.string
}

ResetButton.defaultProps = {
  label: 'New Game'
}

export default ResetButton
