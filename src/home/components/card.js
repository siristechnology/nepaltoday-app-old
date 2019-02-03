import React, { Component } from 'react';
import { View, ScrollView, Image, Highlight, TouchableHighlight, StyleSheet, Platform, TouchableOpacity, StyleSheetProperties } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
// import { Icon as IconTest } from 'react-native-vector-icons/MaterialIcons';
import { Icon as IconTest } from 'react-native-vector-icons/FontAwesome';

export default class CardShowcase extends Component {

	render () {
		const { article } = this.props;

		return (
			<Content>
				<Card style={{ flex: 0 }}>
					<CardItem>
						<Body>
							<View horizontal={true} style={{ flex: 1, flexDirection: "row" }}>
								<View style={{ flex: 1, flexDirection: "column" }}>
									<View style={{ flex: 1, flexDirection: "row" }}>
										<Thumbnail source={{ uri: article.topImage }} />
										<View style={{ flexDirection: "column", justifyContent: "flex-start" }} >
											<Text style={{ paddingLeft: 15, fontWeight: "bold", fontSize: 20 }}>
												{article.title} </Text>
											<Text
												style={{ paddingLeft: 15, color: "#aaa", fontSize: 16 }}>
												{article.eventTime}
											</Text>
										</View>
									</View>
									<View style={styles.tweet}>
										<TouchableHighlight
											underlayColor="white"
											activeOpacity={0.75}>
											<View style={{ flex: 1, flexDirection: "row" }}>
												<Icon name="navigate" style={{ color: "#32db64", fontSize: 20, width: 20 }} />
												<Text
													style={{
														paddingLeft: 4,
														color: "#aaa",
														fontSize: 16
													}}
												>
													{article.shortDescription}
												</Text>
											</View>
										</TouchableHighlight>
									</View>
									<View style={{ flex: 1, flexDirection: 'row' }}>
										<Text>2 hours ago</Text>
									</View>
								</View>
							</View>
						</Body>
					</CardItem>
				</Card>
			</Content >

		);

	}
}

const styles = StyleSheet.create({
	topMargin: {
		marginTop: Platform.OS === "ios" ? 0 : 10,
		backgroundColor: "white",
		zIndex: -1
	},
	content: {
		padding: 10,
		backgroundColor: "white"
	},
	heading: {
		fontSize: 32,
		fontWeight: "400",
		marginBottom: 30
	},
	tweet: {
		paddingTop: 20,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10,
		borderBottomColor: "#bbb",
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: "row"
	},
	tweetText: {
		marginTop: 10,
		fontSize: 18,
		color: "#555"
	},
	tweetFooter: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 0
	},
	badgeCount: {
		fontSize: 12,
		paddingLeft: 5
	},
	footerIcons: {
		flexDirection: "row",
		alignItems: "center"
	},
	modalFooter: {
		backgroundColor: "white",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 0.2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		height: 54,
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 5
	}
});