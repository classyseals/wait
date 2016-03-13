'use strict';

import React, {
  Component,
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  Cell,
  CustomCell,
  Section,
  TableView
} from 'react-native-tableview-simple';

import {Actions} from 'react-native-router-flux';

export default class ProfileView extends Component {
  selectGoalWeight() {
    let _this = this;
    Actions.weightPicker({
      currentWeight: _this.props.goalWeight, 
      closePicker: (weight)=>{
        _this.props.dispatch({
          type: "CHANGE_GOAL_WEIGHT",
          weight
        })
      }})
  }
  selectWeightLoss() {
    let _this = this;
    Actions.weightPicker({
      currentWeight: _this.props.weightLossPerWeek, 
      range: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2],
      closePicker: (weight)=>{
        _this.props.dispatch({
          type: "CHANGE_WEIGHT_LOSS_PER_WEEK",
          weight
        })
      }})
  }
  render() {
    return (
      <ScrollView style={{marginTop: 60}} contentContainerStyle={styles.stage}>
        <TableView>
          <Section header="Profile">
            <Cell cellstyle="RightDetail" title="Username" detail={this.props.username}/>
            <Cell cellstyle="RightDetail" title="Goal Weight" detail={this.props.goalWeight} onPress={ this.selectGoalWeight.bind(this) }/>
            <Cell cellstyle="RightDetail" title="Weight Loss Per Week" detail={this.props.weightLossPerWeek} onPress={this.selectWeightLoss.bind(this)}/>
          </Section>
        </TableView>
      </ScrollView>)
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
});