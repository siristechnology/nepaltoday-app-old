import { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

class OfflineNotice extends PureComponent {
	constructor (props) {
		super(props);
		this.state = {
			isConnected: true
		};
	}

	componentDidMount () {
		NetInfo.isConnected.addEventListener('connectionChange', (isConnected) => this.setState({ isConnected }));
	}

	componentWillUnmount () {
		NetInfo.isConnected.removeEventListener('connectionChange', (isConnected) => this.setState({ isConnected }));
	}

	render () {
		if (!this.state.isConnected) {
			return <MiniOfflineSign />;
		}
		return null;
	}
}

class MiniOfflineSign extends PureComponent {
	render () {
		return (
			<View style={styles.offlineContainer}>
				<Text style={styles.offlineText}>कृपया इन्टरनेट जाँच गर्नुहोस्</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	offlineContainer: {
		backgroundColor: '#b52424',
		height: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width,
	},
	offlineText: { color: 'white' }
});

export default OfflineNotice;