import React from 'react'
import { render, act } from '@testing-library/react-native';

import CountryCard from './countryCard'

describe('testing country corona stats', () => {
    it('render country stats properly', async () => {
        const promise = Promise.resolve()
        const countryObj = {
            country: 'USA',
            total_cases: 3420,
            total_deaths: 3420,
            new_cases: 51,
            new_deaths: 29
        }
        render(<CountryCard
            index= {0}
            stat= {countryObj}
        />)
        await act(() => promise)
    })
})