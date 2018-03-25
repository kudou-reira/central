import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, Card } from 'react-native-elements';

class CentralScreen extends Component { 
	static navigationOptions = {
		title: 'Central',
		tabBarIcon: ({ tintColor }) => <Icon name="terminal" size={30} color={tintColor} type="font-awesome" />
	}

	render() {
		return(
			<View>
				<Text>
					this is the central screen
				</Text>
			</View>
		);
	}
}

export default CentralScreen;