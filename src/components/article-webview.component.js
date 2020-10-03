import React, { useEffect, useState } from 'react'
import { AppState, StyleSheet, View } from 'react-native'
import { Layout, Spinner } from 'react-native-ui-kitten'
import { WebView } from 'react-native-webview'
import AntDesign from 'react-native-vector-icons/AntDesign'

export const ArticleWebviewComponent = ({ navigation, route }) => {
	const link = route.params.link
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

	const BackIcon = (
		<AntDesign
			name="back"
			size={24}
			color="grey"
			onPress={() => navigation.goBack()}
			style={{
				padding: 8,
			}}
		/>
	)

	if (appState == 'active') {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ paddingLeft: 10 }}>{BackIcon}</View>
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
			</View>
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
