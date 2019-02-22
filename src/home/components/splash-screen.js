import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SplashScreen extends React.Component {
  render() {
	const styles = StyleSheet.create({
		container: {
		  flex: 1,
		  justifyContent: 'center',
		  alignItems: 'center',
		  backgroundColor: '#F5FCFF',
		},
		welcome: {
		  fontSize: 20,
		  textAlign: 'center',
		  margin: 10,
		},
		instructions: {
		  textAlign: 'center',
		  color: '#333333',
		  marginBottom: 5,
		},
	  });
	  
    const viewStyles = [styles.container, { backgroundColor: 'skyblue' }];
    const heading = {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold'
	};
	
	const wait = {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		margin:10
	  };

    return (
      <View style={viewStyles}>
        <Text style={heading}>
			नेपाल आज
        </Text>
		<Text style={wait}>
			कृपया पर्खनुहोस्
        </Text>
      </View>
    );
  }
}