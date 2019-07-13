import React from 'react';
import {Text, View, ActivityIndicator, Image,FlatList,TouchableOpacity} from 'react-native';
import styles from './styles'
// import {Avatar} from '@components/avatar';
import ButtonBorder from '@components/buttonBorder'
import { NavigationActions } from '@actions/navigate';
// import iconChecked from '../../../thumbnails/icon-checked.png'
import CoverPage from '../../coverPage';
import { ChooseAvatarButton } from '@components/avatar';
import fontSizes from '@constants/font-sizes';
import LOGODEFAULT from '../../../thumbnails/logo-default.png';
import { FollowerHistory, HOME, USER_PROFILE} from '@actions/follower.history';

let FeedCom = null;

export default class InfoProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadMore: false,
      data: []
    }
    this.viewabilityConfig = {
      viewAreaCoveragePercentThreshold: 50,
      minimumViewTime: 500,
    };
    if(FeedCom == null){
      FeedCom = require('../../feedEntity').default;
    }
    this.props.callBackScrollTop && this.props.callBackScrollTop(this.scrollToTop)
    this.listFeed = [];
  };
  
  showDetailProfile = () => {
    const {userReducer, followerReducer, screen} = this.props;
    const dataUser = screen == 'currentUser' ?{data: userReducer} : {data: followerReducer};
    dataUser.currentUser = userReducer;
    NavigationActions.showDetailProfileBox(dataUser);
    NavigationActions.toggleTabs(false);
  }

  navigateToListFollowScreen = (isFollower) => {
    const {userReducer, followerReducer, screen, fromScreen} = this.props;
    const dataUser = screen == 'currentUser' ? userReducer : followerReducer;
    const {user_id} = dataUser
    const params = {
      user_id,
      isFollower,
      fromScreen: fromScreen
    };
    NavigationActions.navigateToListFollowScreen(params);
  };

  renderHeader = () => {
    // const {user, followerReducer, screen} = this.props;
    const {userReducer, followerReducer, screen} = this.props;
    let isEditProfile = screen == 'currentUser';
    let isFollowerUser = false;
    // is Profile user or another user
    if (!isEditProfile) {
      isFollowerUser = followerReducer.follow_status == 'accepted' ? true : false;
      
    }
    let statusFollow = isFollowerUser ?  'FOLLOWING'  : 'FOLLOW';
    statusFollow = followerReducer && followerReducer.follow_status == 'request' ? 'REQUESTED' : statusFollow;
    let labelButton = 'EDIT PROFILE';
    if (!isEditProfile) {
      labelButton = statusFollow;
      labelButton = followerReducer.blocked ? 'BLOCKED' : labelButton;
    }

    let numFollowing = screen == 'currentUser' ? userReducer.following : followerReducer.following;
    let numberFollower = screen == 'currentUser' ? userReducer.followers : followerReducer.followers;
    const following_number = numFollowing > 1000 ? parseInt(numFollowing / 1000 ).toString() +"K" :  numFollowing;
    const follower_number = numberFollower > 1000 ? parseInt(numberFollower / 1000 ).toString() +"K" :  numberFollower;
    const uirAvatr = screen == 'currentUser' ? userReducer.avatar : followerReducer.avatar;
    const cover_image = screen == 'currentUser' ? userReducer.cover_image : followerReducer.cover_image;
    const userName = screen == 'currentUser' ? userReducer.username : followerReducer.username;
    const name = screen == 'currentUser' ? userReducer.name : followerReducer.name;

   

    const shortBio = screen == 'currentUser' ? userReducer.short_bio : followerReducer.short_bio;
    const txtFollower = follower_number <= 1 ? 'FOLLOWER' : 'FOLLOWERS'

    return (
      <View style = {[styles.container, styles.headerList]}>
        <CoverPage source={cover_image ? {uri: cover_image} : null} onPress={null}/>  
        {uirAvatr ?
        <ChooseAvatarButton source={{uri: uirAvatr}} onPress={this.showDetailProfile} styles={styles.avatar}/>
        : 
        <TouchableOpacity onPress={this.showDetailProfile}>
          <Image source={LOGODEFAULT} style={[styles.avatarDefault]} resizeMode='contain' />
        </TouchableOpacity>
        }
        <Text numberOfLines={1} ellipsizeMode='tail' allowFontScaling={false} style = {styles.nameStyle}>{name}</Text>
        {/* <Text numberOfLines={1} ellipsizeMode='tail' allowFontScaling={false} style = {styles.nameStyleSecond}>{'@'}{name}</Text> */}
        <View style = {styles.paddingFrame}>
            <Text numberOfLines={3} ellipsizeMode='tail' allowFontScaling={false} style = {styles.nameStyleBio}>{shortBio}</Text>
          <View style = {styles.status}>
            <TouchableOpacity onPress={this.navigateToListFollowScreen.bind(null, false)}>
              <View style = {styles.block}>
                <Text allowFontScaling={false} style = {styles.followingNumber}>{following_number ? following_number : '0'}</Text>
                <Text allowFontScaling={false} style = {styles.followingText}>FOLLOWING</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToListFollowScreen.bind(null, true)}>
            <View style = {styles.block}>
              <Text allowFontScaling={false} style = {styles.followingNumber}>{follower_number ? follower_number : '0'}</Text>
              <Text allowFontScaling={false} style = {styles.followingText}>{txtFollower}</Text>
            </View>
            </TouchableOpacity>
            <ButtonBorder
            titleSize={fontSizes.smallerRegular}
            onPress = {this.onPressEditProfile}
            styles={styles.buttonFollow} title = {labelButton} screen='infoDetail'/>
          </View>
        </View>
      </View>
    )
  }

  onPressEditProfile = () => {
    const {userReducer, followerReducer, requestBlockedUsers, requestFollowing,screen} = this.props;
    if(screen == 'currentUser') {
      NavigationActions.toggleTabs(false);
      NavigationActions.navigateToCreateProfile({isEdit: true, userData: userReducer});
    } else if (followerReducer.blocked){
      const payload = {user_to: followerReducer.user_id}
      requestBlockedUsers(payload);      
    } else {
      let is_follow = followerReducer.follow_status == null ? false : true; 
      const payload = {user_to: followerReducer.user_id,isFollow:is_follow, screen: 'detailprofile'}
      requestFollowing(payload);
    }
  }

  keyExtractor = (item, index) => index.toString();

  componentWillUpdate = (nextProps) => {
    if (nextProps.entitiesReducer.countProfilePost != this.props.entitiesReducer.countProfilePost) {
      if (nextProps.entitiesReducer.countProfilePost == 0) {
        this.setState({ loadMore: false });
      }
      setTimeout(() => {
        this.scrollToTop();
      }, 300)
    }
  }
  scrollToTop = () => {
    if (this.refs.homeList)
      this.refs.homeList.scrollToOffset({ offset: 0, animated: false });;
  }

  playItemInFeeds() {
    let postId = this.props.dataSource && this.props.dataSource.activePost.postId;
    if (this.listFeed[`${postId}`]) {
      this.listFeed[`${postId}`].play && this.listFeed[`${postId}`].play();
    }
  }

  pauseItemInFeeds() {
    let postId = this.props.dataSource && this.props.dataSource.activePost.postId;
    if (this.listFeed[`${postId}`]) {
      this.listFeed[`${postId}`].pause && this.listFeed[`${postId}`].pause();
    }
  }

  _renderItem = ({ item, index }) => {
    // const { userReducer, profilePost, profileFollowingPost, isNewCreatePost,follower, screen, user } = this.props;
    // const currentUserId = screen == 'currentUser' ? user.user_id : follower.user_id
    // const isYou = userReducer.user_id == currentUserId ? true : false;
    // const dataList = isYou ? profilePost : profileFollowingPost;

    return (
      <FeedCom
        // ref={(ref) => {
        //   this.props.saveRef(ref, item)
        // }}
        // setIndexPost={this.props.setIndexPost}
        // listVideo={this.props.videoListReducer}
        // detailEntity={this.props.detailEntity}
        // positionY={this.state.positionY}
        // index={index}
        // stopAllVideo={this.props.stopAllVideo}
        // listProgressBar={this.props.progressReducer}
        // initProgress={this.props.initProgress}
        // entities={item}
        // isProfile={isYou}
        // isAnotherProfile={!isYou}
        // screen={this.props.screen}
        // requestLikeEntity={this.props.requestLikeEntity}
        // requestUnLikeEntity={this.props.requestUnLikeEntity}
        // requestFollowing={this.props.requestFollowing}
        // currentUser={this.props.userReducer}
        // dashBoardData={dataList}
        // requestDeletePost={this.props.requestDeletePost}
        // isNewCreatePost={isNewCreatePost}
        // entityPauseVideo={this.props.entityPauseVideo}
        // createReport={this.props.createReport}
        // requestBlockedUsers={this.props.requestBlockedUsers}

        index={index}
        // stopAllVideo={this.props.stopAllVideo}
        entities={item}
        dataSource={this.props.dataSource}
        // requestLikeEntity={this.props.requestLikeEntity}
        // requestUnLikeEntity={this.props.requestUnLikeEntity}
        // requestFollowing={this.props.requestFollowing}
        // currentUser={this.props.userReducer}
        // dashBoardData={this.props.entitiesReducer.dashBoardData}
        // entityPauseVideo={this.props.entityPauseVideo}
        // requestDeletePost={this.props.requestDeletePost}
        // createReport={this.props.createReport}
        // entitiesReducer={this.props.entitiesReducer}
        fromScreen={HOME}
        ref={(ref) => this.listFeed = {...this.listFeed, [`${item.post_id}`]: ref}}
      />
    );
  }

  renderFooter = () => {
    const {userReducer, entitiesReducer, screen, followerReducer} = this.props;
    const currentUserId = screen == 'currentUser' ? userReducer.user_id : followerReducer.user_id
    const { profilePost, profileFollowingPost } = entitiesReducer;
    const dataList = userReducer.user_id == currentUserId ? profilePost : profileFollowingPost;
    if (!this.state.loadMore || dataList.length == 0) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  /**
   * @name _onEndReached
   * @summary - render add friends screen
   * @return {undefined}
   */
  _onEndReached = async () => {
    const {userReducer, followerReducer, screen}  = this.props;
    const currentUserId = screen == 'currentUser' ? userReducer.user_id : followerReducer.user_id
    if (!this.onEndReachedCalledDuringMomentum && !this.props.loadingReducer.isLoadMoreProfile) {
      this.onEndReachedCalledDuringMomentum = true;
      const { profilePost, countProfilePost, nextProfilePost,
        profileFollowingPost, nextProfileFollowingPost, countProfileFollowingPost } = this.props.entitiesReducer;
      const { user_id } = userReducer
      if (user_id == currentUserId) {
        if (countProfilePost >= 0 && nextProfilePost && profilePost.length != countProfilePost) {
          this.setState({ loadMore: true });
          this.props.fetchEntitiesMore({ nextProfilePost, isProfile: true, user_id: currentUserId });
        } else {
          this.setState({ loadMore: false });
        }
      } else {
        if (countProfileFollowingPost >= 0 && nextProfileFollowingPost && profileFollowingPost.length != countProfileFollowingPost) {
          this.setState({ loadMore: true });
          this.props.fetchEntitiesMore({ nextProfileFollowingPost, isProfile: true, user_id: currentUserId });
        } else {
          this.setState({ loadMore: false });
        }
      }
    }
  }

  onViewItem = (event) => {
    // const {screen, user, follower, userReducer} = this.props;
    // const currentUserId = screen == 'currentUser' ? user.user_id : follower.user_id
    // const {changed} = event;
    // if (currentUserId == userReducer.user_id) {
    //   this.props.entityPauseVideo({ data: changed, isProfile: true });
    // } else {

    //   this.props.entityPauseVideo({ data: changed, isAnotherProfile: true });
    // }
    const changed = event.changed;
    const viewableItems = event.viewableItems;
    changed.forEach(item => {
        if (!item.isViewable && this.listFeed[`${item.item.post_id}`]) {
          this.listFeed[`${item.item.post_id}`].pause &&
          this.listFeed[`${item.item.post_id}`].pause();
        }
    });
    viewableItems.forEach(item => {
        if (item.isViewable && this.listFeed[`${item.item.post_id}`]) {
          this.listFeed[`${item.item.post_id}`].play &&
          this.listFeed[`${item.item.post_id}`].play();
        }
    });
  }

  render() {
    //const { data } = this.state;
    // const { userReducer, screen, user, follower } = this.props;
    const { userReducer, screen, followerReducer } = this.props;
    const { profilePost, profileFollowingPost } = this.props.entitiesReducer
    const currentUserId = screen == 'currentUser' ? userReducer.user_id : followerReducer.user_id
    const dataList = userReducer.user_id == currentUserId ? profilePost : profileFollowingPost;
    return (
      <View style = {styles.container}>
        <FlatList
          viewabilityConfig={this.viewabilityConfig}
          scrollEventThrottle={16}
          // onScrollEndDrag={this.handleScroll}
          onViewableItemsChanged={this.onViewItem}
          ref='homeList'
          ListFooterComponent={this.renderFooter}
          onEndReached={this._onEndReached}
          style={{ flex: 1, backgroundColor: 'white' }}
          maxToRenderPerBatch={1}
          windowSize={11}
          initialNumToRender={1}
          onEndReachedThreshold={1.5}
          removeClippedSubviews={false}
          ListHeaderComponent={this.renderHeader}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          data={dataList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
};