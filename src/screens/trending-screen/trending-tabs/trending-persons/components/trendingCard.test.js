import React from 'react'
import { render, act } from '@testing-library/react-native';

import TrendingCard from './trendingCard'

describe('testing trending card', () => {
    it('render trending card properly', async () => {
        const promise = Promise.resolve()
        const trendingObj = {
            name: "KP Sharma Oli",
            nepaliName: "केपी शर्मा ओली",
            handle: "@PM_Nepal",
            image: "https://pbs.twimg.com/profile_images/964093929002946560/RrZvsn_9.j"
        }
        render(<TrendingCard
            trending={trendingObj}
        />)
        await act(() => promise)
    })
})