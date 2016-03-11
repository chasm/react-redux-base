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

const emptyBoard = '<div class="board"><div></div><div></div><div></div><div>' +
  '</div><div></div><div></div><div></div><div></div><div></div></div>'

const winningBoard = '<div class="board won"><div class="x win">x</div>' +
  '<div class="o">o</div><div class="x win">x</div><div class="o">o</div>' +
  '<div class="x win">x</div><div class="o">o</div><div class="x win">x</div>' +
  '<div class="o">o</div><div class="x win">x</div></div>'

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

describe('<Board/>', () => {
  it('has a .board div with nine Squares', () => {
    const wrapper = shallow(<Board moves={[]} clickCb={() => true}/>)

    expect(wrapper.html()).to.equal(emptyBoard)
    expect(wrapper.find(Square).length).to.equal(9)
  })
})

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
