/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native'
import React from 'react'
import App from './app.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('NativeModules', () => ({
	UIManager: {
		RCTView: () => ({
			directEventTypes: {}
		})
	},
	KeyboardObserver: {},
	RNGestureHandlerModule: {
		attachGestureHandler: jest.fn(),
		createGestureHandler: jest.fn(),
		dropGestureHandler: jest.fn(),
		updateGestureHandler: jest.fn(),
		State: {},
		Directions: {}
	},
	PlatformConstants: {
		forceTouchAvailable: false
	},
	StatusBarManager: {
		HEIGHT: 42,
		setStyle: jest.fn(),
		setHidden: jest.fn(),
		setNetworkActivityIndicatorVisible: jest.fn()
	},
	AppCenterReactNativeAnalytics: {
		trackEvent: jest.fn()
	}
}))

it('renders correctly', () => {
	renderer.create(<App />)
})
