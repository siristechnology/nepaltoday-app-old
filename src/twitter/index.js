import React from 'react'
import { View, Text, List } from 'native-base'
import AppLayout from '../frame/AppLayout'
import styled from 'styled-components'
import TwitterCard from './TwitterCard'

const demo = [
	{
		id: 1,
		handle: '@handle1',
		name: 'Name1',
		category: 'ENT',
		body: 'Hhello this is my first tweet',
		weight: 50
	},
	{
		id: 2,
		handle: '@handle2',
		name: 'Name2',
		category: 'ENT',
		body: 'Hhello this is my first tweet',
		weight: 60
	},
	{
		id: 3,
		handle: '@handle3',
		name: 'Name3',
		category: 'POL',
		body: 'Hhello this is my first tweet',
		weight: 70
	},
	{
		id: 4,
		handle: '@handle4',
		name: 'Name4',
		category: 'NEWS',
		body: 'HELLO this is my first tweet',
		weight: 20
	},
	{
		id: 4,
		handle: '@handle4',
		name: 'Name4',
		category: 'NEWS',
		body: 'HELLO this is my first tweet',
		weight: 20
	},
	{
		id: 4,
		handle: '@handle4',
		name: 'Name4',
		category: 'NEWS',
		body: 'HELLO this is my first tweet',
		weight: 20
	},
	{
		id: 4,
		handle: '@handle4',
		name: 'Name4',
		category: 'NEWS',
		body: 'HELLO this is my first tweet',
		weight: 20
	},
	{
		id: 4,
		handle: '@handle4',
		name: 'Name4',
		category: 'NEWS',
		body: 'HELLO this is my first tweet',
		weight: 20
	},
	{
		id: 4,
		handle: '@handle4',
		name: 'Name4',
		category: 'NEWS',
		body: 'HELLO this is my first tweet',
		weight: 20
	},
	{
		id: 4,
		handle: '@handle4',
		name: 'Name4',
		category: 'NEWS',
		body: 'HELLO this is my first tweet',
		weight: 20
	}
]

class TwitterComponent extends React.PureComponent {
	render () {
		return (
			<AppLayout>
				<List>
					{demo.map(tweet => (
						<TwitterCard key={tweet.id} tweet={tweet} />
					))}
				</List>
			</AppLayout>
		)
	}
}
export default TwitterComponent

const StyledView = styled(View)`
	background: #eee;
`
