import React, { Component } from 'react';
import { View, Text, AsyncStorage, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class AuthScreen extends Component {
	componentDidMount() {
		// AsyncStorage.removeItem('token');
		// AsyncStorage.removeItem('expires');
		// AsyncStorage.removeItem('type');

		// this.props.facebookLogin();
		// this.onAuthComplete(this.props);
	}

	componentWillReceiveProps(nextProps) {
		console.log("this is props in component will receive props", nextProps)
		this.onAuthComplete(nextProps);
	}

	onAuthComplete(props) {
		console.log("this is props in onAuthComplete", props);
		if(props.token) {
			this.props.navigation.navigate('hub');
		}
	}

	onFacebookButton = () => {
		this.props.facebookLogin();
		this.onAuthComplete(this.props);
	}

	onGoogleButton = () => {
		console.log("on google button pressed");
		this.props.googleLogin();
		this.onAuthComplete(this.props);
	}

	onNoLogin = () => {
		this.props.navigation.navigate('hub');
	}


	renderButtons() {
		return(
			<View>
				<Button 
					title="Login with Facebook"
					outline={false}
					rounded={true}
					backgroundColor={'#2f3e7c'}
					onPress={this.onFacebookButton}
					icon={{name: 'facebook', type: 'font-awesome'}}
					containerViewStyle={styles.containerStyle}
					buttonStyle={styles.buttonStyle}
				/>
				<Button 
					title="Login with Google"
					outline={false}
					rounded={true}
					backgroundColor={'#b74949'}
					onPress={this.onGoogleButton}
					icon={{name: 'google', type: 'font-awesome'}}
					containerViewStyle={styles.containerStyle}
					buttonStyle={styles.buttonStyle}
				/>
			</View>
		);
	}

	renderNoLogin() {
		return(
			<View>
				<Button 
					title="Continue without logging in!"
					outline={false}
					rounded={true}
					backgroundColor={'#645796'}
					onPress={this.props.onNoLogin}
					icon={{name: 'arrow-right', type: 'font-awesome'}}
					containerViewStyle={styles.containerStyle}
					buttonStyle={styles.buttonStyle}
				/>
			</View>
		);
	}

	renderLayout() {
		return(
			<View>
				<Text style={styles.textStyle}>
					Before we get started, please login with one of the options below:
				</Text>
				{this.renderButtons()}
				{this.renderNoLogin()}
			</View>
		);
	}

	render() {
		return(
			<View style={[styles.slideStyle, { backgroundColor: '#03A9F4' }]}>
				{this.renderLayout()}
			</View>
		);
	}
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: 'white',
    marginBottom: 24
  },
  buttonStyle: {
    borderColor: 'white',
    borderWidth: 0.5
  }, 
  containerStyle: {
  	marginBottom: 12
  }
};

function mapStateToProps({ auth }) {
	return {
		token: auth.token
	}
}

export default connect(mapStateToProps, actions)(AuthScreen);