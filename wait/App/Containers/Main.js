import React, {
  Component
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';
import App from '../Components/App';

let store = createStore(reducers);

export default class Main extends Component {
  render() {
    return (<Provider store={store}>
              <App />
            </Provider>);
  }
}