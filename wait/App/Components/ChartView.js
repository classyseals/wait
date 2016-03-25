import React, { StyleSheet, View, Component } from 'react-native';
import { LineChart } from 'react-native-ios-charts';
import moment from 'moment';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    chart: {
        position: 'absolute',
        top: 65,
        left: 4,
        bottom: 55,
        right: 16,
    }
});


const xLabels = ['0','1','2','3','4','5','6','7','8','9','10','11'];

export default class ChartView extends Component {
    constructor(props) {
        super(props);
        const chartData = {
          dataSets: [{
            values: [0],
            drawValues: false,
            colors: ['rgb(199, 255, 140)'],
            label: 'progress',
            drawCubic: true,
            drawCircles: false,
            lineWidth: 2
          }, {
            values: [0],
            drawValues: false,
            colors: ['rgb(255, 0, 0)'],
            label: 'Goal',
            drawCubic: true,
            drawCircles: false,
            lineWidth: 2
          }],
          backgroundColor: 'transparent',
          labels: ['Jan', 'Feb', 'Mar'],
          minOffset: 20,
          scaleYEnabled: false,
          legend: {
            textSize: 12
          },
          xAxis: {
            axisLineWidth: 0,
            drawLabels: true,
            position: 'bottom',
            drawGridLines: false
          },
          leftAxis: {
            customAxisMax: 1,
            customAxisMin: -1,
            labelCount: 11,
            startAtZero: false,
            spaceTop: 0.1,
            spaceBottom: 0.1
          },
          rightAxis: {
            enabled: false,
            drawGridLines: false
          },
          valueFormatter: {
            minimumSignificantDigits: 1,
            type: 'regular',
            maximumDecimalPlaces: 1
          }
        };
        this.state = {
          chartData
        }
        this.componentWillReceiveProps(props);
    }
    componentWillReceiveProps(props) {
      let progressData = props.weightRecords.map((weightRecord)=> {
        return weightRecord.get('weight');
      });
      const startWeight = props.weightRecords.get(props.weightRecords.size - 1).get('weight');
      const weightDiff = startWeight - props.goalWeight;
      const numWeeks = Math.ceil(weightDiff/props.weightLossPerWeek);
      const daysUntilGoal = numWeeks * 7;
      const startDate = moment(props.weightRecords.get(props.weightRecords.size - 1).get('date'));

      let datesLabel = [startDate.format("MM/DD")];
      for(let i = 0; i < daysUntilGoal; i++) {
        datesLabel.push(moment(startDate).add(i, 'days').format("MM/DD"));
      }

      let targetGoalValues = [];
      let currentWeight = startWeight;
      for(let i = 0; i < daysUntilGoal; i++) {
        targetGoalValues.push(currentWeight -= (props.weightLossPerWeek/7));
      }

      const chartData = {
        dataSets: [{
          values: progressData.toArray().reverse() || [0],
          drawValues: false,
          colors: ['rgb(0, 255, 0)'],
          label: 'progress',
          drawCubic: false,
          drawCircles: true,
          lineWidth: 2
        }, {
          values: targetGoalValues,
          drawValues: false,
          colors: ['rgb(255, 0, 0)'],
          label: 'Goal',
          drawCubic: false,
          drawCircles: false,
          lineWidth: 2
        }],
        backgroundColor: 'transparent',
        labels: datesLabel,
        minOffset: 20,
        scaleYEnabled: false,
        legend: {
          textSize: 12
        },
        xAxis: {
          axisLineWidth: 1,
          drawLabels: true,
          position: 'bottom',
          drawGridLines: true
        },
        leftAxis: {
          customAxisMax: 1,
          customAxisMin: -1,
          labelCount: 11,
          startAtZero: false,
          spaceTop: 0.1,
          spaceBottom: 0.1
        },
        rightAxis: {
          enabled: false,
          drawGridLines: false
        },
        valueFormatter: {
          minimumSignificantDigits: 1,
          type: 'regular',
          maximumDecimalPlaces: 1
        }
      };
      this.state = {
        chartData
      };
    }
    render() {
      
      return (
        <LineChart config={this.state.chartData} style={styles.container}/>
      );
    }
}