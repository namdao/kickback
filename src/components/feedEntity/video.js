
import React from 'react';
import {View,TouchableOpacity,ActivityIndicator,Text} from 'react-native';
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import styles from './styles';
import Video from 'react-native-video';
const getWidth = Dimensions.get('window').width;
const getHeight = Dimensions.get('window').height;
import { NavigationActions } from '@actions/navigate';
// import VIDEO1 from '../../thumbnails/video/video_1.mp4';
// import VIDEO2 from '../../thumbnails/video/video_2.mp4';
// import VIDEO3 from '../../thumbnails/video/video_3.mp4';
// import _ from 'lodash'
const sidePadding = getWidth * 0.05;
let ProgressBarVideo = null;
export default class VideoComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.player = null;
    this.endVideo = false;
    this.isEndVideo = false;
    this.currentTime = this.props.currentTime ? this.props.currentTime : 0;
    const {index} =  this.props
    this.maximum_progress = ((getWidth - (2 * sidePadding) - 40)) - 5;
    this.state = {
      volume: 0,
      progressing:0,
      countSecond:0,
      pauseVideo: true
    }
    if (ProgressBarVideo == null) {
      ProgressBarVideo = require('../progressbar/progressBarVideo').default;
    }
  }

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   // if (
  //   //   nextProps.index !== this.props.index
  //   //   || nextProps.pauseVideo !== this.props.pauseVideo
  //   //   || nextProps.screenDetail !== this.props.screenDetail
  //   //   || nextProps.video !== this.props.video
  //   // ) {
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  //   return true;
  // }

  onProgress = (data) => {
    this.props.onProgress && this.props.onProgress(data.currentTime);
    this.currentTime = data.currentTime;
    let {video:{duration}} = this.props;
    let calProgressing = parseFloat(this.currentTime/duration);
    this.setState({
      progressing: calProgressing,
    });
    // const {runProcessingVideo} = this.props;
    // runProcessingVideo(data.currentTime,this.endVideo);
  }

  onLoad = (data) => {
    //const {index, dashBoardData, isProfile, isAnotherProfile, currentTime} = this.props;
    // if(!this.state.isLoad){
    //   this.setState({isLoad:true});
    // }
    // this.player.seek(this.currentTime);

    // if(dashBoardData && dashBoardData[index]) {
    //   const timeStart = dashBoardData[index].currentTime || 0;
    //   this.player.seek(timeStart)
    // } else if(dashBoardData && index) {
    // }
  }

  onEnd = () => {
    this.currentTime = 0;
    this.props.onEnd();
    let {video:{duration}} = this.props;
    this.setState({
      progressing: duration,
    });
  };

  disableVolumed = () => {
    this.setState({volume:0});
  }
  showFullVideo = () =>{
    const {video:{media_url, cover_url},currentUser,isHideToggleTab,user,screenDetail,runProcessingVideo} = this.props;
    if(screenDetail){
      return null;
    }
    NavigationActions.showFullScreenVideo({
      screen:'video',
      uri: media_url,
      cover_url,
      disableFullVideo: this.disableVolumed, 
      currentTime: this.currentTime,
      dismissVideoFullSCreen: this.dismissVideoFullSCreen,
      isHideToggleTab:isHideToggleTab,
      user:user,
    })
  }

  dismissVideoFullSCreen = (timing,endVideo) => {
    setTimeout(() => {
      if(this.player){
        this.endVideo = endVideo;
        // if(endVideo == -1){
        //   this.props.runProcessingVideo(timing,-1,'fullscreen');
        // }
        this.player.seek(timing);
      }
    }, 1500);
  }

  renderProgressVideo =() => {
    return (
      <ProgressBarVideo
        row
        progress={this.state.progressing}
        duration={100}
        customStyle={[styles.customBar, { width: this.maximum_progress }]} />
    )
  }

  playVideo (currentTime) {
    if(this.player){
      this.player.seek(currentTime);
      this.setState({ pauseVideo: false });
    }
  }

  pauseVideo() {
    this.setState({ pauseVideo: true });
  }

  render() {
    const {video:{cover_url,media_url,duration},goBack,screenDetail} = this.props;
    let {endVideo, pauseVideo} = this.state;
    let timing = parseInt(duration - this.currentTime);
    let countSecond = parseInt(this.currentTime);
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={screenDetail ? goBack : this.showFullVideo}>
        { screenDetail ? (
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              height: getHeight -(getHeight/5),
              justifyContent: 'center',
              alignItems: 'center',
              width:getWidth,
            }}
          >
          {cover_url ? 
            <FastImage resizeMode={'cover'} source={{uri:cover_url}} style={{ height:getHeight - getHeight/5,
              width:getWidth}}/>
            :
            <ActivityIndicator style={styles.loading} size="small" color="#fff" />
          }
          </View>
        ): (
          <Video
            source={{uri: media_url}}
            ref={(ref) => {
              this.player = ref
            }}
            controls={false}
            hideShutterView={true}
            rate={1.0}
            maxBitRate={2000000}
            onLoad={this.onLoad}
            // poster={cover_url}
            // posterResizeMode='cover'
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            paused={pauseVideo}
            volume={this.state.volume}
            repeat={false}
            fullscreenOrientation='portrait'
            resizeMode='cover'
            style={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              height:getHeight - (getHeight/5),
              width:getWidth,
            }}
            onFullscreenPlayerWillDismiss = {this.disableFullVideo}
          />
        )
      }
      {!screenDetail && 
        <LinearGradient pointerEvents={'none'} colors={['transparent', 'rgba(0,0,0,0.5)']} style={styles.linearGradientBottom}>
          <View style={styles.progressContainer}>
            <View style={styles.progressContainerbarLeft}>
              {this.renderProgressVideo()}
            </View>
            {countSecond < 3 && duration > 10 && !endVideo ?
              <Text allowFontScaling={false} style={styles.secondsText}>{timing}s</Text>
              : null}
          </View>
        </LinearGradient>
      }
      </TouchableOpacity>
    );
  }

}