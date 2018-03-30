import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Card, Icon, Button, Divider } from 'react-native-elements';

var moment = require('moment');

class SavedAlarms extends Component {
	constructor(props) {
		super(props);
	}

			// 	<View>
			// 	<Text>
			// 		time: {moment(alarm.time, 'HH:mm:ss').format("HH:mm")}
			// 	</Text>
			// 	<Text>
			// 		days: {alarm.days.join(", ")}
			// 	</Text>
			// </View>

  renderRepeatDays(days) {
  	if(days.length === 0) {
  		return 'No';
  	} else {
  		var abbreviations = [];
  		for(var day of days) {
  			abbreviations.push(day.substring(0, 3));
  		}
  		return abbreviations.join(", ");
  	}
  }

	renderAlarmsList() {
		console.log("this is props alarm in render alarms", this.props.alarms);
		return this.props.alarms.map((alarm) => {
			console.log("this is alarm", alarm.time);
			console.log("this is alarm", alarm.days.join(", "));
			return(
				<View>
					<Card 
						containerStyle={styles.containerStyle}
						title={moment(alarm.time, 'HH:mm:ss').format("HH:mm")}
					>
						<View style={styles.viewGapStyle}>
							<Text style={styles.prominentTextStyle}>
								Repeat:
							</Text>
							<Text style={styles.prominentTextStyle}>
								{this.renderRepeatDays(alarm.days)}
							</Text>
						</View>
					</Card>
				</View>
			);
		})
	}

	render(){
		console.log("this is props in saved alarms", this.props);
		return(
			<View>
				{this.renderAlarmsList()}
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
		borderRadius: 10,
		marginBottom: 14
	},
	viewGapStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 4
	},
	prominentTextStyle: {
		fontSize: 18
	},
}


export default SavedAlarms;