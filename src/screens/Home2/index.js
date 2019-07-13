import React from 'react';
import {StyleSheet, View,Text,Dimensions,Animated,FlatList, ActivityIndicator} from 'react-native';
import { NavigationActions } from '@actions/navigate';
const {width, height} = Dimensions.get('window');
import {FollowerHistory, HOME2} from "../../actions/follower.history";

class Home2 extends React.Component {

  constructor(props) {
    super(props);
  }
  state = {
    loading: true,
    users: [],
  }
  

  onNavigatorEvent(event) {
    switch(event.id) {
      case 'willAppear':
        FollowerHistory.setTabActiveName(HOME2);
      NavigationActions.setNavigator(this.props.navigator);
       break;
      case 'didAppear':
        break;
      case 'willDisappear':
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }
  render() {
    return (
      <View style={{backgroundColor:'white', justifyContent: 'center', alignItems: 'center', height}}>
      <Text>COMING SOON</Text>
      </View>
    );
  }
}
export default Home2;