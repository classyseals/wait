'use strict';

import React, {
  Component,
  View,
  StyleSheet,
  Text,
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

          <Picker
            style={{height: 220, width: 300}}
            itemStyle={styles.text}
            selectedValue={this.state.weight}
            onValueChange={(weight) => this.setState({weight: weight})}>
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
    modal: {
        height: 300,
        width: 300,
        borderRadius: 5,
        flexDirection: 'column'
    },
    text: {
        color: "black",
        fontSize: 22
    },
});