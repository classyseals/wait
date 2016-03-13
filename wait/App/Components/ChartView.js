import React, { StyleSheet, View, Component } from 'react-native';
import RNChart from 'react-native-chart';

const styles = StyleSheet.create({
    container: {
        flex: 1,
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


const xLabels = ['0','1','2','3','4','5'];

export default class ChartView extends Component {
    constructor(props) {
        super(props);
        this.componentWillReceiveProps(props);
    }
    componentWillReceiveProps(props) {
    	let progressData = props.weightRecords.map((weightRecord)=> {
    	  return weightRecord.get('weight');
    	});

    	let chartData = [
    	    {
    	        name: 'Progress',
    	        color: 'gray',
    	        lineWidth: 2,
    	        highlightIndices: [1,2,3,4],
    	        highlightColor: 'orange',
    	        showDataPoint: true,
    	        data: progressData.toArray().reverse(),
    	    },
    	    {
    	        name: 'Goal',
    	        color: 'red',
    	        lineWidth: 2,
    	        data: [props.weightRecords.get(props.weightRecords.size - 1).get('weight'), 0, 0, props.goalWeight],
    	    }
    	];
    	this.state = ({
    	  chartData
    	});
    }
    render() {
        return (
            <View style={styles.container}>
                <RNChart style={styles.chart}
                    chartData={this.state.chartData}
                    verticalGridStep={10}
                    tightBounds={true}
                    xLabels={xLabels}
                 />
            </View>
        );
    }
}