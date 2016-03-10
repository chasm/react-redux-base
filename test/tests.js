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
