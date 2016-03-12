/* global describe it */

import React from 'react'

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

chai.use(chaiEnzyme())

import { mount, render, shallow } from 'enzyme'

import App from '../src/components/App.jsx'
import Board from '../src/components/Board.jsx'
import Square from '../src/components/Square.jsx'

import { getBoard, getWins } from '../src/utilities/game'

// This is the expected `wrapper.html()` output for an empty board
const emptyBoard = '<div class="board"><div></div><div></div><div></div><div>' +
  '</div><div></div><div></div><div></div><div></div><div></div></div>'

// This is the expected `wrapper.html()` output for a winning board with the
// following pattern:
//
//    x  o  x
//    o  x  o
//    x  o  x
//
// Note that x wins in two directions -- both diagonals.
// We want to test for all our possible cases -- no wins, one win, double win.
const winningBoard = '<div class="board won"><div class="x win">x</div>' +
  '<div class="o">o</div><div class="x win">x</div><div class="o">o</div>' +
  '<div class="x win">x</div><div class="o">o</div><div class="x win">x</div>' +
  '<div class="o">o</div><div class="x win">x</div></div>'

// For the purposes of these tests, specifically those using `mount`, we've
// used Components rather than functions for the App, Board, and Square.
// Although the enzyme folks say that `mount` should work with functions,
// that does not appear to be the case.

// We can use `shallow` here as there would be no point using `mount` --
// there are no subcomponents to Square.
// What these three tests do should be obvious.
describe('<Square/>', () => {
  it('with a player renders properly', () => {
    const wrapper = shallow(<Square player='x'/>)

    expect(wrapper.html()).to.equal('<div class="x">x</div>')
  })

  it('without a player responds to a move', () => {
    const clickCb = sinon.spy()
    const wrapper = shallow(<Square clickCb={clickCb}/>)

    wrapper.simulate('click')

    expect(clickCb.callCount).to.equal(1)
  })

  it('with a win renders properly', () => {
    const wrapper = shallow(<Square player='x' win/>)

    expect(wrapper.html()).to.equal('<div class="x win">x</div>')
  })
})

// We probably should write more tests for the board, but here's a start.
describe('<Board/>', () => {
  it('has a .board div with nine Squares', () => {
    // We're not clicking on anything, so we just need to pass *some* function
    // to the clickCb. This test uses an empty board.
    const wrapper = shallow(<Board moves={[]} clickCb={() => true}/>)

    // We can call `find(Square)` because we're using `shallow` (won't work with `render`)
    expect(wrapper.html()).to.equal(emptyBoard) // checks that our HTML output is correct
    expect(wrapper.find(Square).length).to.equal(9) // checks that there are 9 Squares
  })
})

// Again, we'd probably want to write a few more tests, but this gives you the flavor.
// Here we `mount` the full application, then click on each Square in turn, then
// check that our output is the winning Board above. This is a sort of integration
// test, testing the full stack of components making up the tic-tac-toe board.
describe('<App/>', () => {
  it('plays the game properly', () => {
    const wrapper = mount(<App/>)

    wrapper.find(Square).at(0).simulate('click')
    wrapper.find(Square).at(1).simulate('click')
    wrapper.find(Square).at(2).simulate('click')
    wrapper.find(Square).at(5).simulate('click')
    wrapper.find(Square).at(8).simulate('click')
    wrapper.find(Square).at(7).simulate('click')
    wrapper.find(Square).at(6).simulate('click')
    wrapper.find(Square).at(3).simulate('click')
    wrapper.find(Square).at(4).simulate('click')

    expect(wrapper.find('.board').html()).to.equal(winningBoard)
  })
})

// These are essentially unit tests for our `game` utility functions
// If you check the functions in `src/utilities/games.js`, it should be
// pretty clear how these work.
describe('Game utilities getBoard', () => {
  it('creates the correct board given a set of moves', () => {
    const empty = getBoard([])
    const winner = getBoard([0, 1, 2, 5, 8, 7, 6, 3, 4])

    expect(empty).to.eql([ '', '', '', '', '', '', '', '', '' ])
    expect(winner).to.eql([ 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x' ])
  })
})

describe('Game utilities getWins', () => {
  it('returns all winning patterns', () => {
    const empty = getWins([ '', '', '', '', '', '', '', '', '' ])
    const single = getWins([ 'x', 'o', 'x', 'o', 'x', '', 'x', '', 'o' ])
    const double = getWins([ 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x' ])

    expect(empty).to.eql([])
    expect(single).to.eql([ [ 2, 4, 6 ] ])
    expect(double).to.eql([ [ 0, 4, 8 ], [ 2, 4, 6 ] ])
  })
})
