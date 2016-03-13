'use strict';

import React, {
	Component,
	View,
	Text,
	ListView
} from 'react-native';

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
		return (<ListView dataSource={this.state.dataSource.cloneWithRows(rows)} renderRow={this.renderRow}/>);
	}
	calculateWeeklyAverage(week, weightRecords, weekGoalWeight) {
		let weeklyWeightRecord = weightRecords.toSeq().slice(week * 7, (week + 1) * 7);
		let sumWeightRecords = weeklyWeightRecord.reduce((sum, weightRecord)=>{ return sum + weightRecord.get('weight') }, 0);
		let average = weeklyWeightRecord.size ? sumWeightRecords/weeklyWeightRecord.size : 0;
		return {average, weekGoalWeight}
	}
	renderRow(data) {
		return (<View>
			<Text>{data.average + " " + data.weekGoalWeight}</Text>
			</View>)
	}
	render() {
		return (<View>
				{this.generateWeeklyGoals(this.props.weightRecords, this.props.goalWeight, this.props.weightLossPerWeek)}
			</View>)
	}
}
