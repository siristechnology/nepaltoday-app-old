import React, {useState} from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ArticleListContainer } from '../../layout/article/article-list/article-list-container.component'

const TagArticleScreen = (props) => {
    const [refreshing, setRefreshing] = useState(false)
    const theme = useTheme()
    const tag = props.route.params.tag

    const GET_TAG_ARTICLE = gql`
        query tagArticle{
            getArticlesFromTag(tag: "${tag}"){
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

    const {loading, data, refetch} = useQuery(GET_TAG_ARTICLE, {
		variables: {}
    })

    const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}
    
    return(
        <View style={{ flex: 1 }}>
			<View style={[styles.headerView, {backgroundColor: theme.colors.background}]}>
				<Icon 
					name="back" 
					size={24} 
					color={theme.colors.secondary} 
					onPress={()=>props.navigation.goBack()} 
				/>
				<Text style={styles.headerText}>#{tag}</Text>
				<View />
			</View>
            {loading &&
				<View style={styles.loaderContainer}>
					<ActivityIndicator size="large" color={theme.colors.secondary} />
				</View>
                ||
                <ArticleListContainer
                    articles={data.getArticlesFromTag}
                    navigation={props.navigation}
                    refreshing={refreshing}
                    handleRefresh={handleRefresh}
                />
            }
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
    loaderContainer: {
		marginTop: 30,
		justifyContent: 'center',
	},
})

export default TagArticleScreen