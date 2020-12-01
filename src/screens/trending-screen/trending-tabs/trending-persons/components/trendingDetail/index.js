import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Tab, Tabs } from 'native-base'
import TrendingTweetDetail from './trendingTweetDetail'
import TrendingNewsDetail from './trendingNewsDetail'
import { Text, useTheme } from 'react-native-paper'

const TrendingDetail = (props) => {

	const theme = useTheme()

	return (
		<View style={{ flex: 1 }}>
			<View style={[styles.headerView,{backgroundColor:theme.colors.header}]}>
				<Icon name="back" size={24} color="#000" onPress={props.closeDetail} />
				<Text style={styles.headerText}>kkkkkk{props.trending.name}</Text>
				<View />
			</View>
            <View style={styles.imageContainer}>
				<Image source={{ uri: props.trending.image }} style={styles.imageStyle} />
				<Text style={{ marginTop: 10, fontSize: 14 }}>{props.trending.handle}</Text>
			</View>
            <Tabs tabBarUnderlineStyle={{ backgroundColor: '#ff0000' }}>
				<Tab
					style={{ flex: 1 }}
					heading="समाचार"
					tabStyle={{ backgroundColor: '#fff' }}
					activeTabStyle={{ backgroundColor: '#fff' }}
					textStyle={{ color: '#000' }}
					activeTextStyle={{ color: '#000' }}
				>
                    <TrendingNewsDetail
						navigation={props.navigation}
                        trending={props.trending}
                    />
				</Tab>
				<Tab
					style={{ flex: 1 }}
					heading="ट्वीट्स"
					tabStyle={{ backgroundColor: '#fff' }}
					activeTabStyle={{ backgroundColor: '#fff' }}
					textStyle={{ color: '#000' }}
					activeTextStyle={{ color: '#000' }}
				>
					<TrendingTweetDetail
                        trending={props.trending}
                    />
				</Tab>
			</Tabs>
		</View>
	)
}

const styles = StyleSheet.create({
	headerView: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerText: {
		fontSize: 19,
		// color: '#000',
		opacity: 0.8,
		fontWeight: 'bold',
	},
	imageContainer: {
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#FAF9FE',
	},
	imageStyle: {
		height: 75,
		width: 75,
		borderRadius: 40,
	}
})

export default TrendingDetail
