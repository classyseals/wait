import Immutable from 'immutable';

const initialState = Immutable.fromJS({
	username: 'not andrade',
	goalWeight: 0,
	weightRecords: [
		{date: 1, weight: 9},
		{date: 2, weight: 10},
		{date: 3, weight: 9},
		{date: 4, weight: 11}
	],
	weightLossPerWeek: 0.5
});

const UserData = (state = initialState, action = {}) => {
  switch(action.type) {
  	case "CHANGE_WEIGHT_LOSS_PER_WEEK":
  		return state.set('weightLossPerWeek', action.weight);
  	case "CHANGE_GOAL_WEIGHT":
  		return state.set('goalWeight', action.weight);
  	case "ADD_WEIGHT":
  		return state.update('weightRecords', (weightRecords)=>weightRecords.unshift(Immutable.fromJS(action.weightRecord)));
    default:
      return state;
  }
}

export default UserData;