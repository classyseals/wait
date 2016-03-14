'use strict';

import React, {
  Component,
  View,
  StyleSheet,
  Text,
  TextInput,
  Picker,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import Immutable from 'immutable';

let selectableWeights = Immutable.Range(1,500).toArray();

export default class WeightPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      weight: props.currentWeight,
      range: (props.range || selectableWeights)
    }
  }
  componentWillMount(){
    this.setState({isOpen: true});
  }
  componentWillReceiveProps(props){
    this.setState({weight: props.currentWeight, range: (props.range || selectableWeights)});
  }
  closePicker(){
    this.props.closePicker(this.state.weight);
    Actions.pop();
  }
  updateWeight(weight){
    this.setState({weight});
  }
  render() {
    let weights = this.state.range.map((weight, index)=>{    
      return (<Picker.Item key={index} label={weight.toString()} value={weight} />)
    });

    return (
      <Modal animationDuration={200}
             swipeThreshold={100}
             style={styles.modal} 
             position={"center"} 
             isOpen={this.state.isOpen}
             onClosed={this.closePicker.bind(this)}
             swipeToClose={false}>
          <View style={styles.header}>
            <Text style={styles.text}>Select Weight</Text>
          </View>
          <TextInput
            style={styles.weightPicker}
            enablesReturnKeyAutomatically = {true}
            keyboardType = 'number-pad'
            onChangeText = {(weight) => this.updateWeight.bind(this)(weight)}
            value = { this.state.weight.toString() }
            placeholder = "Enter goal weight"/>

          <Picker
            style={{height: 220, width: 300}}
            itemStyle={styles.text}
            selectedValue={Number(this.state.weight)}
            onValueChange={(weight) => { this.setState({weight: weight})}}>
            {weights}
          </Picker>

          <View style={styles.footer}>
            <TouchableOpacity onPress={this.closePicker.bind(this)}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
      </Modal>
    );
  }
}

var styles = StyleSheet.create({
    header: {
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    footer: {
      padding: 10,
      marginRight: 5,
      alignItems: 'flex-end',
    },
    weightPicker: {
      color: '#5F1D7A',
      height: 50,
      fontSize: 30,
      textAlign: 'center',
      borderBottomColor: '#5F1D7A',
      borderBottomWidth: 3
    },
    modal: {
        height: 350,
        width: 300,
        borderRadius: 5,
        flexDirection: 'column'
    },
    text: {
        color: "black",
        fontSize: 22
    },
});