import React from 'react'
import { WebView } from 'react-native-webview'

export class ArticleWebviewComponent extends React.Component {
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
