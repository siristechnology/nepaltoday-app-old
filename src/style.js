import styled from 'styled-components/native'
import { View, Text } from 'native-base'

export const MutedText = styled(Text)`
	font-weight: 200;
	font-size: 10;
	color: #00000050;
`

export const ImageContainer = styled(View)`
	flex-grow: 1;
	flex-direction: row;
	align-items: stretch;
	background-color: rgba(27, 31, 35, 0.05);
	elevation: 1px;
	margin: 2px;
	border-radius: 8px;
`
