import ChartView from '../Components/ChartView';
import {connect} from 'react-redux';

const ChartContainer = connect((state)=>{
  return {
    weightRecords: state.UserDataReducer.get('weightRecords'),
    weightLossPerWeek: state.UserDataReducer.get('weightLossPerWeek'),
    goalWeight: state.UserDataReducer.get('goalWeight')
  }
})(ChartView);

export default ChartContainer;