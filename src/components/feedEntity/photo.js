// @flow
/* global requestAnimationFrame */

import React, { Component } from 'react';
import ReactNative, { View, Button, Text, PanResponder, Easing, TouchableOpacity, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
let ListPhoto = null;
let VideoComponent = null;
let CustomProgressBar = null;
let ProgressBarVideo = null;
let Image = null;
const getWidth = Dimensions.get('window').width;
const getHeight = Dimensions.get('window').height;
const sidePadding = getWidth * 0.05;

import { NavigationActions } from '@actions/navigate';

export default class PhotoComponent extends Component {

  constructor(props) {
    super(props);

    this.videoPlayerIns = null;

    this.initProgress();
    this.initialAutoPlayPostDebounce = _.debounce(this.initialAutoPlayPost, 1000);
    this.loadComponent();
  }

  shouldComponentUpdate = (nextProps, nextState) => {

    if(nextState.loaded !== this.state.loaded){
      return true;
    }
    if (nextProps.pauseVideo != this.props.pauseVideo) {
      return true;
    }
    // if(nextProps.post_id != this.props.post_id) {
    //   return true;
    // }
    if (
        nextProps.data[0].media_type !== this.props.data[0].media_type ||
        nextProps.post_id !== this.props.post_id ||
        nextProps.timeautoplay !== this.props.timeautoplay ||
        nextProps.isNewCreatePost !== this.props.isNewCreatePost ||
        (
            nextProps.pauseVideo !== this.props.pauseVideo &&
            nextState.currentPage === this.state.currentPage &&
            nextState.currentPage <= nextProps.data.length - 1
        ) ||
        nextState.totalSecond !== this.state.totalSecond ||
        nextState.countSecond !== this.state.countSecond ||
        nextState.currentPage !== this.state.currentPage ||
        nextState.progressing !== this.state.progressing ||
        nextState.endVideo !== this.state.endVideo ||
        (
            nextProps.dashBoardData &&
            this.props.index &&
            nextProps.dashBoardData[this.props.index].post_id !== this.props.dashBoardData[this.props.index].post_id
        )
    ) {
      return true;
    }

    return false;
  };


  loadComponent = () => {
    if (ListPhoto == null) {
      ListPhoto = require('./listphoto').default
    }
    if (VideoComponent == null) {
      VideoComponent = require('./video').default;
    }
    if (CustomProgressBar == null) {
      CustomProgressBar = require('../../components/progressbar').default;
    }
    if (ProgressBarVideo == null) {
      ProgressBarVideo = require('../../components/progressbar/progressBarVideo').default;
    }
    if (Image == null) {
      Image = require('../../components/imageProgress').default;
    }
  }

  initProgress = () => {
    const { timeautoplay, data, entities } = this.props;
    this.timeItem = data[0].media_type === 'photo' ? timeautoplay * data.length / 1000 :
      data[0].media_type === 'video' ? data[0].duration ?
        data[0].duration : 0 : 0;
    if (entities) {
      this.state = {
        totalSecond: this.timeItem,
        loaded: false,
        secondPerItem: timeautoplay / 1000,
        countSecond: 0,
        currentPage: entities.index ? entities.index : 0,
        progressing: entities.processing ? entities.processing : 0,
        showTimeContainer: true,
        endVideo: false,
      };
      return;
    }
    this.state = {
      totalSecond: this.timeItem,
      secondPerItem: timeautoplay / 1000,
      countSecond: 0,
      loaded: false,
      currentPage: 0,
      progressing: 0,
      showTimeContainer: true,
      endVideo: false,
    };
  };

  resetProgress = () => {
    const { timeautoplay, data } = this.props;
    const isPhoto = data[0].media_type === 'photo';
    this.timeItem = isPhoto ? (timeautoplay * data.length / 1000) : (data[0].duration || 0);
    this.setState({
      totalSecond: this.timeItem,
      secondPerItem: timeautoplay / 1000,
      countSecond: 0,
      currentPage: 0,
      endVideo: false,
      progressing: !isPhoto ? 0 : (100 / data.length),
      showTimeContainer: true
    });
  };
  componentWillMount(){
    if(!this.state.isShow){
      this.setState({isShow:true});
    }
  }
  componentWillUnmount() {
    if (this.props.setIndexPost) {
      const {isProfile = false, isAnotherProfile = false, entities, data, post_id} = this.props;
      const {currentPage} = this.state;
      this.props.setIndexPost({
        isProfile,
        isAnotherProfile,
        post_id,
        index: currentPage + 1,
        processing: this.state.processing
      })
    }
    
  }

  initialAutoPlayPost = () => {
    const { data, entities } = this.props;
    const isPhoto = data[0].media_type === 'photo';
    if(isPhoto){
      this.setState({
        progressing: 100 / data.length
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      dashBoardData = [],
      isProfile = false,
      isAnotherProfile = false,
      index = 0,
      data,
      currentPlayingProfile,
      pauseVideo,
      isNewCreatePost
    } = this.props;
    this.maximum_progress = ((getWidth - (2 * sidePadding) - 40) / data.length) - 5;
    if(prevProps.post_id != this.props.post_id) {
      this.resetProgress()
    }
    if(prevProps.pauseVideo != this.props.pauseVideo) {
      this.initialAutoPlayPost()
    }
    if (this.state.loaded != prevState.loaded && this.state.loaded) {
      this.autoPlaySwiper();
      this.initialAutoPlayPost();
    }
    // const { pauseVideo: prevPauseVideo } = prevProps;

    // if (
    //   dashBoardData
    //   && prevProps.dashBoardData
    //   && dashBoardData.length > 0
    //   && prevProps.dashBoardData.length > 0
    // ) {
    //   // Check Initial Auto Play Post
    //   if (
    //     pauseVideo !== prevPauseVideo
    //     && pauseVideo === false
    //     && data.length >= 1
    //   ) {
    //     if (dashBoardData[index].post_id !== prevProps.dashBoardData[index].post_id) {
    //       this.resetProgress();
    //     }
    //     this.initialAutoPlayPost();
    //   }
    //   // Check Create Post AutoPlay

    //   if (dashBoardData[index].post_id !== prevProps.dashBoardData[index].post_id) {
    //     const firstItem = {
    //       index: 0,
    //       isViewable: true,
    //       item: dashBoardData[0]
    //     };
    //     this.resetProgress();
    //     if (isProfile === false) {
    //       entityPauseVideo({ data: [firstItem] });
    //       // if (this.props.playPostWithPostId) {
    //       //   this.props.playPostWithPostId({post_id: dashBoardData[0].post_id});
    //       // }
    //     }
    //     if (isProfile === true) {
    //       entityPauseVideo({ data: [firstItem], isProfile: true, isMerge: true });
    //     }
    //   }
    // }
    // if(isProfile && isNewCreatePost){
    //   let dataProfile = this.props.dashBoardData[0];
    //   const dataFristProfileItem = {
    //     index: 0,
    //     isViewable: true,
    //     item:dataProfile
    //   };
    //   entityPauseVideo({data:[dataFristProfileItem],isProfile:true,isNewCreatePost:true});
    // }
    // if(prevProps.timeautoplay != this.props.timeautoplay){
    //   this.resetProgress();
    // }
  }

  getPosition = (index) => {
    const { data } = this.props;

    if (data[0].media_type === 'photo' && index < data.length && index >= 0) {

      this.setState({
        currentPage: index,
        showTimeContainer: false,
      }, () => this.autoPlaySwiper());

      /*if(!pauseVideo){

        this.setState({
          currentPage: index,
          showTimeContainer: false,
        },() => this.autoPlaySwiper());

      }*/
    }
  };

  autoPlaySwiper = () => {
    if (this.swiper)
    this.swiper.autoplay()
  };

  resetEndVideoWhenScroll = () => {
    this.setState({
      progressing: 0,
      totalSecond: this.timeItem,
      endVideo: false,
      countSecond: 0
    },()=>{
      if(this.videoPlayerIns !== null){
        this.videoPlayerIns.seek(0);
      }
    });
  };

  runProcessingVideo = (timing, endVideo, mode) => {
    const { data, pauseVideo } = this.props;
    if (data[0].media_type === 'video' && !pauseVideo) {
      if (timing === -1 || endVideo === -1) {
        if(this.state.endVideo){
          //Video is end, play it again when scroll up or down
          this.resetEndVideoWhenScroll();
        } else {
          this.setState({
            progressing: 1,
            totalSecond: 0,
            endVideo: true,
            countSecond: this.timeItem - 0.1
          });
        }
      } else {

        this.setState({
          progressing: parseFloat(timing / this.timeItem),
          totalSecond: parseFloat(this.timeItem - timing),
          countSecond: parseFloat(timing)
        });
      }
    }
    else if (data[0].media_type === 'video' && pauseVideo && mode === 'fullscreen') {

      if (timing === -1 || endVideo === -1) {

        this.setState({
          progressing: 1,
          totalSecond: 0,
          endVideo: true,
          countSecond: this.timeItem - 0.1
        });

      }
      else {
        this.setState({
          progressing: parseFloat(timing / this.timeItem),
          totalSecond: parseFloat(this.timeItem - timing),
          countSecond: parseFloat(timing)
        });
      }

    }
  };

  photoFullScreen = () => {
    this.props.stopAllVideo();
    const {
      data,
      timeautoplay,
      post_id,
      currentUser,
      listProgressBar,
      isHideToggleTab,
      user
    } = this.props;
    clearInterval(listProgressBar[post_id]);
    NavigationActions.showFullScreenVideo({
      screen: 'photo',
      data: data,
      listProgressBar: this.props.listProgressBar,
      timeautoplay: timeautoplay,
      post_id: post_id,
      // data for header
      currentUser: currentUser,
      isHideToggleTab: isHideToggleTab,
      user: user,
    })
  };

  onActiveNextSlide = () => {
    if (this.swiper)
    this.swiper.scrollBy(1);
  };

  renderProcessBar = ( index) => {
    const { data, timeautoplay, pauseVideo, isManual, entities,screenDetail } = this.props;
    const { currentPage, progressing, loaded } = this.state;
    const maximum_progress = ((getWidth - (2 * sidePadding) - 40) / this.props.data.length) - 5;
    let val = 0;
    let isNext;
    isNext = index <= currentPage;
    if (data[0].media_type === 'video') {
      return (
       <ProgressBarVideo
          row
          key={index}
          currentPage={currentPage}
          index={index}
          progress={progressing}
          duration={100}
          customStyle={[styles.customBar,
          { width: maximum_progress }]} />
      )
    }
    if ((data[0].media_type === 'photo' && data.length === 1)) {
      return null;
    }
    return (
        loaded || screenDetail ? <CustomProgressBar
        key={index}
        pauseVideo={pauseVideo}
        ref={'progressBar'}
        isNext={isNext}
        currentPage={currentPage}
        isLoaded={entities.index >=0 ? true : false}
        index={index}
        isManual={isManual}
        autoPlaySwiper={this.autoPlaySwiper}
        width={maximum_progress}
        customStyle={styles.customBar}
        steps={100}
        duration={timeautoplay}
        current={val}
        activeNextSlide={this.onActiveNextSlide}
        maxIndex={data.length - 1}
      /> : null
    );
  };


  _onFinishLoading = (e) =>{
    if(!this.state.loaded && this.props.data.length > 1 ){
      this.setState({
        ...this.state,
        loaded: e.loaded
      })
    }
  }
  showImage(photo,key) {
    return (
      <ListPhoto
        screenDetail={this.props.screenDetail}
        uriPhoto={photo.cover_url ? photo.cover_url : photo.media_url}
        photoFullScreen={this.photoFullScreen}
        keyExtractor={key}
        onFinishLoading={this._onFinishLoading}
      />
    );
  }
  render() {
    let {
      data,
      heightItem,
      positionY,
      index,
      pauseVideo,
      currentUser,
      isHideToggleTab,
      isProfile = false,
      isAnotherProfile = false,
      user,
      screenDetail,
      goBack,
    } = this.props;
    const { totalSecond, countSecond, currentPage = 0, progressing, endVideo,loaded } = this.state;
    const timing = parseInt(totalSecond);
    const heightVideo = getHeight - (getHeight / 5);
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1 }}
        onPress={screenDetail ? goBack : null}
      >
        {data.length === 1 && data[0].media_type === 'photo' ? (
            this.showImage(data[0],0)
        ) : (
            <Swiper
              ref={node => this.swiper = node}
              key={this.props.post_id}
              style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
              onIndexChanged={this.getPosition}
              loop={false}
              index={currentPage > data.length - 1 ? data.length - 1 : currentPage}
              autoplay={screenDetail ? false : !pauseVideo}
              autoplayTimeout={this.state.secondPerItem}
              dot={<View style={{ opacity: 0 }} />}
              activeDot={<View style={{ opacity: 0 }} />}
              showsButtons={true}
              nextButton={<View style={{ width: 50, right: -10, height: heightVideo }} />}
              prevButton={<View style={{ width: 50, left: -10, height: heightVideo }} />}
            >
              {data.map((media, key) => {
                return (
                  // <View key={key} style={{
                    // justifyContent: 'center',
                    // flex: 1, 
                    // overflow: 'hidden',
                    // alignItems: 'center',
                  // }}>
                  media.media_type === 'photo' ? (this.showImage(media,key)) :
                  <VideoComponent
                      pauseVideo={pauseVideo}
                      currentUser={currentUser}
                      isHideToggleTab={isHideToggleTab}
                      user={user}
                      entities={this.props.entities}
                      isProfile={isProfile}
                      isAnotherProfile={isAnotherProfile}
                      index={index} heightItem={heightItem} positionY={positionY} video={media}
                      initVideo={this.props.initVideo}
                      dashBoardData={this.props.dashBoardData}
                      runProcessingVideo={this.runProcessingVideo}
                      currentTime={countSecond}
                      screenDetail={screenDetail}
                      goBack={goBack}
                      sendVideoIns={(ref)=>{
                        this.videoPlayerIns = ref;
                      }}
                    />
                  // </View>
                );
              })
              }
            </Swiper>
          )
        }
        <LinearGradient pointerEvents={'none'} colors={['transparent', 'rgba(0,0,0,0.5)']} style={styles.linearGradientBottom}>
          {(data.length > 1 || (data[0].media_type === 'video')) && (!screenDetail || data[0].media_type === 'photo') ?
            <View style={styles.progressContainer}>
              <View style={styles.progressContainerbarLeft}>
                {data.map((val,key) => {
                 return this.renderProcessBar(key);
                })
                }
              </View>
              {/* <View style={styles.progressContainerbarRight}> */}
                {data[0].media_type === 'video' && countSecond < 3 && this.timeItem > 10 && !endVideo ?
                  <Text allowFontScaling={false} style={styles.secondsText}>{timing}s</Text>
                  : null}
              {/* </View> */}
            </View>
            : null}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}