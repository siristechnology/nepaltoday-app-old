import React from 'react'
import { Text, NativeModules } from 'react-native'
import renderer from 'react-test-renderer'

// console.log('printing NativeModules from main')
// jest.mock('react-native/Libraries/BatchedBridge/NativeModules')

// jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => () => ({
// 	...NativeModules
// }))

NativeModules.TrackPlayerModule = jest.fn()

console.log('printing NativeModules from main', NativeModules)

// jest.mock('react-native/Libraries/Utilities/NativeDeviceInfo')
// jest.mock('react-native/Libraries/BatchedBridge/NativeModules')
// jest.mock('react-native-gesture-handler')

// jest.mock('NativeDeviceInfo')

// jest.mock('react-native/Libraries/BatchedBridge/NativeModules/TrackPlayerModule')

// jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => ({
// 	UIManager: {
// 		RCTView: () => ({
// 			directEventTypes: {},
// 		}),
// 	},
// 	KeyboardObserver: { addListener: jest.fn() },
// 	RNGestureHandlerModule: {
// 		attachGestureHandler: jest.fn(),
// 		createGestureHandler: jest.fn(),
// 		dropGestureHandler: jest.fn(),
// 		updateGestureHandler: jest.fn(),
// 		State: {},
// 		Directions: {},
// 	},
// 	PlatformConstants: {
// 		forceTouchAvailable: false,
// 	},
// 	StatusBarManager: {
// 		HEIGHT: 42,
// 		setStyle: jest.fn(),
// 		setHidden: jest.fn(),
// 		setNetworkActivityIndicatorVisible: jest.fn(),
// 	},
// 	AppCenterReactNativeAnalytics: {
// 		trackEvent: jest.fn(),
// 	},
// 	RNCNetInfo: {
// 		getCurrentState: jest.fn(() => Promise.resolve({})),
// 		getCurrentConnectivity: jest.fn(),
// 		isConnectionMetered: jest.fn(),
// 		addListener: jest.fn(),
// 		removeListeners: jest.fn(),
// 		isConnected: {
// 			fetch: () => {
// 				return Promise.resolve(true)
// 			},
// 			addEventListener: jest.fn(),
// 			removeEventListener: jest.fn(),
// 		},
// 	},
// 	// NativeDeviceInfo: {
// 	// 	getConstants: () => ({
// 	// 		Dimensions: {
// 	// 			get: jest.fn().mockReturnValue({ width: 100, height: 100 }),
// 	// 		},
// 	// 	}),
// 	// },
// 	TrackPlayerModule: {},
// }))

// node_modules/react-native/Libraries/Utilities/NativeDeviceInfo.js
// // jest.mock('react-native/Libraries/TurboModule', () => ({
// jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
// 	get: jest.fn(),
// 	getEnforcing: jest.fn(),
// }))

// jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
// 	get: jest.fn().mockReturnValue({ width: 100, height: 100 }),
// }))

// jest.mock('react-native/Libraries/Utilities/NativeDeviceInfo', () => ({
// 	getConstants: () => ({
// 		Dimensions: {
// 			get: (x) => ({ width: 100, height: 100, scale: 1 }),
// 			// get: jest.fn().mockReturnValue({ width: 100, height: 100, scale: 1 }),
// 		},
// 	}),
// }))

// jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
// 	get: () => ({ width: 100, height: 100, scale: 1 }),
// }))

// jest.mock('react-native/Libraries/Utilities/Dimensions')
// jest.mock('react-native/Libraries/Utilities/PixelRatio')
// jest.mock('react-native/Libraries/Utilities/NativeDeviceInfo', () => ({
// 	getConstants: jest.fn(),
// }))

import App from './app.js'

test('app renders correctly', () => {
	renderer.create(<Text />)
})
