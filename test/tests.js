/* global describe it */

import React from 'react'
// import ReactDOM from 'react-dom'
// import TestUtils from 'react-addons-test-utils'

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

import { shallow } from 'enzyme' // mount, render

import App from '../src/components/app.jsx'

describe('<App/>', () => {
  it('renders a div containing "App"', () => {
    const wrapper = shallow(<App/>)

    expect(wrapper.find('div.app')).to.have.className('app')
  })
})
