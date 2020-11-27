import React from 'react'
import renderer from 'react-test-renderer'

import App from './app.js'

test('app renders correctly', () => {
	renderer.create(<App />)
})
