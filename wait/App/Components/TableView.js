'use strict';

import React, {
	Component,
	View,
	Text,
	Navigator
} from 'react-native';

export default class TableView extends Component {
	generateWeeklyGoals(weightRecords, goalWeight, weightLossPerWeek) {
		let startWeight = weightRecords.get(weightRecords.size - 1).get('weight');
		let weightDiff = startWeight - goalWeight;
		let numWeeks = Math.ceil(weightDiff/weightLossPerWeek);
		let rows = [];
		for(let i = 0; i < numWeeks; i++) {
			rows.push(this.renderWeeklyAverage(i, this.props.weightRecords, startWeight - weightLossPerWeek * (i + 1)));
		}
		return (rows);
	}
	renderWeeklyAverage(week, weightRecords, weekGoalWeight) {
		let weeklyWeightRecord = weightRecords.toSeq().slice(week * 7, (week + 1) * 7);
		let sumWeightRecords = weeklyWeightRecord.reduce((sum, weightRecord)=>{ return sum + weightRecord.get('weight') }, 0);
		let average = weeklyWeightRecord.size ? sumWeightRecords/weeklyWeightRecord.size : 0;
		return (<View><Text>{average}</Text><Text>{weekGoalWeight}</Text></View>)

	}
	render() {
		return (<View>
				{this.generateWeeklyGoals(this.props.weightRecords, this.props.goalWeight, this.props.weightLossPerWeek)}
			</View>)
	}
}
