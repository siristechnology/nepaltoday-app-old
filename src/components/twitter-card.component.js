import React from 'react'
import styled from 'styled-components/native'
import { Text, ListItem, Body, Thumbnail, View } from 'native-base'
import { Linking } from 'react-native'

import { MutedText } from '../styled'
import { getRelativeTime } from '../helper/time'

export class TwitterCard extends React.PureComponent {
	render() {
		const { tweet } = this.props
		console.log('props here', tweet)
		const relativeTime = getRelativeTime(tweet.publishedDate || new Date())
		const openTwitter = () => {
			Linking.openURL(
				`https://twitter.com/${tweet.handle}/status/${tweet.tweetId}`,
			).catch(error => {
				throw new Error('Error opening twitter' + error)
			})
		}
		return (
			<ListItem avatar onPress={openTwitter}>
				<StyledThumbnail
					source={{
						uri:
							tweet.profileImage ||
							'https://api.adorable.io/avatars/157/abott@adorable.png',
					}}
				/>
				<Body>
					<NameWrapper>
						<Name>{tweet.twitterHandle.name}</Name>
						<MutedText>{tweet.twitterHandle.handle}</MutedText>
						<MutedText style={{ marginLeft: 8 }}>
							{relativeTime}
						</MutedText>
					</NameWrapper>
					<Tweet>{tweet.text}</Tweet>
				</Body>
			</ListItem>
		)
	}
}

const Name = styled(Text)`
	padding-right: 8px;
	font-weight: 800;
`

const StyledThumbnail = styled(Thumbnail)`
	width: 40px;
	height: 40px;
	margin-top: -20;
`
const NameWrapper = styled(View)`
	display: flex;
	flex-direction: row;
	align-items: center;
`
const Tweet = styled(Text)`
	font-size: 14;
`
