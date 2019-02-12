module.exports = {
	"presets": ["module:metro-react-native-babel-preset"],
	"plugins": ["relay"],
	"env": {
		"development": {
			"plugins": ["relay"]
		}
	}
}
