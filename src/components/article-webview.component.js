import React, { useEffect, useState } from 'react'
import { AppState, StyleSheet } from 'react-native'
import { Layout, Spinner } from 'react-native-ui-kitten'
import { WebView } from 'react-native-webview'

export const ArticleWebviewComponent = ({ navigation }) => {
	const link = navigation.getParam('link')
	const [appState, setAppState] = useState(AppState.currentState)

	useEffect(() => {
		AppState.addEventListener('change', updateAppState)
		return () => {
			AppState.removeEventListener('change', updateAppState)
		}
	}, [])

	const updateAppState = (nextAppState) => {
		setAppState(nextAppState)
	}

	if (appState == 'active') {
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
	} else {
		return null
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
})
