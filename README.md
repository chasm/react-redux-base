# react-redux-base

A base on which to build React/Redux apps.

## Building this from scratch

To build this from scratch:

```sh
npm i http-server -g
npm init -y
mkdir public
mkdir src
mkdir test
mkdir src/components
mkdir public/css
mkdir public/js
mkdir public/images
touch public/css/app.css
touch public/js/.keep
touch public/images/.keep
touch public/index.html
touch src/index.js
touch src/components/App.jsx
touch test/mocha.opts
touch test/setup.js
touch test/tests.js
touch .eslintrc
npm i babel-preset-es2015 babel-preset-react babel-preset-stage-0 -S
npm i babelify browserify http-server ramda react react-dom -S
npm i react-addons-pure-render-mixin react-redux react-router redux watchify -S
npm i chai chai-enzyme cheerio enzyme jsdom mocha react-addons-test-utils -D
```

In `.gitignore` (all we need for the moment):

```
.DS_Store
node_modules
public/js/app.js
```

In `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>React-Redux starter</title>

    <link rel="icon" href="/favicon.ico">

    <link rel="stylesheet" href="/css/app.css">
  </head>
  <body>

    <script src="/js/app.js"></script>
  </body>
</html>
```

In `src/index.js`:

```js
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.jsx'

const app = document.createElement('div')

document.body.appendChild(app)

ReactDOM.render(<App/>, app)
```

In `test/mocha.opts`:

```
--require ./test/setup
--full-trace
--compilers js:babel-core/register
```

In `test/setup.js`:

```js
import jsdom from 'jsdom'

// Define some html to be our basic document
// JSDOM will consume this and act as if we were in a browser
const DEFAULT_HTML = '<html><body></body></html>'

// Define some variables to make it look like we're a browser
// First, use JSDOM's fake DOM as the document
global.document = jsdom.jsdom(DEFAULT_HTML)

// Set up a mock window
global.window = document.defaultView

// Allow for things like window.location
global.navigator = window.navigator
```

In `test/tests.js`:

```js
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

    expect(wrapper.find('div')).to.have.text('App!')
  })
})
```

In `package.json` replace the `main` and `scripts` sections with these:

```json
"main": "src/index.js",
"scripts": {
  "build-js": "watchify  src/index.js -o public/js/app.js -v",
  "build": "npm run build-js",
  "start": "http-server public -p 8008",
  "test": "mocha --opts ./test/mocha.opts test/tests.js"
},
```

Then add these sections below `homepage`:

```json
"babel": {
  "presets": [
    "es2015",
    "stage-0",
    "react"
  ]
},
"browserify": {
  "transform": [
    "babelify"
  ]
},
```

I generally add a color to my CSS to test that it's loading easily, so in `public/css/app.css`:

```css
body {
  background-color: firebrick;
  color: white;
}
```

Finally, add this to the `.eslintrc` file:

```
{
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  }
}
```

Now we can run the test:

```sh
npm test
```

And you should see one passing test.

We can also build our app and run watchify to watch it:

```sh
npm run build
```

Then, in a new terminal window or tab, we can run the `http-server`. I've set it to run on port 8008, but you can change that on line 9 of `package.json`.

```sh
npm start
```

Load up [http://localhost:8008](http://localhost:8008/) in your browser and we should be good to go.


