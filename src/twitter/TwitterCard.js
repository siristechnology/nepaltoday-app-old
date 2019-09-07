import React from 'react'
import { Text, ListItem, Body, Left, Thumbnail, View } from 'native-base'
import styled from 'styled-components/native'
import { MutedText } from '../styled'

class TwitterCard extends React.PureComponent {
	render() {
		const { tweet } = this.props
		return (
			<ListItem avatar>
				<Left>
					<StyledThumbnail
						source={{
							uri: 'https://api.adorable.io/avatars/157/abott@adorable.png'
						}}
					/>
				</Left>
				<Body>
					<NameWrapper>
						<Text style={{ paddingRight: 8 }}>{tweet.twitterHandle.name}</Text>
						<MutedText>{tweet.twitterHandle.handle}</MutedText>
					</NameWrapper>
					<Text note>{tweet.text}</Text>
				</Body>
			</ListItem>
		)
	}
}
export default TwitterCard

const StyledThumbnail = styled(Thumbnail)`
	width: 40px;
	height: 40px;
	margin-top: 0;
`
const NameWrapper = styled(View)`
	display: flex;
	flex-direction: row;
	align-items: center;
`
