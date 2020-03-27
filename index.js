import { AppRegistry, YellowBox } from 'react-native'
import App from './app.js'
import { name as appName } from './app.json'
import bgMessaging from './src/services/bgMessaging'

YellowBox.ignoreWarnings([
	'Warning: componentWillMount is deprecated',
	'Warning: componentWillReceiveProps is deprecated',
	'Module RCTImageLoader requires',
])

AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerHeadlessTask(
	'RNFirebaseBackgroundMessage',
	() => bgMessaging
)
