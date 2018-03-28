import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, DatePickerIOS } from 'react-native';
import { Card, Icon, Button, Divider, ButtonGroup } from 'react-native-elements';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomMultiPicker from "react-native-multiple-select-list";

import { connect } from 'react-redux';
import * as actions from '../actions';

var moment = require('moment');

const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// https://docs.expo.io/versions/latest/sdk/audio.html
// https://facebook.github.io/react-native/docs/vibration.html
// https://docs.expo.io/versions/latest/sdk/notifications.html#exponotificationsschedulelocalnotificationasynclocalnotification-schedulingoptions

class AlarmSettings extends Component {
	static navigationOptions = {
		title: 'Alarm Settings',
		tabBarIcon: ({ tintColor }) => <Icon name="alarm" size={30} color={tintColor} />
	}

	state = { isModalVisible: false, isTimePickerVisible: false, chosenTime: new Date(), selected: [], isWeekModalVisible: false };

	addAlarm = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	}

	saveAlarm = () => {
		// add this alarm to props
		this.setState({ isModalVisible: !this.state.isModalVisible });
	}

	hideAlarm = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
		this.setState({ chosenTime: new Date() });
	}

	addDay = () => {
		this.setState({ isWeekModalVisible: !this.state.isWeekModalVisible });
	}

	saveDay = () => {
		// add this alarm to props
		this.setState({ isWeekModalVisible: !this.state.isWeekModalVisible });
	}

	hideDay = () => {
		this.setState({ isWeekModalVisible: !this.state.isWeekModalVisible });
		// save days of week selected
	}

  setTime = (newTime) => {
  	console.log("this is new time", newTime);
  	this.setState({ chosenTime: newTime });
  }

  setDays = (day) => {
  	console.log("this is day", day);
  	this.setState({ selected: day });
  }


  onWeekButtonPress = (day) => {
  	console.log("this is on weekButton Press", day);
  }

  renderRepeatDays() {
  	if(this.state.selected.length === 0) {
  		return 'No';
  	}
  }

  renderSelectedTime() {
  	return(
  		<View>
	  		<View style={styles.viewGapStyle}>
	  			<Text style={styles.prominentTextStyle}>
	  				Currently selected time:
	  			</Text>
	  			<Text style={styles.prominentTextStyle}>
	  				{moment(this.state.chosenTime, 'HH:mm:ss').format("HH:mm")}
	  			</Text>
	  		</View>
	  		<View style={styles.viewGapStyle}>
	  			<Text style={styles.prominentTextStyle}>
	  				Repeat:
	  			</Text>
	  			<Text style={styles.prominentTextStyle}>
	  				{this.renderRepeatDays()}
	  			</Text>
	  		</View>
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
						</View>
						<Divider />
						 <DatePickerIOS
		          date={this.state.chosenTime}
		          onDateChange={this.setTime}
		          mode="time"
		        />
						<Divider />
							<Button
								title="Select repeat days for alarm"
								containerViewStyle={styles.spacedViewStyle}
								rounded
								fontSize={14}
								onPress={this.addDay}
							/>
							<Modal isVisible={this.state.isWeekModalVisible}>
								<Card 
									titleStyle={styles.titleStyle} 
									containerStyle={styles.containerStyle}
								>
									<Text style={styles.selectedTextStyle}>
										Select days of week here
									</Text>
									<Divider />
									<CustomMultiPicker
									  options={week}
									  search={false} // should show search bar? 
									  multiple={true} // 
									  returnValue={"label"} // label or value 
									  callback={this.setDays} // callback, array of selected items 
									  rowBackgroundColor={"#eee"}
									  rowHeight={40}
									  rowRadius={5}
									  iconColor={"#00a2dd"}
									  iconSize={30}
									  selectedIconName={"ios-checkmark-circle-outline"}
									  unselectedIconName={"ios-radio-button-off-outline"}
									  scrollViewHeight={340}
									  selected={this.state.selected} // list of options which are selected by default 
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
											onPress={this.saveDay}
										/>
										<Button
											title="Cancel"
											outline={false}
											rounded={true}
											backgroundColor={'#b74949'}
											buttonStyle={styles.buttonStyle}
											fontSize={16}
											onPress={this.hideDay}
										/>
									</View>
								</Card>
							</Modal>
						<Divider/>
						<View style={styles.viewButtonStyle}>
							<Button 
								title="Save"
								outline={false}
								rounded={true}
								backgroundColor={'#03A9F4'}
								buttonStyle={styles.buttonStyle}
								fontSize={16}
								onPress={this.saveAlarm}
							/>
							<Button
								title="Cancel"
								outline={false}
								rounded={true}
								backgroundColor={'#b74949'}
								buttonStyle={styles.buttonStyle}
								fontSize={16}
								onPress={this.hideAlarm}
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
	viewGapStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 4
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
		textAlign: 'center',
		fontSize: 18
	},
	prominentTextStyle: {
		fontSize: 18
	},
	weekButtonStyle: {
		width:50
	},
	spacedViewStyle: {
		marginTop: 10,
		marginBottom: 10
	}
}


export default connect(mapStateToProps, actions)(AlarmSettings);