import React from 'react'
import { FlatList } from 'react-native'
import { QueryRenderer, graphql } from 'react-relay'

import TwitterCard from './TwitterCard'
import environment from '../environment'
import AppLayout from '../frame/AppLayout'
import { View, Text } from 'native-base'

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
						console.log('error:' + JSON.stringify(error))
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
