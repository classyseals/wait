'use strict';

import React, {
	Component,
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  top: {
  	flex: 1,
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
  	fontSize: 50,
  	marginBottom: 20
  },
  pageSubtitle: {
  	textAlign: 'justify',
  	fontSize: 20,
  	marginBottom: 20
  },
  nextIcon: {
  	fontSize: 100,
  	color: '#ffffff',
  	backgroundColor: '#5F1D7A',
  	borderRadius: 50,
  	textAlign: 'center'
  }
});

class ProfileSetup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageHeadline: 'What is your current weight?',
			pageSubtitle: 'All meaningful goals are met one step at a time. ' +
										'Reach your ideal weight by keeping track of your ' +
										'progress and adjusting your effort based on your ' +
										'results each week.',
			ctaText: 'Create your profile'
		};
	}

	loadNextPage() {
		Actions.tabbar()
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.top}>
					<Text style={styles.pageHeadline}> { this.state.pageHeadline } </Text>
					<Text style={styles.pageSubtitle}> { this.state.pageSubtitle } </Text>
				</View>
				<View style={styles.bottom}>
					<Text style={styles.pageSubtitle}> { this.state.ctaText } </Text>
					<Icon
							onPress={() => this.loadNextPage()}
							name='chevron-right'
							style={styles.nextIcon}/>
				</View>
			</View>
		);
	}
}

export default ProfileSetup;
