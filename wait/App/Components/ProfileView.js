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

export default class ProfileView extends Component {
  render() {
    return (
      <ScrollView style={{marginTop: 60}} contentContainerStyle={styles.stage}>
        <TableView>
          <Section header="Profile">
            <Cell cellstyle="RightDetail" title="Username" detail={this.props.username}/>
            <Cell cellstyle="RightDetail" title="Goal Weight" detail={this.props.goalWeight} onPress={() => console.log('Heyho!')}/>
            <Cell cellstyle="RightDetail" title="Weight Loss Per Week" detail={this.props.weightLossPerWeek} onPress={() => console.log('Heyho!')}/>
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