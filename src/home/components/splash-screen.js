import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class SplashScreen extends React.Component {
  render() {
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