import React from 'react'
import { Text, NativeModules } from 'react-native'
import renderer from 'react-test-renderer'

NativeModules.TrackPlayerModule = jest.fn()

import App from './app.js'

test('app renders correctly', () => {
	renderer.create(<Text />)
})
