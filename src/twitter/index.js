import React from 'react'
import { FlatList } from 'react-native'
import { QueryRenderer, graphql } from 'react-relay'

import TwitterCard from './TwitterCard'
import environment from '../environment'
import AppLayout from '../frame/AppLayout'
import { View, Text } from 'native-base'

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
			<QueryRenderer
				environment={environment}
				query={graphql`
					query twitterQuery {
						getTweets {
							_id
							text
							twitterHandle {
								_id
								name
								handle
								category
							}
						}
					}
				`}
				render={({ error, props }) => {
					if (!props) {
						return (
							<View>
								<Text>Twitter splash screen here</Text>
							</View>
						)
					} else if (error) {
						alert('error:' + JSON.stringify(error))
					}
					return (
						<AppLayout>
							<FlatList
								data={props.getTweets}
								keyExtractor={item => item._id}
								extraData={this.state}
								renderItem={({ item }) => {
									return (
										<TwitterCard
											tweet={item}
											key={item.id}
											actions={this.props.actions}
											navigation={this.props.navigation}
										/>
									)
								}}
							/>
						</AppLayout>
					)
				}}
			/>
		)
	}
}
export default TwitterComponent
