import 'react-native'
import React from 'react'
import ErrorBoundary from './error-boundry'

const Something = () => {
	throw new Error('Test error')
}

describe('Error boundary', () => {
	it('should catch error', () => {
		const wrapper = (
			<ErrorBoundary>
				<Something />
			</ErrorBoundary>
			// Todo to find our the way to get mock to catch error
		)
	})
})
