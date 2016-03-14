'use strict';

import React, {
  Component,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

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
    Actions.targetWeightSetup()
  }

  updateWeight(currentWeight) {
    this.props.dispatch({
      type: "SET_START_WEIGHT",
      weight: currentWeight
    });
    this.setState({ currentWeight });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.top}>
          <Text style={styles.pageHeadline}> { this.state.pageHeadline } </Text>
          <TextInput
            style={styles.weightPicker}
            autoFocus = {true}
            selectTextOnFocus = {true}
            enablesReturnKeyAutomatically = {true}
            keyboardType = 'number-pad'
            onChangeText = {(weight) => this.updateWeight.bind(this)(weight)}
            value = {this.state.currentWeight}
            placeholder = "Enter your weight" />
        </ScrollView>
        <ScrollView contentContainerStyle={styles.bottom}>
          <Icon
              onPress={() => this.loadNextPage()}
              name='chevron-right'
              style={styles.nextIcon}/>
          <Text style={styles.pageSubtitle}> { this.state.ctaText } </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  weightPicker: {
    color: '#5F1D7A',
    height: 50,
    fontSize: 30,
    textAlign: 'center',
    borderBottomColor: '#5F1D7A',
    borderBottomWidth: 3
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

export default connect()(WeightSetup);
