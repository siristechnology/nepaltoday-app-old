import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import styled from 'styled-components/native'
import colors from '../../../config/colors'
export default class ButtonNavigation extends Component {
	render () {
		return (
			<ButtomNavigation>
				<TouchableOpacityWrapper>
					<StyledIcon name="home" type="material-community" />
					<StyledText>Home</StyledText>
				</TouchableOpacityWrapper>
				<TouchableOpacityWrapper>
					<StyledIcon name="newspaper" type="material-community" />
					<StyledText>Headlines</StyledText>
				</TouchableOpacityWrapper>
				<TouchableOpacityWrapper>
					<StyledIcon name="twitter" type="material-community" />
					<StyledText>Twitter</StyledText>
				</TouchableOpacityWrapper>
			</ButtomNavigation>
		)
	}
}

const ButtomNavigation = styled.View`
	width: 100%;
	height: 45;
	background: ${colors.GREY};
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

const TouchableOpacityWrapper = styled.TouchableOpacity`
	flex: 0.2;
	align-items: center;
	justify-content: center;
`

const StyledIcon = styled(Icon)`
	background-color: transparent;
	opacity: 0.8;
	font-size: 24;
`
const StyledText = styled.Text`
	background-color: transparent;
	padding-top: 4;
	font-size: 12;
	font-family: roboto-regular;
	color: #616161;
`
