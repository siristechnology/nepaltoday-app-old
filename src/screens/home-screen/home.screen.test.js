import React from 'react';
import { render } from '@testing-library/react-native';
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
import Home from './home.screen'

describe('Testing Home', () => {
    test('Page contains nepali date', async () => {
        const component = (<Home />)
        const { findByTestId } = render(component)
        const nepaliDate = await findByTestId('nepaliDate')
        expect(nepaliDate).toBeVisible()
    })
})