jest.mock('react-native-gesture-handler')
jest.mock('react-native/Libraries/BatchedBridge/NativeModules')
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

import { NativeModules } from 'react-native'
NativeModules.TrackPlayerModule = jest.fn()

const mockLocalize = require('./__mocks__/react-native-localize')
jest.mock('react-native-localize', () => mockLocalize)

jest.mock('@react-native-firebase/auth', () => (() =>({
	currentUser: { uid: 1 },
})))

jest.mock('@react-native-firebase/crashlytics', () => {
    return () => ({
      recordError: jest.fn()
    })
})

jest.mock('@react-native-community/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn()
}))

jest.mock('@react-native-community/netinfo', () => ({
    fetch: jest.fn()
}))
