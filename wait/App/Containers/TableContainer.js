import TableView from '../Components/TableView';
import {connect} from 'react-redux';

const TableContainer = connect((state)=>{
  return {
    weightRecords: state.UserDataReducer.get('weightRecords'),
    weightLossPerWeek: state.UserDataReducer.get('weightLossPerWeek'),
    goalWeight: state.UserDataReducer.get('goalWeight')
  }
})(TableView);

export default TableContainer;