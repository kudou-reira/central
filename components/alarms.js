import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

class Alarms extends Component {
	onAlarmsPress(){
		this.props.navigation.navigate('alarmSettings');
	}

	render() {
		return(
			<View>
				<TouchableOpacity onPress={() => this.onAlarmsPress()}>
					<Card 
						containerStyle={styles.containerStyle}
						title="Alarms"
						titleStyle={styles.titleStyle}
					>
					</Card>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	titleStyle: {
		textAlign: 'left',
		fontSize: 20
	},
	containerStyle: {
		borderRadius: 10
	}
}

export default Alarms;