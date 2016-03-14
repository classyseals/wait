'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableOpacity
} from 'react-native';

import ReactNativeRouter, {Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import ChartContainer from '../Containers/ChartContainer';
import TableContainer from '../Containers/TableContainer';
import ProfileContainer from '../Containers/ProfileContainer';
import WeightSetup from './WeightSetup';
import TargetWeightSetup from './TargetWeightSetup';
import WeightPicker from './Modals/WeightPicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Router = connect()(ReactNativeRouter.Router);

class TabIcon extends React.Component {
    render(){
        let color = {color: this.props.selected ? 'red' :'black'};
        return (
            <View style={styles.iconContainer}>
              <Icon name={this.props.iconName} style={[color, styles.icon]}/>
              <Text style={[color, styles.iconText]}>{this.props.title}</Text>
            </View>
        );
    }
}

class App extends Component {
  renderRightButton() {
    let _this = this;
    return (<TouchableOpacity 
              style={styles.addIconContainer}
              onPress={()=>{
                Actions.weightPicker({
                  currentWeight: (_this.props.weightRecords.get(0).get('weight') || 0),
                  closePicker: (weight)=>{
                    _this.props.dispatch(
                      {
                        type: 'ADD_WEIGHT',
                        weightRecord: {
                          date: 0,
                          weight
                        }
                      })
                  }
                })
              }}>
              <Icon 
                style={styles.addIcon}
                name="add" />
            </TouchableOpacity>)
  }

  render() {
    return (
      <Router hideNavBar={true}>
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="withoutAnimation"/>
        <Schema name="tab" type="switch" icon={TabIcon}/>
        <Route name="weightSetup" component={WeightSetup} />
        <Route name="targetWeightSetup" component={TargetWeightSetup} />
        <Route name="weightPicker" schema="modal" component={WeightPicker} />
        <Route name="tabbar">
            <Router footer={TabBar} hideNavBar={true} tabBarStyle={{backgroundColor:'white'}} renderRightButton={this.renderRightButton.bind(this)}>
                <Route name="chartView" schema="tab" title="Progress" iconName={'trending-down'} component={ChartContainer} />
                <Route name="tableView" schema="tab" title="Table" iconName={'assessment'} component={TableContainer} />
                <Route name="profileView" schema="tab" title="Profile" iconName={'account-circle'} component={ProfileContainer} />
            </Router>
        </Route>
      </Router>)
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  addIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  addIcon: {
    fontSize: 30
  },
  iconContainer: {
    alignItems: 'center'
  },
  icon: {
    fontSize: 30
  },
  iconText: {
    fontSize: 11
  }
});

export default connect((state)=>{
  return {
    weightRecords : state.UserDataReducer.get('weightRecords')
  }
})(App);