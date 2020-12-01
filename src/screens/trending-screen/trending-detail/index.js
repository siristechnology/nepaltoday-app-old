import React from 'react'
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Tab, Tabs } from 'native-base'
import TrendingTweetDetail from './trendingTweetDetail'
import TrendingNewsDetail from './trendingNewsDetail'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useTheme, Text } from 'react-native-paper'

const TrendingDetail = (props) => {
	const trending = props.route.params.trending

	const theme = useTheme()

	const GET_INDIVIDUAL_ARTICLES = gql`
        query trendingDetail{
            getIndividualArticles(name: "${trending.nepaliName}"){
                _id
                title
                shortDescription
                content
                link
                imageLink
                createdDate
                modifiedDate
                category
                tags
                totalWeight
                source {
                    name
                    logoLink
                }
            }
        }
	`
	
	const {loading: loading1, data: data1, refetch: refetch1} = useQuery(GET_INDIVIDUAL_ARTICLES, {
		variables: {}
	})

	const GET_TWEETS_BY_HANDLE = gql`
        query trendingDetail{
            getTweetByHandle(handle: "${trending.handle}"){
                _id,
                text,
                tweetId,
                handle,
                publishedDate,
                name,
                createdAt,
                profileImage,
                description,
            }
        }
	`
	
	const {loading: loading2, data: data2, refetch: refetch2} = useQuery(GET_TWEETS_BY_HANDLE, {
		variables: {}
	})
	return (
		<View style={{ flex: 1 }}>
			<View style={[styles.headerView, {backgroundColor: theme.colors.background}]}>
				<Icon 
					name="back" 
					size={24} 
					color={theme.colors.secondary} 
					onPress={()=>props.navigation.goBack()} 
				/>
				<Text style={styles.headerText}>{trending.name}</Text>
				<View />
			</View>
            <View style={[styles.imageContainer,{backgroundColor: theme.colors.lightBackground}]}>
				<Image source={{ uri: trending.image }} style={styles.imageStyle} />
				<Text style={{ marginTop: 10, fontSize: 14 }}>{trending.handle}</Text>
			</View>
			{(loading1 || loading2) &&
				<View style={styles.loaderContainer}>
					<ActivityIndicator size="large" color={theme.colors.secondary} />
				</View>
			||
            <Tabs tabBarUnderlineStyle={{ backgroundColor: '#ff0000' }}>
				<Tab
					style={{ flex: 1 }}
					heading="ट्वीट्स"
					tabStyle={{ backgroundColor: theme.colors.lightBackground }}
					activeTabStyle={{ backgroundColor: theme.colors.lightBackground }}
					textStyle={{ color: theme.colors.text }}
					activeTextStyle={{ color: theme.colors.text }}
				>
					<TrendingTweetDetail
						data={data2}
						refetch={refetch2}
                    />
				</Tab>
				{data1.getIndividualArticles.length>0 &&
					<Tab
						style={{ flex: 1 }}
						heading="समाचार"
						tabStyle={{ backgroundColor: theme.colors.lightBackground }}
						activeTabStyle={{ backgroundColor: theme.colors.lightBackground }}
						textStyle={{ color: theme.colors.text }}
						activeTextStyle={{ color: theme.colors.text }}
					>
						<TrendingNewsDetail
							navigation={props.navigation}
							data={data1}
							refetch={refetch1}
						/>
				</Tab>}
			</Tabs>}
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
		opacity: 0.8,
		fontWeight: 'bold',
	},
	imageContainer: {
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageStyle: {
		height: 75,
		width: 75,
		borderRadius: 40,
	},
	loaderContainer: {
		marginTop: 30,
		justifyContent: 'center',
	},
})

export default TrendingDetail
