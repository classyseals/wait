import Immutable from 'immutable';
import {Actions} from 'react-native-router-flux';

const Global = (state = Immutable.Map(), action = {}) => {
  switch(action.type) {
    case Actions.AFTER_ROUTE:
    case Actions.AFTER_POP:
      return state.set('currentRoute', action.name);
    default:
      return state;
  }
}

export default Global;