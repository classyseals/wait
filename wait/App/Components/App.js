'use strict';

import React, {
	Component,
	StyleSheet,
	View,
	Text
} from 'react-native';

import ProfileSetup from './ProfileSetup';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  }
});

export default class App extends Component {
	render() {
		return (<View style={styles.appContainer}>
			<ProfileSetup></ProfileSetup>
		</View>);
	}
}
