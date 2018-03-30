import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, DatePickerIOS } from 'react-native';
import { Card, Icon, Button, Divider } from 'react-native-elements';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomMultiPicker from "react-native-multiple-select-list";

import { connect } from 'react-redux';
import * as actions from '../actions';

var moment = require('moment');

const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


class NewAlarm extends Component {
	state = { 
		isModalVisible: false, 
		isTimePickerVisible: false, 
		chosenTime: new Date(), 
		selected: [], 
		confirmSelected: [], 
		isWeekModalVisible: false 
	};

	addAlarm = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	}

	saveAlarm = () => {
		// add this alarm to props
		console.log("this is save alarm firing");
		this.props.updateAlarms({
			time: this.state.chosenTime,
			days: this.state.confirmSelected
		});
		this.setState({ chosenTime: new Date(), confirmSelected: [], selected: [] });

		this.setState({ isModalVisible: !this.state.isModalVisible });
	}

	hideAlarm = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
		this.setState({ chosenTime: new Date(), confirmSelected: [] });
	}

	addDay = () => {
		this.setState({ isWeekModalVisible: !this.state.isWeekModalVisible });
	}

	saveDay = () => {
		// add this alarm to props
		this.setState({ isWeekModalVisible: !this.state.isWeekModalVisible });
		this.setState({ confirmSelected: this.state.selected });
		this.setState({ selected: [] });
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
  	if(this.state.confirmSelected.length === 0) {
  		return 'No';
  	} else {
  		var abbreviations = [];
  		for(var day of this.state.confirmSelected) {
  			console.log("this is the day", day);
  			abbreviations.push(day.substring(0, 3));
  		}
  		return abbreviations.join(", ");
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

	render() {
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
							<Card
								containerStyle={styles.containerStyle}
							>
								<TouchableOpacity
									onPress={this.addDay}
								>
									<View style={styles.viewStyle}>
										<Text style={styles.normalTextStyle2}>
											Select repeat days for alarm
										</Text>
										<Icon name="plus-circle" size={16} type="font-awesome" />
									</View>
								</TouchableOpacity>
							</Card>
							<Modal isVisible={this.state.isWeekModalVisible}>
								<Card 
									titleStyle={styles.titleStyle} 
									containerStyle={styles.containerStyle}
								>
									<Text style={styles.selectedTextStyle}>
										Select repeat days of week here
									</Text>
									<Divider />
									<View style={{ marginTop: 12 }}>
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
										  selected={this.state.confirmSelected} // list of options which are selected by default 
										/>
									</View>
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
	normalTextStyle2: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		fontSize: 16
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

export default connect(null, actions)(NewAlarm);