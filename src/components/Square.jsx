import React, { Component } from 'react' // Grab Component from *inside* React

// We could do the above like this as well:
// import React from 'react'
// const { Component } = React
// or
// const Component = React.Component

// Create a Square component by subclassing React's Component class
class Square extends Component {

  // Handle clicks by just calling the click callback passed in to this.props
  handleClick () {
    this.props.clickCb()
  }

  // The render method is called by React to render the square
  // We return JSX which gets converted to JS and then to DOM elements
  render () {
    let { player } = this.props // get the player property out of this.props

    return <div
      className={player}  // use the player (x or o) as the CSS class
      onClick={this.handleClick.bind(this)} // call this.handleClick on click
    >{player}</div> // put an x or an o in the square, as necessary
  }
}

// Export the Square so we can import it into Board
export default Square
