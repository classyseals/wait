'use strict';

import React, {
  Component,
  View,
  Text,
  Navigator
} from 'react-native';

import ReactNativeRouter, {Route, Schema, Animations, TabBar} from 'react-native-router-flux';
import {connect} from 'react-redux';
import ChartContainer from '../Containers/ChartContainer';
import TableContainer from '../Containers/TableContainer';
import ProfileView from './ProfileView';

const Router = connect()(ReactNativeRouter.Router);

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

export default class App extends Component {
  render() {
    return (
      <Router hideNavBar={true}>
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="withoutAnimation"/>
        <Schema name="tab" type="switch" icon={TabIcon} />
        <Route name="tabbar">
            <Router footer={TabBar} hideNavBar={true} tabBarStyle={{borderTopColor:'#00bb00',borderTopWidth:1,backgroundColor:'white'}}>
                <Route name="chartView" schema="tab" title="Chart" component={ChartContainer} />
                <Route name="tableView" schema="tab" title="Table" component={TableContainer} />
                <Route name="profileView" schema="tab" title="Profile" component={ProfileView} />
            </Router>
        </Route>
      </Router>)
  }
}