// @flow
/* global requestAnimationFrame */

import React, { Component } from 'react';
import ReactNative, { View, Button, Text, PanResponder, Easing, TouchableOpacity, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
let ListPhoto = null;
let CustomProgressBar = null;

const getWidth = Dimensions.get('window').width;
const getHeight = Dimensions.get('window').height;
const sidePadding = getWidth * 0.05;

import { NavigationActions } from '@actions/navigate';

export default class PhotoComponent extends Component {

  constructor(props) {
    super(props);
    this.videoPlayerIns = null;
    this.swiper = null;
    this.initProgress();
    // this.initialAutoPlayPostDebounce = _.debounce(this.initialAutoPlayPost, 1000);
    this.loadComponent();
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if(nextState.loaded !== this.state.loaded){
      return true;
    }
    
    if(nextProps.entities.post_id != this.props.entities.post_id) {
      return true;
    }
    if(nextState.currentPage != this.state.currentPage){
      return true;
    }
    if(nextState.isPlay != this.state.isPlay){
      return true;
    }

    // if (
    //     nextProps.data[0].media_type !== this.props.data[0].media_type ||
    //     nextProps.post_id !== this.props.post_id ||
    //     nextProps.timeautoplay !== this.props.timeautoplay ||
    //     nextProps.isNewCreatePost !== this.props.isNewCreatePost ||
    //     (
    //         nextProps.pauseVideo !== this.props.pauseVideo &&
    //         nextState.currentPage === this.state.currentPage &&
    //         nextState.currentPage <= nextProps.data.length - 1
    //     ) ||
    //     nextState.totalSecond !== this.state.totalSecond ||
    //     nextState.countSecond !== this.state.countSecond ||
    //     nextState.currentPage !== this.state.currentPage ||
    //     nextState.progressing !== this.state.progressing ||
    //     nextState.endVideo !== this.state.endVideo ||
    //     (
    //         nextProps.dashBoardData &&
    //         this.props.index &&
    //         nextProps.dashBoardData[this.props.index].post_id !== this.props.dashBoardData[this.props.index].post_id
    //     )
    // ) {
    //   return true;
    // }

    return false;
  };


  loadComponent = () => {
    if (ListPhoto == null) {
      ListPhoto = require('./listphoto').default
    }
    if (CustomProgressBar == null) {
      CustomProgressBar = require('@components/progressbar').default;
    }
  }

  initProgress = () => {
    const {entities, entities:{medias,time_autoplay}, currentPage, index } = this.props;
    let timeItem = time_autoplay * medias.length / 1000;
    if (entities) {
      this.state = {
        totalSecond: timeItem,
        loaded: false,
        secondPerItem: time_autoplay / 1000,
        // countSecond: 0,
        currentPage: this.props.currentPage,
        // progressing: 0,
        // showTimeContainer: true,
        isPlay: false,
      };
    }
  };

  resetProgress = () => {
    const { entities: {time_autoplay, medias} } = this.props;
    this.timeItem = (time_autoplay * medias.length / 1000);
    this.setState({
      totalSecond: this.timeItem,
      secondPerItem: time_autoplay / 1000,
      // countSecond: 0,
      loaded: false,
      currentPage: 0,
      // endVideo: false,
      // progressing: (100 / medias.length),
    });
  };

  componentWillMount(){
    if(!this.state.isShow){
      this.setState({isShow:true});
    }
  }
  componentWillUnmount() {
  }

  // initialAutoPlayPost = () => {
  //   const { entities:{medias} } = this.props;
  //   this.setState({
  //     progressing: 100 / medias.length
  //   });
  // };

  playPhotos(currentPage) {
    if (currentPage != this.state.currentPage) {
      const difference = currentPage - this.state.currentPage;
      this.swiper && this.swiper.scrollBy(difference)
    }
    if (!this.state.isPlay) {
      this.callPlay = true;
      this.setState({ isPlay: true });
    }
  }

  pausePhotos() {
    if (this.state.isPlay) {
      this.setState({ 
        isPlay: false
      })
      this.onActiveNextSlide()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isPlay && this.callPlay) {
      this.callPlay = false;
      this.swiper && this.swiper.autoplay();
    }
    const {
      dashBoardData = [],
      isProfile = false,
      isAnotherProfile = false,
      index,
      entities:{medias, post_id},
      currentPlayingProfile,
      pauseVideo,
      isNewCreatePost
    } = this.props;
    if(prevProps.entities.post_id != post_id && index == 0) {
      this.resetProgress();
    }
    if (this.state.loaded != prevState.loaded && this.state.loaded) {
      this.autoPlaySwiper();
      // this.initialAutoPlayPost();
    }
    if(this.state.isPlay != prevState.isPlay && this.state.isPlay){
      this.autoPlaySwiper();
      // this.initialAutoPlayPost();
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
    this.props.onIndexChanged && this.props.onIndexChanged(index);
    const { entities:{medias} } = this.props;

    if (index < medias.length && index >= 0) {
      this.setState({
        currentPage: index,
      }, () => this.autoPlaySwiper());
    }
  };

  autoPlaySwiper = () => {
    if (this.swiper)
    this.swiper.autoplay()
  };

  

  photoFullScreen = () => {
    // this.props.stopAllVideo();
    const {
      entities:{medias,user,time_autoplay},
      post_id,
      // currentUser,
      // listProgressBar,
      isHideToggleTab,
    } = this.props;
    NavigationActions.showFullScreenVideo({
      screen: 'photo',
      data: medias,
      // listProgressBar: this.props.listProgressBar,
      timeautoplay: time_autoplay,
      post_id: post_id,
      // data for header
      // currentUser: currentUser,
      isHideToggleTab: isHideToggleTab,
      user: user,
    })
  };

  onActiveNextSlide = () => {
    if (this.swiper && this.state.currentPage < this.props.entities.medias.length - 1)
    this.swiper.scrollBy(1);
  };

  renderProcessBar = (index) => {
    const { pauseVideo, isManual, entities,screenDetail,entities:{medias,time_autoplay, post_id} } = this.props;
    const { currentPage, progressing, loaded,isPlay } = this.state;
    const maximum_progress = ((getWidth - (2 * sidePadding) - 40) / medias.length) - 5;
    let val = 0;
    let isNext;
    isNext = index <= currentPage;
    if ((medias[0].media_type === 'photo' && medias.length === 1)) {
      return null;
    }
    return (
        <CustomProgressBar
        key={`${index}${post_id}`}
        isPlay={isPlay}
        ref={'progressBar'}
        isNext={isNext}
        currentPage={currentPage}
        isLoaded={true}
        index={index}
        isManual={isManual}
        autoPlaySwiper={this.autoPlaySwiper}
        width={maximum_progress}
        customStyle={styles.customBar}
        steps={100}
        duration={time_autoplay}
        current={val}
        maxIndex={medias.length - 1}
      />
    );
  };


  _onFinishLoading = (e) =>{
    let {entities:{medias}} = this.props;
    if(!this.state.loaded && medias.length > 1 ){
      this.setState({
        ...this.state,
        loaded: e.loaded
      })
    }
  }
  showImage(photo,key) {
    return (
      <ListPhoto
        key = {key}
        screenDetail={this.props.screenDetail}
        uriPhoto={photo.cover_url ? photo.cover_url : photo.media_url}
        photoFullScreen={this.photoFullScreen}
        onFinishLoading={this._onFinishLoading}
      />
    );
  }
  render() {
    let {
      entities:{medias,post_id},
      // heightItem,
      // positionY,
      // index,
      // pauseVideo,
      // currentUser,
      // isHideToggleTab,
      // isProfile = false,
      // isAnotherProfile = false,
      // user,
      // isPlay,
      screenDetail,
      goBack = null,
    } = this.props;
    const { totalSecond, countSecond, currentPage = 0, progressing, endVideo,loaded } = this.state;
    const timing = parseInt(totalSecond);
    const heightVideo = getHeight - (getHeight / 5);
    const bottomStyle = { bottom: (medias.length == 1 && medias[0].media_type == 'photo') ? 60 : 80 };
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1 }}
        onPress={screenDetail ? goBack : null}
      >
        {medias.length === 1 && medias[0].media_type === 'photo' ? (
            this.showImage(medias[0],0)
        ) : (
            <Swiper
              ref={node => this.swiper = node}
              key={post_id}
              style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
              onIndexChanged={this.getPosition}
              loop={false}
              index={currentPage > medias.length - 1 ? medias.length - 1 : currentPage}
              autoplay={this.state.isPlay}
              autoplayTimeout={this.state.secondPerItem}
              dot={<View style={{ opacity: 0 }} />}
              activeDot={<View style={{ opacity: 0 }} />}
              showsButtons={true}
              nextButton={<View style={{ width: 50, right: -10, height: heightVideo }} />}
              prevButton={<View style={{ width: 50, left: -10, height: heightVideo }} />}
            >
              {medias.map((media, key) => {
                return (
                 this.showImage(media,key))
                })
              }
            </Swiper>
          )
        }
        <LinearGradient pointerEvents={'none'} colors={['transparent', 'rgba(0,0,0,0.5)']} style={styles.linearGradientBottom}>
         
          {(medias.length > 1) ?
            <View style={styles.progressContainer}>
              <View style={styles.progressContainerbarLeft}>
                {medias.map((val,key) => {
                 return this.renderProcessBar(key);
                })
                }
              </View>
            </View>
            : null}
        </LinearGradient>
       
      </TouchableOpacity>
    );
  }
}