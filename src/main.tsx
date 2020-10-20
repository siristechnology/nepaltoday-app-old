import React, { useEffect } from 'react'
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper'
import { useColorScheme } from 'react-native-appearance'
import { RootNavigator } from './rootNavigator'
import { PreferencesContext } from './context/preferencesContext'
import RNBootSplash from 'react-native-bootsplash'

export const Main = () => {
	const colorScheme = useColorScheme()
	const [theme, setTheme] = React.useState<'light' | 'dark'>(colorScheme === 'dark' ? 'dark' : 'light')

	function toggleTheme() {
		setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
	}

	useEffect(() => {
		RNBootSplash.hide()
	}, [])

	const preferences = React.useMemo(
		() => ({
			toggleTheme,
			theme,
		}),
		[theme],
	)

	return (
		<PreferencesContext.Provider value={preferences}>
			<PaperProvider
				theme={
					theme === 'light'
						? {
								...DefaultTheme,
								colors: { ...DefaultTheme.colors, primary: '#1ba1f2' },
						  }
						: {
								...DarkTheme,
								colors: { ...DarkTheme.colors, primary: '#1ba1f2' },
						  }
				}
			>
				<RootNavigator />
			</PaperProvider>
		</PreferencesContext.Provider>
	)
}
