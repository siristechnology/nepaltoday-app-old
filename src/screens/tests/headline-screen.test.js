import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import HeadlineScreen from '../headline.screen'

it('headline screen renders properly', () => {
	const navigation = { navigate: jest.fn(), state: {} }
	renderer.create(<HeadlineScreen navigation={navigation} />)
})
