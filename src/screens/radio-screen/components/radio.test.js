import React from 'react'
import { render, act } from '@testing-library/react-native';

import RadioCard from './radioCard'

describe('testing radio card', () => {
    it('render radio card properly', async () => {
        const promise = Promise.resolve()
        const radioObj = {
            channel: {
                "id": 12,
                "title": "Radio Sargam",
                "province": "Province-1",
                "artist": 93,
                "city": "Siraha",
                "url": "http://rstream.abgroupnepal.com:8000/radiosargam",
                "artwork": "https://cdn.onlineradiobox.com/img/logo/3/31523.v3.png"
            },
            currentChannelId: 12,
            fmList: [
                {
                    "id": 12,
                    "title": "Radio Sargam",
                    "province": "Province-1",
                    "artist": 93,
                    "city": "Siraha",
                    "url": "http://rstream.abgroupnepal.com:8000/radiosargam",
                    "artwork": "https://cdn.onlineradiobox.com/img/logo/3/31523.v3.png"
                }
            ],
            isFavorite: false
        }
        render(<RadioCard
            channel={radioObj.channel}
            currentChannelId={radioObj.currentChannelId}
            fmList={radioObj.fmList}
            isFavorite={radioObj.isFavorite}
        />)
        await act(() => promise)
    })
})