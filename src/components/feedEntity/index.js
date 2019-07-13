import React from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView, ProgressViewIOS,ImageStore } from 'react-native';
import { getWidthAndHeight } from '@utils/dimensions';
import _ from 'lodash';
import { NavigationActions } from '@actions/navigate'
const sizeScreen = getWidthAndHeight();
const { width, height } = sizeScreen;
let HeaderCom = null;
let Photos = null;
let VideoComponent = null;
let ListIcon = null;
class FeedEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: props.entities.total_like,
      isShow: true,
      isPlay: false
    };
    this.currentItem = 0;
    this.loadComponent();
    this.actionLikeDebounce = _.debounce(this.likePost, 700);
    this.initCurrentItem();
  }
  loadComponent = () => {
    if (Photos == null) {
      Photos = require("./photos").default;
    }
    if (VideoComponent == null) {
      VideoComponent = require("./video").default;
    }
    if (ListIcon == null) {
      ListIcon = require("@containers/listIconContainer/listIconContainer").default;
    }
    if (HeaderCom == null) {
      HeaderCom = require("@containers/headerContainer/headerContainer").default;
    }
  };

  initCurrentItem() {
    const { entities: { post_id }, dataSource } = this.props;
    this.currentItem = dataSource && dataSource.getCurrentItemByPostId(post_id);
  }

  componentDidMount() {
    const { index: postIndex, entities: { post_id }, dataSource } = this.props;
    dataSource && dataSource.updateListPosts(post_id, this.currentItem);
    // console.log(`componentDidMount - index: ${postIndex} - postId: ${post_id}`);
  }

  componentWillUnmount() {
    const { index: postIndex, entities: { post_id,medias }, dataSource } = this.props;
    // console.log(`componentWillUnmount - index: ${postIndex} - postId: ${post_id}`);
    medias.map((value,key) => {
      ImageStore.removeImageForTag(value.cover_url);
      ImageStore.removeImageForTag(value.media_url);
    });
  }

  componentDidUpdate() {
    if (!this.props.dataSource) return;
    if (this.props.index == 0 && this.props.dataSource.isReset) {
      const { entities: { post_id }, dataSource } = this.props;
      this.initCurrentItem();
      dataSource && dataSource.updateActivePost(post_id);
      this.photos && this.photos.playPhotos(this.currentItem);
      this.video && this.video.playVideo(this.currentItem);
    }
  }

  play = () => {
    const { entities: { post_id }, dataSource } = this.props;
    this.initCurrentItem();
    dataSource && dataSource.updateActivePost(post_id);
    this.photos && this.photos.playPhotos(this.currentItem);
    this.video && this.video.playVideo(this.currentItem);
  };

  pause = () => {
    this.photos && this.photos.pausePhotos();
    this.video && this.video.pauseVideo();
  };

  onPhotosIndexChanged = index => {
    const { entities: { post_id }, dataSource } = this.props;
    this.currentItem = index;
    dataSource && dataSource.updateListPosts(post_id, index);
  };

  onVideoProgress = time => {
    const { entities: { post_id }, dataSource } = this.props;
    this.currentItem = time;
    dataSource && dataSource.updateListPosts(post_id, time);
  };

  onVideoEnd = () => {
    const { entities: { post_id }, dataSource } = this.props;
    this.currentItem = 0;
    dataSource && dataSource.updateListPosts(post_id, 0);
  };
  comingSoon = () => {
    NavigationActions.showCommingSoonBox("COMING SOON");
  };
  showImage() {
    this.initCurrentItem();
    let {entities,screenDetail,goBack} = this.props;
    return (
      <Photos
        ref={p => {
          this.photos = p;
        }}
        index={this.props.index}
        screenDetail={screenDetail}
        entities={entities}
        photoFullScreen={this.photoFullScreen}
        currentPage={this.currentItem}
        onIndexChanged={this.onPhotosIndexChanged}
        goBack={goBack}
      />
    );
  }
  showVideo() {
    let {entities:{ user, medias}, screenDetail,goBack = null} = this.props;
    return (
      <VideoComponent
        ref={v => {
          this.video = v;
        }}
        user={user}
        entities={this.props.entities}
        video={medias[0]}
        index={this.props.index}
        screenDetail={screenDetail}
        onProgress={this.onVideoProgress}
        currentTime={this.currentItem}
        onEnd={this.onVideoEnd}
        goBack={goBack}
      />
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.entities.post_id != this.props.entities.post_id) {
      return true;
    }
    if (
      this.props.entities.post_id == nextProps.entities.post_id &&
      // this.props.entities.paused == nextProps.entities.paused &&
      this.props.entities.like == nextProps.entities.like
    ) {
      // check if page detail then it should render.
      if (this.props.screenDetail) {
        return true;
      }
      if(this.props.entities.total_comments != nextProps.entities.total_comments){
        return true;
      }
      if (
        this.props.entities.user.follow_status !=
        nextProps.entities.user.follow_status
      ) {
        return true;
      }
      if (
        this.props.isAnotherProfile &&
        this.props.entities.user.follow_status !=
          nextProps.entities.user.follow_status
      ) {
        return true;
      }
      if (this.props.dataSource && this.props.dataSource.isReset) {
        return true;
      }
      return false;
    }
    return true;
  }

  onPressComment = () => {
    this.props.detailEntity({ entity: this.props.entities });
  };

  likePost = (post_id, like) => {
    const { isSearch = false } = this.props;
    const { total_like } = this.props.entities;
    const payload = { post: post_id, isLike: like, isSearch, total_like };
    this.props.requestLikeEntity(payload);
  };
  comingSoon = () => {
    NavigationActions.showCommingSoonBox("COMING SOON");
  };
  playItem = item => {
    console.log(this.props.entities.post_id);
  };
  goBack = () => {
    NavigationActions.pop();
  };
  render() {
    const {
      user,
      medias,
      post_id,
    } = this.props.entities;
    const {
      detailEntity,
      screenDetail,
      fromScreen,
      goBack
    } = this.props;
    let renderItem = medias[0].media_type == "photo" ? this.showImage() : this.showVideo();
    return (
      <View style={{ height: height - height / 5 + 40 }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1 }}
          onPress={screenDetail ? goBack : null}
        >
          {renderItem}
        </TouchableOpacity>
        <HeaderCom
          isFromComment={this.props.isFromComment}
          isHideToggleTab={!detailEntity ? true : false}
          header={user}
          post_id={post_id}
          fromScreen={fromScreen}
        />
        <ListIcon
            entities={this.props.entities}
            screenDetail={screenDetail}
            comingSoon={this.comingSoon}
        />
        <View style = {{padding: 20}}/>
      </View>
    );
  }
};

export default FeedEntity;
