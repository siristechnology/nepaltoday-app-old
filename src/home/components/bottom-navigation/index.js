import React, { Component } from 'react'
import { Footer, FooterTab, Button, Text, Icon } from 'native-base'
export default class BottomNavigation extends Component {
	render () {
		return (
			<Footer>
				<FooterTab>
					<Button vertical active>
						<Icon ios="ios-menu" name="home" />
						<Text>Home</Text>
					</Button>
					<Button vertical>
						<Icon name="newspaper" type="FontAwesome5" />
						<Text>Headlines</Text>
					</Button>
					<Button vertical>
						<Icon active ios="twitter" android="twitter" type="FontAwesome" />
						<Text>Twitter</Text>
					</Button>
				</FooterTab>
			</Footer>
		)
	}
}
