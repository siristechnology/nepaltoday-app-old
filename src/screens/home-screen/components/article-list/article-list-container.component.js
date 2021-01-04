import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { CircularSpinner } from '../../../../components/common'
import newsLikeServices from '../../../../services/newsLike.services'
import auth from '@react-native-firebase/auth'

import { ArticleList } from './article-list.component'
import ShowMoreModal from './showMoreModal'
import { useTheme } from 'react-native-paper'

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
		const nid = auth().currentUser.uid
		newsLikeServices.postLike(nid, article._id, article.category)
		const articleIndex = articles.indexOf(article)
		let likes = article.likes || []
		likes.push({nid})
		let dislikes = article.dislikes || []
		dislikes = dislikes.filter(x=>x.nid!=nid) || []
		article.dislikes = dislikes
		article.likes = likes
		articles[articleIndex] = article
		onCloseShowMoreModal()
	}

	const onLikeRemoved = (article) => {
		const nid = auth().currentUser.uid
		newsLikeServices.removeLike(nid, article._id)
		const articleIndex = articles.indexOf(article)
		let likes = article.likes || []
		likes = likes.filter(x=>x.nid!=nid) || []
		article.likes = likes
		articles[articleIndex] = article
		onCloseShowMoreModal() 
	}

	const onArticleDisliked = (article) => {
		const nid = auth().currentUser.uid
		newsLikeServices.postDislike(nid, article._id, article.category)
		const articleIndex = articles.indexOf(article)
		let dislikes = article.dislikes || []
		dislikes.push({nid})
		let likes = article.likes || []
		likes = likes.filter(x=>x.nid!=nid) || []
		article.likes = likes
		article.dislikes = dislikes
		articles[articleIndex] = article
		onCloseShowMoreModal() 
	}

	const onDislikeRemoved = (article) => {
		const nid = auth().currentUser.uid
		newsLikeServices.removeDislike(nid, article._id)
		const articleIndex = articles.indexOf(article)
		let dislikes = article.dislikes || []
		dislikes = dislikes.filter(x=>x.nid!=nid) || []
		article.dislikes = dislikes
		articles[articleIndex] = article
		onCloseShowMoreModal()
	}

	const theme = useTheme()

	console.log("In container", articles.length)

	return <View style={{backgroundColor: theme.colors.primary}}>
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
				onLikeRemoved={onLikeRemoved}
				onDislikeRemoved={onDislikeRemoved}
				onArticleDisliked={onArticleDisliked}
				article={modalArticle}
				onCloseShowMoreModal={onCloseShowMoreModal}
			/>
		</Modal>
	</View>
}