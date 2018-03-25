import React, { Component } from 'react';
import { View, Text, Platform, AsyncStorage } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SettingsScreen extends Component {
	static navigationOptions = {
		header: {
			style: {
				marginTop: Platform.OS === 'android' ? 24 : 0
			}
		},
		title: 'Settings',
		tabBarIcon: ({ tintColor }) => <Icon name="cogs" size={30} color={tintColor} type="font-awesome" />
	}

	logout = () => {
		// do logout logic here
		console.log("logout clicked");
		AsyncStorage.removeItem('token');
		AsyncStorage.removeItem('expires');
		AsyncStorage.removeItem('type');

		this.props.logoutUser();
		this.props.navigation.navigate('auth');
	}

	renderSampleButton() {
		return(
			<View>
				<Button 
					title="Temporary logout"
					large
					rounded
					icon={{ name: 'delete-forever' }}
					backgroundColor="#F44336"
					buttonStyle={styles.buttonStyle}
					onPress={this.logout}
				/>
			</View>
		);
	}

	renderCurrentUser() {
		console.log("this is props type", this.props.type);
		console.log("this is props token", this.props.token);
		if(this.props.type.length > 0 && this.props.token.length > 0) {
			return(
				<View>
					<Text style={styles.textStyle}>
						Current Login Type: {this.props.type}
					</Text>
					<View>
						<Button 
							title="Logout"
							rounded
							large
							icon={{ name: 'delete-forever' }}
							backgroundColor="#F44336"
							onPress={this.logout}
							buttonStyle={styles.buttonStyle}
						/>
					</View>
				</View>
			);
		} else {
			return(
				<View>
					<Text style={styles.textStyle}>
						You are not logged in! Your data is persisted only on device, and not in a database!
					</Text>
					{this.renderSampleButton()}
				</View>
			);
		}
	}

	render() {
		return(
			<View style={styles.containerStyle}>
				{this.renderCurrentUser()}
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		marginTop: 40
	},
	textStyle: {
		marginLeft: 24,
		marginRight: 24,
		marginBottom: 40,
		fontSize: 22
	},
	buttonStyle: {
    borderColor: 'white',
    borderWidth: 0.5
  }
}

function mapStateToProps({ auth }) {
	return {
		token: auth.token,
		type: auth.type,
		expires: auth.expires
	}
}

export default connect(mapStateToProps, actions)(SettingsScreen);