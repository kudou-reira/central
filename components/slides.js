import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
	renderLastSlide(index) {
		if(index === this.props.data.length - 1) {
			return(
				<Button 
					title="Onwards!"
					rounded={true}
					backgroundColor={'#03A9F4'}
					onPress={this.props.onComplete}
					icon={{name: 'arrow-right', type: 'font-awesome'}}
					containerViewStyle={{marginBottom: 16, marginTop: 18 }}
					buttonStyle={styles.buttonStyle}
				/>
			);
		}
	}

	renderSlides() {
		return this.props.data.map((slide, index) => {
			return(
				<View
					key={slide.text}
					style={[styles.slideStyle, { backgroundColor: slide.color }]}
				>
					<Text style={styles.textStyle}>
						{slide.text}
					</Text>
					{this.renderLastSlide(index)}
				</View>
			);
		});
	}

	render() {
		return(
			<ScrollView
				horizontal
				pagingEnabled
			>
				{this.renderSlides()}
			</ScrollView>
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
    paddingLeft: 18,
    paddingRight: 18
  },
  buttonStyle: {
    shadowOpacity: 0.4,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 }
  }
};

export default Slides;