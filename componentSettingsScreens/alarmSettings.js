import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, DatePickerIOS } from 'react-native';
import { Card, Icon, Button, Divider, ButtonGroup } from 'react-native-elements';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomMultiPicker from "react-native-multiple-select-list";

import NewAlarm from '../components/newAlarm';
import SavedAlarms from '../components/savedAlarms';

import { connect } from 'react-redux';
import * as actions from '../actions';

var moment = require('moment');

// https://docs.expo.io/versions/latest/sdk/audio.html
// https://facebook.github.io/react-native/docs/vibration.html
// https://docs.expo.io/versions/latest/sdk/notifications.html#exponotificationsschedulelocalnotificationasynclocalnotification-schedulingoptions

class AlarmSettings extends Component {
	static navigationOptions = {
		title: 'Alarm Settings',
		tabBarIcon: ({ tintColor }) => <Icon name="alarm" size={30} color={tintColor} />
	}

	renderAlarms() {
		if(this.props.alarms.length === 0) {
			return (
				<ScrollView>
					<NewAlarm />
				</ScrollView>
			);
		} else {
			return(
				<ScrollView>
					<SavedAlarms alarms={this.props.alarms} />
					<NewAlarm />
				</ScrollView>
			);
		}
	}

	render() {
		console.log("props of alarm settings", this.props);
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

export default connect(mapStateToProps, actions)(AlarmSettings);