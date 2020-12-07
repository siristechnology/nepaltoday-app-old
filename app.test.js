import React from 'react'
import renderer from 'react-test-renderer'

import { ApolloApp as App } from './index.js'

test('app renders correctly', () => {
	renderer.create(<App />)
})
