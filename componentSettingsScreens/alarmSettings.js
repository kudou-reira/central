import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Card, Icon, Button, Divider } from 'react-native-elements';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { connect } from 'react-redux';
import * as actions from '../actions';

// https://docs.expo.io/versions/latest/sdk/audio.html
// https://facebook.github.io/react-native/docs/vibration.html
// https://docs.expo.io/versions/latest/sdk/notifications.html#exponotificationsschedulelocalnotificationasynclocalnotification-schedulingoptions

class AlarmSettings extends Component {
	static navigationOptions = {
		title: 'Alarm Settings',
		tabBarIcon: ({ tintColor }) => <Icon name="alarm" size={30} color={tintColor} />
	}

	state = { isModalVisible: false, isTimePickerVisible: false };

	addAlarm = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	}

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

	_showDateTimePicker = () => this.setState({ isTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isTimePickerVisible: false });

  renderSelectedTime() {
  	return(
  		<View>
  			<Text style={styles.selectedTextStyle}>
  				Nothing here yet
  			</Text>
  		</View>
  	);
  }

	renderAddAlarm() {
		return(
			<View>
				<TouchableOpacity onPress={this.addAlarm}>
					<Card
						containerStyle={styles.containerStyle}
					>
						<View style={styles.viewStyle}>
							<Text style={styles.normalTextStyle}>
								Add an alarm
							</Text>
							<Icon name="plus-circle" size={20} type="font-awesome" />
						</View>
					</Card>
				</TouchableOpacity>
				<Modal isVisible={this.state.isModalVisible}>
					<Card
						title="New alarm"
						titleStyle={styles.titleStyle} 
						containerStyle={styles.containerStyle}
					>
						<View style={styles.buttonContainerStyle}>
							{this.renderSelectedTime()}
							<Button
								title="Select time"
								outline={false}
								rounded={true}
								buttonStyle={styles.buttonStyle}
								fontSize={16}
							/>
						</View>
						<DateTimePicker
		          isVisible={this.state.isTimePickerVisible}
		          onConfirm={this._handleDatePicked}
		          onCancel={this._hideDateTimePicker}
		          mode="time"
		        />
						<Divider />
						<View style={styles.viewButtonStyle}>
							<Button 
								title="Save"
								outline={false}
								rounded={true}
								backgroundColor={'#03A9F4'}
								buttonStyle={styles.buttonStyle}
								fontSize={16}
							/>
							<Button
								title="Cancel"
								outline={false}
								rounded={true}
								backgroundColor={'#b74949'}
								buttonStyle={styles.buttonStyle}
								fontSize={16}
							/>
						</View>
					</Card>
				</Modal>
			</View>
		);
	}

	renderAlarms() {
		if(this.props.alarms.length === 0) {
			return (
				<ScrollView>
					{this.renderAddAlarm()}
				</ScrollView>
			);
		} else {
			return(
				<ScrollView>
					{this.renderAddAlarm()}
					{this.renderAlarmsList()}
				</ScrollView>
			);
		}
	}

	render() {
		return(
			<View>
				{this.renderAlarms()}
			</View>
		);
	}
}

function mapStateToProps({ alarms }) {
	return {
		alarms: alarms.alarms
	}
}

const styles = {
	titleStyle: {
		textAlign: 'left',
		fontSize: 20
	},
	containerStyle: {
		borderRadius: 10
	},
	viewStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	viewButtonStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20
	},
	normalTextStyle: {
		fontSize: 18
	},
	buttonStyle: {
		borderColor: 'white',
    borderWidth: 0.5
	},
	timePickerStyle: {
		flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
	},
	buttonContainerStyle: {
		marginBottom: 24
	},
	selectedTextStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center'
	}
}


export default connect(mapStateToProps, actions)(AlarmSettings);