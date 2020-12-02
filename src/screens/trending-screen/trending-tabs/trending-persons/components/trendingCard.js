import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

const TrendingCard = (props) => {

	const theme = useTheme()

	return (
		<TouchableOpacity activeOpacity={0.8} style={[styles.container,{backgroundColor: theme.colors.background}]} onPress={() => props.onCardClick(props.trending)}>
			<Image source={{ uri: props.trending.image }} style={styles.imageStyle} />
			<View style={styles.titleWrapper}>
				<Text style={styles.nameText}>{props.trending.name}</Text>
				<Text style={styles.handleText}>{props.trending.handle}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default TrendingCard

const styles = StyleSheet.create({
	container: {
		borderRadius: 2,
		padding: 8,
		margin: 0.5,
		elevation: 0.9,
		marginHorizontal: 6,
		flexDirection: 'row',
		alignItems: 'center',
	},
	titleWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
	},
	imageStyle: {
		height: 40,
		width: 40,
		borderRadius: 30,
		marginRight: 20,
	},
	nameText: {
		fontSize: 17,
		opacity: 0.9,
		fontWeight: '700',
	},
	handleText: {
		fontSize: 14,
		opacity: 0.7,
		marginLeft: 4,
	},
})
