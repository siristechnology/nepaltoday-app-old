import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export class SplashScreen extends React.Component {
	static navigationOptions = {
		header: null,
	}
	render() {
		const viewStyles = [styles.container, { backgroundColor: 'skyblue' }]

		return (
			<View style={viewStyles}>
				<Text style={styles.heading}>नेपाल आज</Text>
				<Text style={styles.wait}>कृपया पर्खनुहोस्</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	heading: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
	},
	wait: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		margin: 10,
	},
})
