import { ImageStyle, StyleProp } from 'react-native'
import { Icon, IconElement, IconSource } from './icon.component'

export const ClockIconOutline = (style: StyleProp<ImageStyle>): IconElement => {
	const source: IconSource = {
		imageSource: require('./eva/clock-outline.png'),
	}

	return Icon(source, style)
}
export const HeartIconFill = (style: StyleProp<ImageStyle>): IconElement => {
	const source: IconSource = {
		imageSource: require('./eva/heart.png'),
	}

	return Icon(source, style)
}
