import React from 'react';
import { StyleSheet, View, SafeAreaView, Image,NetInfo } from 'react-native';
import { NavigationActions } from '@actions/navigate';
import Container from '@components/container';

import HEADERKICKBACK from '../../thumbnails/header_kickback.png';
import SETTING from '../../thumbnails/setting.png';
import SEARCH_BLACK from '../../thumbnails/search_black.png';

import Header from '@components/header';
import styles from './styles'
import ListDataSource from './listDataSource';

let InfoProfile = null;
import {
  FollowerHistory,
  USER_PROFILE,
  HOME
} from '../../actions/follower.history';
class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      delayShow: false,
      isConnected:true,
    }
    this.isFirstTime = true;
    this.scrollToTop = null;
    if(InfoProfile == null){
      InfoProfile = require("@containers/infoProfile/infoProfile").default;
    }
    this.dataSource = new ListDataSource();
  }

  componentWillMount = () => {
    setTimeout(() => { this.setState({ delayShow: true }) }, 200);
  }

  callBackScrollTop = (callBack) => {
    this.scrollToTop = callBack;
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    //Controll History Navigate between difference screen HOME - FOLLOWER - FOLLOWER_LIST - PROFILE
    FollowerHistory.push(USER_PROFILE,{
      screen: USER_PROFILE,
      user_id: null,
      actionArrays: []
    })
  }
  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentDidUpdate = (previousProps) => {
    if (this.props.entitiesReducer.profilePost[0] != previousProps.entitiesReducer.profilePost[0]) {

    }
  }
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.props.getInfoProfile();
      this.props.fetchEntities({ isProfile: true, user_id: this.props.userReducer.user_id })
      if(!this.state.isConnected){
        this.setState({ isConnected:true });
      }
    } else {
      if(this.state.isConnected){
        this.setState({ isConnected:false });
      }
    }
  };
  
  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        NavigationActions.setNavigator(this.props.navigator);
        this.props.getInfoProfile();
        if (this.isFirstTime) {
          this.isFirstTime = false;
          this.props.fetchEntities({ isProfile: true, user_id: this.props.userReducer.user_id })
        }
        break;
      case 'didAppear':
        this.infoProfile && this.infoProfile.getWrappedInstance().playItemInFeeds();
        FollowerHistory.setTabActiveName(USER_PROFILE);
        FollowerHistory.reset(USER_PROFILE);
        NavigationActions.toggleTabs(true);
        break;
      case 'willDisappear':
        this.infoProfile && this.infoProfile.getWrappedInstance().pauseItemInFeeds();
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }
  setting = () => {
    NavigationActions.navigateToSettings();
  };

  onSearch = () => {
      NavigationActions.showSearchBox({tabIndex: 2});
  };

  render() {
    const { delayShow } = this.state;
    return (
      <Container>
        <Header
            leftAction={this.onSearch} imageLeft={SEARCH_BLACK}
            actionRight={[{
            icon: SETTING,
            action: this.setting
          }]}
          noShadow={true} stylesHeader={styles.header}>
          <Image resizeMode='contain' style={styles.imageLogo} source={HEADERKICKBACK} />
        </Header>
        <SafeAreaView style={{ flex: 1 }}>
          {delayShow ? 
          !this.state.isConnected ? null :
          <InfoProfile
            ref={ref => this.infoProfile = ref}
            dataSource={this.dataSource}
            fromScreen={USER_PROFILE}
            callBackScrollTop={this.callBackScrollTop}
            screen={'currentUser'} /> : null}
        </SafeAreaView>
      </Container>
    );
  }
}

export default Profile;