import React, { useEffect, useState } from 'react'
import { AppState, StyleSheet, View } from 'react-native'
import { Layout, Spinner } from '@ui-kitten/components'
import { WebView } from 'react-native-webview'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'react-native-paper'

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

	const theme = useTheme()

	if (appState == 'active') {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ paddingLeft: 10 }}>{BackIcon}</View>
				<WebView
					renderLoading={() => (
						<Layout style={[styles.container,{backgroundColor: theme.colors.lightBackground}]}>
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
						backgroundColor: theme.colors.lightBackground
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
