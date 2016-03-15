'use strict';

import React, {
  Component,
  View,
  Text,
  ListView,
  StyleSheet
} from 'react-native';

import NumberUtils from '../Utils/NumberUtils';

export default class TableView extends Component {

  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  generateWeeklyGoals(weightRecords, goalWeight, weightLossPerWeek) {
    let startWeight = weightRecords.get(weightRecords.size - 1).get('weight');
    let weightDiff = startWeight - goalWeight;
    let numWeeks = Math.ceil(weightDiff/weightLossPerWeek);
    let rows = [];
    for(let i = 0; i < numWeeks; i++) {
      rows.push(this.calculateWeeklyAverage(i, this.props.weightRecords, startWeight - weightLossPerWeek * (i + 1)));
    }
    return (<ListView dataSource={this.state.dataSource.cloneWithRows(rows)} renderRow={this.renderRow} renderHeader={this.renderHeader}/>);
  }

  calculateWeeklyAverage(week, weightRecords, weekGoalWeight) {
    let weeklyWeightRecord = weightRecords.toSeq().slice(week * 7, (week + 1) * 7);
    let sumWeightRecords = weeklyWeightRecord.reduce((sum, weightRecord)=>{ return sum + Number(weightRecord.get('weight')) }, 0);
    let average = weeklyWeightRecord.size ? sumWeightRecords/weeklyWeightRecord.size : 0;
    return {week: week + 1, average, weekGoalWeight}
  }

  renderHeader() {
    return (<View style={[styles.row, {borderTopWidth: 0.5}]}>
              <View style={[{flex: 1}, styles.cellWeek]}><Text style={styles.text}>#</Text></View>
              <View style={[{flex: 3}, styles.cell]}><Text style={styles.text}>Current</Text></View>
              <View style={[{flex: 3}, styles.cell]}><Text style={styles.text}>Goal</Text></View>
            </View>)
  }

  renderRow(data) {
    let background = data.week % 2 === 0 ? styles.rowLight: styles.rowDark;
    let text = data.week % 2 === 0 ? styles.text: styles.textLight;
    let formattedAverage = NumberUtils.removeTrailingZeroes(
          NumberUtils.truncateDecimals(data.average, 2));
    let formattedGoalWeight = NumberUtils.removeTrailingZeroes(
          NumberUtils.truncateDecimals(data.weekGoalWeight, 2));
    return (<View style={styles.row}>
              <View style={[{flex: 1},styles.cellWeek, background]}>
                <Text style={text}>{data.week}</Text>
              </View>
              <View style={[{flex: 3}, styles.cell, background]}>
                <Text style={text}>{formattedAverage}</Text>
              </View>
              <View style={[{flex: 3}, styles.cell, background]}>
                <Text style={text}>{formattedGoalWeight}</Text>
              </View>
            </View>);
  }

  render() {
    return (<View style={styles.container}>
              {this.generateWeeklyGoals(this.props.weightRecords, this.props.goalWeight, this.props.weightLossPerWeek)}
            </View>)
  }
}

var styles = StyleSheet.create({
    container: {
      marginTop: 65,
      flex: 1,
      marginBottom: 50
    },
    rowDark: {
      backgroundColor: 'grey'
    },
    rowLight: {
      backgroundColor: 'white'
    },
    row: {
      borderBottomWidth: 0.5,
      borderRadius: 1,
      borderColor: 'black',
      flexDirection: 'row'
    },
    cellWeek: {
      borderRightWidth: 0.5,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center'
    },
    cell: {
      borderRightWidth: 0.5,
      paddingLeft: 10,
      paddingRight: 10,
      borderColor: 'black',
      justifyContent: 'center'
    },
    header: {
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    text: {
        color: "black",
        fontSize: 22
    },
    textLight: {
        color: "white",
        fontSize: 22
    },
});