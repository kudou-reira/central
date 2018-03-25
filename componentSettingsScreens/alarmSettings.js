import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

class AlarmSettings extends Component {
	static navigationOptions = {
		title: 'Alarm Settings',
		tabBarIcon: ({ tintColor }) => <Icon name="alarm" size={30} color={tintColor} />
	}
	render() {
		return(
			<View>
				<Text>
					This is alarm settings
				</Text>
			</View>
		);
	}
}

export default AlarmSettings;