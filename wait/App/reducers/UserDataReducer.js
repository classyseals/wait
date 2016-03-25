import Immutable from 'immutable';
import moment from 'moment';

const initialState = Immutable.fromJS({
	username: 'not andrade',
	goalWeight: 0,
	weightRecords: [],
	weightLossPerWeek: 0.5
});

const UserData = (state = initialState, action = {}) => {
  switch(action.type) {
  	case "CHANGE_WEIGHT_LOSS_PER_WEEK":
  		return state.set('weightLossPerWeek', Number(action.weight));
  	case "CHANGE_GOAL_WEIGHT":
  		return state.set('goalWeight', Number(action.weight));
    case "SET_START_WEIGHT":
      return state.update('weightRecords', (weightRecords) => {
        return weightRecords.set(weightRecords.size - 1, Immutable.fromJS({date: moment().valueOf(), weight: Number(action.weight)}));
      });
  	case "ADD_WEIGHT":
  		return state.update('weightRecords', (weightRecords) =>
        weightRecords.unshift(Immutable.fromJS(action.weightRecord)));
    default:
      return state;
  }
}

export default UserData;