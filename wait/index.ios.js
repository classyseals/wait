/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from './App/Containers/Main';

class wait extends Component {
  render() {
    return (<Main />);
  }
}

AppRegistry.registerComponent('wait', () => wait);
