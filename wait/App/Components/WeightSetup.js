'use strict';

import React, {
	Component,
	View,
	Text,
	StyleSheet,
	TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  weightPicker: {
  	color: '#5F1D7A',
  	height: 50,
  	textAlign: 'center'
  },
  top: {
  	flex: 2,
  	padding: 30,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  bottom: {
  	flex: 1,
  	padding: 30,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  pageHeadline: {
  	textAlign: 'center',
  	color: '#5F1D7A',
  	fontSize: 30,
  	marginBottom: 20
  },
  nextIcon: {
  	fontSize: 50,
  	color: '#ffffff',
  	backgroundColor: '#5F1D7A',
  	borderRadius: 25,
  	textAlign: 'center'
  }
});

class WeightSetup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageHeadline: 'What is your current weight?',
			ctaText: 'Next',
			currentWeight: ''
		};
	}

	loadNextPage() {
		Actions.tabbar()
	}

	updateWeight(currentWeight) {
		console.log("new weight:" + currentWeight);
		this.setState({ currentWeight });
	}

	render() {
		const possibleNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		return (
			<View style={styles.container}>
				<View style={styles.top}>
					<Text style={styles.pageHeadline}> { this.state.pageHeadline } </Text>
					<TextInput
						style={styles.weightPicker}
						autoFocus = {true}
					  keyboardType = 'numeric'
					  onChangeText = {(weight) => this.updateWeight(weight)}
					  value = {this.state.currentWeight}
					  placeholder = "Enter your weight"
					/>
				</View>
				<View style={styles.bottom}>
					<Icon
							onPress={() => this.loadNextPage()}
							name='chevron-right'
							style={styles.nextIcon}/>
					<Text style={styles.pageSubtitle}> { this.state.ctaText } </Text>
				</View>
			</View>
		);
	}
}

export default WeightSetup;
