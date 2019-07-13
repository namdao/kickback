import React from 'react';
import {View, Image, Text,StatusBar,ActivityIndicator} from 'react-native';
import Container from '@components/container';
import FormLogin from '@components/formLogin';
import LOGOKICKBACK from '../../thumbnails/logo_kickback.png';
import MYUICON from '../../thumbnails/icon-myu.png';

import TAB_5 from '../../thumbnails/tab_5.png';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from '@actions/navigate';
import {Navigation} from 'react-native-navigation';
import {FollowerHistory, MYU} from "../../actions/follower.history";

class MyUOpen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentWillUpdate = (nextProps) => {
    if (nextProps.loadingReducer.isLoadingMyU != this.props.loadingReducer.isLoadingMyU) {
      if (!nextProps.loadingReducer.isLoadingMyU) {
        const {isMyU} = this.props.myUReducer;
        const iconSet = !isMyU ? MYUICON : TAB_5
        NavigationActions.dismissLightBox();
        NavigationActions.navigator.setTabButton({
          tabIndex: 4,
          disableIconTint: true,
          icon: iconSet,
          label: '',
          iconInsets: {top: 5,bottom: -5},
        });
        // this.props.toggleMyU();
        // NavigationActions.switchToTab(0);
      }
    }
  } 
  onNavigatorEvent(event) {
    switch(event.id) {
      case 'willAppear':
      FollowerHistory.setTabActiveName(MYU);
      StatusBar.setHidden(true);
      const {isMyU} = this.props.myUReducer;
      this.props.toggleMyU(!isMyU);
        setTimeout(()=>{
          this.props.fetchEntities({isMyU: !isMyU});
        },500);
      NavigationActions.setNavigator(this.props.navigator);
      NavigationActions.showMyU({isMyU: !isMyU});
      // NavigationActions.switchToTab(0);

    
      break;
      case 'didAppear':

        break;
      case 'willDisappear':
        StatusBar.setHidden(false);
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }
  render() {     
    return (
      <Container>
      </Container>
    );
  }
};

export default MyUOpen;