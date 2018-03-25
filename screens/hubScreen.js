import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Alarms from '../components/alarms';

class HubScreen extends Component {
	// add properties to class itself
	static navigationOptions = {
		title: 'Hub',
		tabBarIcon: ({ tintColor }) => <Icon name="first-order" size={30} color={tintColor} type="font-awesome" />,
		headerLeft: null
	}

	render() {
		console.log("this is props in alarms", this.props);
		return(
			<View style={styles.containerStyle}>
				<ScrollView>
					<Alarms navigation={this.props.navigation} />
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1
	},
	titleStyle: {
		textAlign: 'left',
		fontSize: 22
	}
}

export default HubScreen;