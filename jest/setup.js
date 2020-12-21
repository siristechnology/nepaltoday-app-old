jest.mock('react-native-gesture-handler')
jest.mock('react-native/Libraries/BatchedBridge/NativeModules')
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

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

jest.mock('react-native-appearance', () => ({
	theme: jest.fn(),
	AppearanceProvider: jest.fn(),
}))

jest.mock("react-native-bootsplash", () => {
  return {
    hide: jest.fn().mockResolvedValueOnce(),
    show: jest.fn().mockResolvedValueOnce(),
    getVisibilityStatus: jest.fn().mockResolvedValue("hidden"),
  };
});