import React from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';


import { Avatar } from '@components/avatar';
// import LOGOKICKBACK from '../../thumbnails/logo_kickback.png';

import styles from './styles';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import PHOTODEFAULT from '../../thumbnails/logo-default.png';
import ICONSHARE from '../../thumbnails/ico-share-white.png';
import { NavigationActions } from '@actions/navigate';
import LinearGradient from 'react-native-linear-gradient';
class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.currentIndex = 0;
    this.share = this.share.bind(this);
  }
  scrollToEnd = () => {
    if (this.scrollView) {
      this.scrollView.scrollToEnd({ animated: true });
    }
  }

  fetchFollowerDetail = () => {
    const {userReducer, header, screen,isFromComment} = this.props;
    if(userReducer.user_id === header.user_id){
      if(!isFromComment){
        NavigationActions.navigateToProfileTab();
      }
    }else if(screen !== 'follower') {
      NavigationActions.navigateToDetailFollower(this.props);
    }
  };

  following = (user_to_id, follow_status) => {
    let follow = follow_status == null ? false : true;
    const payload = { user_to: user_to_id, isFollow: follow, screen: this.props.isFromComment ? 'commentList' : 'feed' }
    this.props.requestFollowing(payload);
  }
  remove(array) {
    const post_id = this.props.post_id;
    return array.find((value, index) => value.post_id == post_id);
  }
  onDelete = () => {
    const { post_id, requestDeletePost } = this.props;
    console.log(this.props);
    requestDeletePost({ post_id });
  }

  shareFlowing = (user_id, follow_status,screen,username) => {
    const functionReport = this.props.createReport || function () { };
    const dataListReport = [
      {
        title: 'It\'s inappropriate',
        onPress: () => functionReport({
          post: this.props.post_id,
          reason: 'It\'s inappropriate'
        })
      }
    ];
    const reportParams = {
      title: 'Report Post',
      subTitle: 'Choose a reason for reporting this post:',
      dataListReport
    };
    dataListSelectBox = [
      {
        title: 'Share',
        onPress: () => NavigationActions.showCommingSoonBox('COMING SOON')
      }, {
        title: follow_status == 'accepted' ? 'Following' : 'Follow',
        isCheck: follow_status == 'accepted' ? true : false,
        onPress: () => { this.following(user_id, follow_status) },

      }, {
        title: 'Mute',
        onPress: () => NavigationActions.showCommingSoonBox('COMING SOON')
      }, {
        title: 'Report',
        onPress: () => NavigationActions.showReportBox(reportParams)
      }, {
        title: 'Block',
        isBlocked: true,
        onPress: () => NavigationActions.showBlockUserBox({
           onBlock: this.onBlock,
           user_id,
           screen:screen,
           username
        })
      }
    ];
    NavigationActions.showListSelectBox({ dataListSelectBox, isLeft: true });
  }
  onBlock = (user_to_id) => {
    // const {currentUser} = this.props;
    const payload = {user_to : user_to_id,isBlocked: true}
    this.props.requestBlockedUsers(payload);
  }
  share = () => {
    const {header:{user_id, follow_status,username},userReducer,post_id,screen} = this.props;
    //const {user_to_id,follow} = this.props.follower
    let dataListSelectBox = '';
    if (user_id == userReducer.user_id) {
      dataListSelectBox = [
        {
          title: 'Edit',
          onPress: () => NavigationActions.showCommingSoonBox('COMING SOON')
        }, {
          title: 'Delete',
          onPress: () => NavigationActions.showDeleteBox({
            onDelete: this.onDelete,
            screen: screen,
            mess: 'Delete this post?'
          })
        },
      ]
      NavigationActions.showListSelectBox({ dataListSelectBox, isLeft: false });

    } else {
      this.shareFlowing(user_id, follow_status,screen,username);
    }
  }

  render() {
    const {username,avatar,thumbnail} = this.props.header;
    const {isShowLeftIcon,isFromComment} = this.props;
    const showLeftIcon = isShowLeftIcon == false ? false : true;
    return (
        <LinearGradient pointerEvents={'box-none'} colors={['rgba(0,0,0,0.35)', 'transparent']} style={styles.linearGradient}>
          <SafeAreaView pointerEvents={'box-none'} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.fetchFollowerDetail}>
              <Avatar
                title={''}
                onPress={this.fetchFollowerDetail}
                styles={{ width: 50, height: 50 }}
                stylesImg={styles.imgAvatar}
                source={thumbnail ? { uri: thumbnail } : null}
              />
              <Text numberOfLines={1} allowFontScaling={false} style={styles.headerText}>{username}</Text>
            </TouchableOpacity>
            {showLeftIcon && !isFromComment ?
              <TouchableOpacity
                hitSlop={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20
                }}
                style={{ justifyContent: 'center' }}
                onPress={this.share}>
                <Image style={styles.shareButton} source={ICONSHARE} resizeMode='cover' />
              </TouchableOpacity> : null}
          </SafeAreaView>
        </LinearGradient>
    );
  }
};

export default HeaderComponent;
