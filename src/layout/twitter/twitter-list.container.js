import React from 'react'
import { TwitterList } from './twitter-list.component'

export const TwitterListContainer = ({ tweets, refreshing, handleRefresh, header }) => {
	return <TwitterList tweets={tweets} refreshing={refreshing} handleRefresh={handleRefresh} header={header} />
}
