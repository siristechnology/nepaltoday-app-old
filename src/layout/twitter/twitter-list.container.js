import React from 'react'
import { TwitterList } from './twitter-list.component'

export const TwitterListContainer = ({ tweets, handleRefresh }) => {
	return <TwitterList tweets={tweets} handleRefresh={handleRefresh} />
}
