import { NativeModules } from 'react-native'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import HeadlineScreen from './headline.screen'

jest.mock('NativeModules', () => ({
	UIManager: {
		RCTView: () => ({
			directEventTypes: {},
		}),
	},
	KeyboardObserver: { addListener: jest.fn() },
	RNGestureHandlerModule: {
		attachGestureHandler: jest.fn(),
		createGestureHandler: jest.fn(),
		dropGestureHandler: jest.fn(),
		updateGestureHandler: jest.fn(),
		State: {},
		Directions: {},
	},
	PlatformConstants: {
		forceTouchAvailable: false,
	},
	StatusBarManager: {
		HEIGHT: 42,
		setStyle: jest.fn(),
		setHidden: jest.fn(),
		setNetworkActivityIndicatorVisible: jest.fn(),
	},
	AppCenterReactNativeAnalytics: {
		trackEvent: jest.fn(),
	},
	RNCNetInfo: {
		getCurrentState: jest.fn(() => Promise.resolve({})),
		getCurrentConnectivity: jest.fn(),
		isConnectionMetered: jest.fn(),
		addListener: jest.fn(),
		removeListeners: jest.fn(),
		isConnected: {
			fetch: () => {
				return Promise.resolve(true)
			},
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		},
	},
}))

jest.mock('react-native-splash-screen', () => {
	return {
		hide: jest.fn(),
		show: jest.fn(),
	}
})

describe('headline.screen', () => {
	it('headline screen renders properly', () => {
		const navigation = { navigate: jest.fn(), state: {} }
		const renderer = new ShallowRenderer()
		renderer.render(<HeadlineScreen navigation={navigation} />)
	})
})
