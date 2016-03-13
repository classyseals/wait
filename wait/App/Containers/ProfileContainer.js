import ProfileView from '../Components/ProfileView';
import {connect} from 'react-redux';

const ProfileContainer = connect((state)=>{
  return {
  	username: state.UserDataReducer.get('username'),
    weightRecords: state.UserDataReducer.get('weightRecords'),
    weightLossPerWeek: state.UserDataReducer.get('weightLossPerWeek'),
    goalWeight: state.UserDataReducer.get('goalWeight')
  }
})(ProfileView);

export default ProfileContainer;