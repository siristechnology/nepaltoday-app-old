import React from 'react'
import { WebView } from 'react-native-webview'
import { ActivityIndicator } from 'react-native'

export class ArticleWebviewComponent extends React.Component {
	render() {
		const { navigation } = this.props
		const link = navigation.getParam('link')

		return (
			<WebView
				renderLoading={() => (
					<ActivityIndicator
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					/>
				)}
				startInLoadingState
				source={{ uri: link }}
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 20,
				}}
			/>
		)
	}
}
