import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SettingsScreen extends Component {
	static navigationOptions = {
		header: {
			style: {
				marginTop: Platform.OS === 'android' ? 24 : 0
			}
		}
	}

	logout = () => {
		// do logout logic here
	}

	render() {
		return(
			<View style={styles.containerStyle}>
				<Button 
					title="Logout"
					large
					icon={{ name: 'delete-forever' }}
					backgroundColor="#F44336"
					onPress={this.logout}
				/>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		marginTop: 24
	}
}


export default connect(null, actions)(SettingsScreen);