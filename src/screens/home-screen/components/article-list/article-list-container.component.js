import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { CircularSpinner } from '../../../../components/common'

import { ArticleList } from './article-list.component'
import ShowMoreModal from './showMoreModal'

export const ArticleListContainer = (props) => {
	const [showMoreModal, setShowMoreModal] = useState(false)
	const [modalArticle, setModalArticle] = useState({})
	const { articles, navigation } = props

	const onItemPress = (article) => {
		navigation.navigate('ArticleDetail', { article, articles })
	}

	const onShowMoreModal = (article) => {
		setShowMoreModal(true)
		setModalArticle(article)
	}

	const onCloseShowMoreModal = () => {
		setShowMoreModal(false)
	}

	const onArticleLiked = (article) => {
		
	}

	return <View>
		{((!articles || articles.length === 0) && 
		<CircularSpinner />) || 
		<ArticleList 
			onShowMoreModal={onShowMoreModal} 
			onItemPress={onItemPress} 
			{...props} 
		/>}
		<Modal
			visible={showMoreModal}
			transparent={true}
			onRequestClose={onCloseShowMoreModal}
			animationType="slide"
		>
			<ShowMoreModal
				onArticleLiked={onArticleLiked}
				onArticleDisliked={onArticleDisliked}
				article={modalArticle}
				onCloseShowMoreModal={onCloseShowMoreModal}
			/>
		</Modal>
	</View>
}