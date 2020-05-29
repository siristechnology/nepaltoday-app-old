import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Spinner } from 'react-native-ui-kitten'
import { WebView } from 'react-native-webview'

export class ArticleWebviewComponent extends React.Component {
	render() {
		const { navigation } = this.props
		const link = navigation.getParam('link')

		return (
			<WebView
				renderLoading={() => (
					<Layout style={styles.container}>
						<Spinner />
					</Layout>
				)}
				mediaPlaybackRequiresUserAction={true}
				mixedContentMode="always"
				allowsInlineMediaPlayback="false"
				startInLoadingState
				source={{ uri: link }}
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
})
