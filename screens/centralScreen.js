import React, { Component } from 'react';
import { View, Text } from 'react-native';

class CentralScreen extends Component {
	render() {
		return(
			<View style={styles.containerStyle}>
				<Text>
					This is the central screen
				</Text>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		marginTop: 24
	}
}

export default CentralScreen;