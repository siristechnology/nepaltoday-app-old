import React from 'react'
import { render, act } from '@testing-library/react-native';

import DistrictCard from './districtCard'

describe('testing district corona stats', () => {
    it('render district stats properly', async () => {
        const promise = Promise.resolve()
        const district = {
            name: 'Jhapa',
            nepaliName: 'झापा',
            totalCases: 3420,
            newCases: 51
        }
        render(<DistrictCard
            index= {0}
            stat= {district}
        />)
        await act(() => promise)
    })
})