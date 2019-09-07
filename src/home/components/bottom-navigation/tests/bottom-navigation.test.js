import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import BottomNavigation from '../index'

it('bottom navigation renders properly', () => {
	const navigation = { navigate: jest.fn(), state: {} }
	renderer.create(<BottomNavigation navigation={navigation} />)
})
