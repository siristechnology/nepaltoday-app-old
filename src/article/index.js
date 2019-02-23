import React from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native';

class ArticleScreen extends React.Component {
	render () {
		const { navigation } = this.props;
		const article = navigation.getParam('article');

		return (
			<WebView
				source={{ uri: article.link }}
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
			/>
		);
	}
}

function mapStateToProps (state) {
	return {
		article: state.article
	};
}

function mapDispatchToProps (dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen);
