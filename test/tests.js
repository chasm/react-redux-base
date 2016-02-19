import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

import { mount, render, shallow } from 'enzyme'

import App from '../src/components/app.jsx'

describe('<App/>', () => {

  it('renders a div containing "App"', () => {
    const wrapper = shallow(<App/>)

    expect(wrapper.find('div')).to.have.className('app')
  })
})
