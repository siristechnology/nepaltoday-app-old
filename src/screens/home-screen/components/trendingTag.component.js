import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import crashlytics from '@react-native-firebase/crashlytics'
import { useTheme, Text } from 'react-native-paper'

const TrendingTag = (props) => {
    const FETCH_TRENDING_TAG = gql`
        query getTrendingTags {
            getTrendingTags{
                tags
            }
        }
    `

    const { loading, data, error } = useQuery(FETCH_TRENDING_TAG, {
		variables: {},
	})

	if (error) {
		crashlytics().recordError(new Error('nepali event Api error' + error.message))
    }
    
    const onTagPressed = (tag) => {
        props.navigation.navigate('TagArticle',{tag})
    }

    const theme = useTheme()
    
    if(!loading && !error && !!data.getTrendingTags){
        let { tags } = data.getTrendingTags

        return (
            <ScrollView 
                style={styles.container}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {tags.map((trendingTag, i)=>(
                    <TouchableOpacity 
                        activeOpacity={0.5}
                        key={i}
                        style={[styles.tagView, {borderColor: theme.colors.secondary}]}
                        onPress={()=>onTagPressed(trendingTag)}
                    >
                        <Text>
                            #{trendingTag}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        )
    }else{
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    tagView: {
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderWidth: 0.5,
        borderColor: '#000',
        marginRight: 10
    }
})

export default TrendingTag