import React from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { NavigationActions } from '@actions/navigate';
import {
  FollowerHistory,
  PROFILE,
  HOME, USER_PROFILE
} from '../../actions/follower.history';
import Container from '@components/container';

import HEADERKICKBACK from '../../thumbnails/header_kickback.png';
import ICONBACK from '../../thumbnails/back_black.png';
import ICONCHAT from '../../thumbnails/tab_2.png';
import SEARCH_BLACK from '../../thumbnails/search_black.png';

import Header from '@components/header';
import styles from './styles'
// import InfoProfile from '@components/profile/infoProfile';
// import TabProfile from '@components/profile/tabProfile';
import ListDataSource from './listDataSource';

var InfoProfile = null;

class Follower extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = { delayShow: false };
    if(InfoProfile == null){
      InfoProfile = require("@containers/infoProfile/infoProfile").default;
    }
  }

  componentWillMount() {

    setTimeout(() => { this.setState({ delayShow: true }) }, 200);
    const { user_id } = this.props.header;
    this.listFeed = [];
    this.dataSource = new ListDataSource();
    this.props.fetchFollower({ user_id });
    // this.props.fetchMedias({id: user_id});
    this.props.fetchEntities({ isProfile: true, user_id: user_id });
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        this.infoProfile && this.infoProfile.getWrappedInstance().playItemInFeeds();
        NavigationActions.setNavigator(this.props.navigator);
        NavigationActions.toggleTabs(true);

        const { user_id } = this.props.header;

        FollowerHistory.push(this.props.fromScreen,{
          screen: PROFILE,
          user_id,
          actionArrays: [
            ()=>this.props.fetchFollower({ user_id }),
            ()=>this.props.fetchEntities({ isProfile: true, user_id: user_id }),
            ()=>{}//this.props.fetchMedias({ id: user_id })
          ]
        });
        FollowerHistory.runActionAtLastItemHistory(this.props.fromScreen);

        // if(this.props.fromScreen === HOME){
        //
        // }else if(this.props.fromScreen === USER_PROFILE){
        //
        // }

        break;
      case 'didAppear':
        // this.props.playCurrentVideo({ isAnotherProfile: true });
        break;
      case 'willDisappear':
        this.infoProfile && this.infoProfile.getWrappedInstance().pauseItemInFeeds();
        FollowerHistory.pop(this.props.fromScreen,result=>{});
        // this.props.stopAllVideo();
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }
  navigateBack = () => {

    // if(this.props.fromScreen === HOME){
    //
    // }else if(this.props.fromScreen === USER_PROFILE){
    //
    // }

    NavigationActions.pop();
    if (this.props.isHideToggleTab) {
      NavigationActions.toggleTabs(false);
    }


  };

  onSearch = () => {
    NavigationActions.showSearchBox();
  };

  chat = () => {
    NavigationActions.showCommingSoonBox('COMING SOON')
  };

  render() {
    const { delayShow } = this.state;
    const { userReducer } = this.props;
    const { user_id } = this.props.header;
    const screen = user_id === userReducer.user_id ? 'currentUser' : 'follower';


    return (
      <Container>
        <Header imageLeft={screen === 'follower' ? ICONBACK : SEARCH_BLACK} leftAction={screen === 'follower' ? this.navigateBack : this.onSearch}
          actionRight={[{
            icon: screen === 'follower' ? ICONCHAT : null,
            action: screen === 'follower' ? this.chat : null
          }]}
          noShadow={true} stylesHeader={styles.header}>
          <Image resizeMode='contain' style={styles.imageLogo} source={HEADERKICKBACK} />
        </Header>
        <SafeAreaView style={{ flex: 1 }}>
          {delayShow ? <InfoProfile
            ref={(ref) => this.infoProfile = ref}
            dataSource={this.dataSource}
            fromScreen={this.props.fromScreen}
            /> : null}
        </SafeAreaView>
      </Container>
    );
  }
}

export default Follower;