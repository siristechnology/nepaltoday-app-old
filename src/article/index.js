import React from 'react'
import { connect } from 'react-redux'
import { WebView } from 'react-native-webview'

class ArticleScreen extends React.Component {
	render() {
		const { navigation } = this.props
		const link = navigation.getParam('link')

		return (
			<WebView
				source={{ uri: link }}
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 20
				}}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {
		article: state.article
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticleScreen)
