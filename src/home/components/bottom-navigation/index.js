import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Footer, FooterTab, Button, Text, Icon } from 'native-base'

class BottomNavigation extends Component {
	getIfActive = param => {
		return this.props.navigation.state.routeName === param
	}
	render() {
		const { navigate } = this.props.navigation
		return (
			<Footer>
				<FooterTab>
					<Button
						vertical
						active
						onPress={() => navigate('Home')}
						active={this.getIfActive('Home')}
					>
						<Icon ios="ios-menu" name="home" />
						<Text>Home</Text>
					</Button>
					{/* <Button vertical>
						<Icon name="newspaper" type="FontAwesome5" />
						<Text>Headlines</Text>
					</Button> */}
					<Button
						vertical
						onPress={() => navigate('Twitter')}
						active={this.getIfActive('Twitter')}
					>
						<Icon active ios="twitter" android="twitter" type="FontAwesome" />
						<Text>Twitter</Text>
					</Button>
				</FooterTab>
			</Footer>
		)
	}
}

export default withNavigation(BottomNavigation)
