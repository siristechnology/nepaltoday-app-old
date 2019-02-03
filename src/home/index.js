import React from "react";
import { View } from "react-native";
import { Container, Content, Header, Left, Text } from 'native-base';

class HomeScreen extends React.Component {
	render () {
		return (
			<Container>
				<Content>
					<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
						<Text>Home Screen</Text>
					</View>
				</Content>
			</Container>
		);
	}
}

export default HomeScreen;