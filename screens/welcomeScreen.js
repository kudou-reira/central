import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import CentralScreen from '../screens/centralScreen';
import Slides from '../components/slides';

const SLIDE_DATA = [
	{ text: 'Welcome to Central!', color: '#03A9F4' },
	{ text: 'Use this app to access various convenient features', color: '#5cb587'}
];

class WelcomeScreen extends Component {
	state = { token: null };

	async componentWillMount() {
		// AsyncStorage.removeItem('token');
		// AsyncStorage.removeItem('expires');
		// AsyncStorage.removeItem('type');

		// first check if token is valid by checking type
		// get type first, then do the flow of validation
		let type = await AsyncStorage.getItem('type');
		// if type doesn't exist, then do the oauth flow i guess

		let token = await AsyncStorage.getItem('token');

		if(token) {
			this.props.navigation.navigate('central');
			this.setState({ token });
		} else {
			this.setState({ token: false });
		}
	}

	onSlidesComplete() {
		this.props.navigation.navigate('auth');
	}

	render() {
		if(_.isNull(this.state.token)) {
			return <AppLoading />;
		}

		return(
			<View style={{ flex: 1 }}>
				<Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)} />
			</View>
		);
	}
}

export default WelcomeScreen;