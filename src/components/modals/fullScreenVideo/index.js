import React from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import styles from './styles';
import ButtonBorder from '@components/buttonBorder';
import { NavigationActions } from '@actions/navigate';
import CLOSE from '../../../thumbnails/close_white.png';
import { TYPE_CAMERA, TYPE_PHOTO } from '@constants/permissions';
import { checkPermissionRequest } from '@sagas/permissionsSaga';
import ProgressBarVideo from '@components/progressbar/progressBarVideo';
import PhotoFullScreenComponent from './fullImageScreen';
import Video from 'react-native-video';
// import HeaderComponent from '@components/feedEntity/headerFeed';
let HeaderComponent = null;
import LinearGradient from 'react-native-linear-gradient';
class FullScreenVideo extends React.PureComponent {

  constructor(props) {
    super(props);
    this.player = null;
    this.timeout = null;
    this.isLoad = false;
    this.duration = 0;
    this.endVideo = 0;
    this.currentTime = 0;
    this.state = {
      volume: 0,
      currentTime: this.props.currentTime,
      displaySecond: true,
      pause: false,
      pauseBoolean: false,
      progress: 0,
    }
    this.onEndVideo = this.onEndVideo.bind(this);
    this.closeFullScreen = this.closeFullScreen.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    if(HeaderComponent == null){
      HeaderComponent = require("../../../containers/headerContainer/headerContainer").default;
    }
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        if(this.state.pauseBoolean){
          this.setState({ pauseBoolean: false })
        }
        NavigationActions.setNavigator(this.props.navigator);
        NavigationActions.toggleTabs(false);
        break;
      case 'didAppear':
        break;
      case 'willDisappear':
        if(!this.state.pauseBoolean){
          this.setState({ pauseBoolean: true })
        }
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }

  onProgress = (data) => {
    if (data.currentTime != 0) {
      if (!this.isLoad) {
        this.isLoad = true;
        // this.setState({ isLoad: true });
      }
    }
    // this.props.runProcessingVideo(data.currentTime,0,'fullscreen');
    this.setState({
      currentTime: parseFloat(data.currentTime),
      progress: parseFloat(data.currentTime / this.duration),
    });
  }

  // showCloseButton = () => {
  //   clearTimeout(this.timeout);
  //   this.setState({ isShowClose: true });
  //   this.timeout = setTimeout(() => {
  //     this.setState({ isShowClose: false });
  //   }, 3000)
  // }

  onLoad = (data) => {

    const { currentTime } = this.state;
    this.player.seek(currentTime);
    this.duration = data.duration;
    // this.timeout = setTimeout(() => {
    //   this.setState({ isShowClose: false });
    // }, 3000)
    // this.setState({ duration: parseFloat(data.duration) });
  }
  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return {
        timing: parseInt(parseFloat(this.state.duration) - parseFloat(this.state.currentTime)),
        miliSecond: parseFloat(this.state.duration) - parseFloat(this.state.currentTime)
      };
    } else {
      return 0;
    }
  }
  closeFullScreen = () => {
    if(this.endVideo == -1){
      this.props.dismissVideoFullSCreen(this.state.duration, this.endVideo)
    }
    else{
      this.props.dismissVideoFullSCreen(this.state.currentTime, this.endVideo)
    }
    NavigationActions.pop();
  }

  onPress = () => NavigationActions.pop();

  onEndVideo = () => {
    // let resetTimeout = setTimeout(()=>{
    //   this.endVideo = 0;
    //   // this.props.runProcessingVideo(0, 0,'fullscreen');
    //   this.player && this.player.seek(0);
    // }, 2000);
    this.setState({progress: this.duration});
  };

  renderFullVideo = () => {
    const { uri, userReducer, setPauseVideo, isHideToggleTab, cover_url ,user} = this.props;
    const { timing, miliSecond } = this.getCurrentTimePercentage();
    const {pauseBoolean } = this.state;

    return (
      <TouchableOpacity
        onPress={this.closeFullScreen}
        activeOpacity={1}
        style={styles.container}
      >
        <Image style={styles.loading} resizeMode={'cover'} source={{ uri: cover_url }} />
        <Video source={{ uri: uri }}
          ref={(ref) => {
            this.player = ref
          }}
          ignoreSilentSwitch={"ignore"}
          // onBuffer={this.onBuffer}
          // onError={this.videoError}
          // poster={cover_url}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          volume={1}
          paused={pauseBoolean}
          controls={false}
          hideShutterView={false}
          onEnd={this.onEndVideo}
          repeat={false}
          fullscreenOrientation='landscape'
          resizeMode={"cover"}
          style={styles.styleVideo}
          // onFullscreenPlayerWillDismiss={this.disableFullVideo}
        />
        <View style={{ position: 'absolute', top: 0, left: 0 }}>
          <HeaderComponent
            isShowLeftIcon={false}
            currentUser={userReducer}
            setPauseVideo={setPauseVideo}
            isHideToggleTab={isHideToggleTab}
            header={user}
             />
        </View>
        {!this.isLoad ? <ActivityIndicator style={styles.loading} size="small"/> : null }
        {/* {!this.state.isLoad ? <Image style={styles.loading} source={{ uri: cover_url }} /> : null} */}
        {/* {isShowClose ?
          <TouchableOpacity onPress={this.closeFullScreen} style={styles.buttonClose}>
            <Image source={CLOSE} />
          </TouchableOpacity>
          : null
        } */}
        {miliSecond != 0 && this.isLoad ?
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.35)']}
            style={styles.linearBottom}>
            <View style={styles.progressContainerbar}>
              <ProgressBarVideo
                row
                progress={timing != 0 ? this.state.progress : 1}
                duration={100}
                customStyle={styles.customBar}
              />

              <View style={styles.secondsContainer}>
                {timing > 0 && this.state.duration > 10 ?
                  <Text allowFontScaling={false} style={styles.secondsText}>{miliSecond > 0 ? timing + 's' : null}</Text>
                  : null}
              </View>
            </View>
          </LinearGradient> : null}
      </TouchableOpacity>
    );
  }

  renderFullPhoto = () => {
    const { data, timeautoplay, listProgressBar, post_id, userReducer, setPauseVideo, isHideToggleTab, user } = this.props;
    return (
      <View style={[styles.container, { justifyContent: 'flex-start' }]}>
        <PhotoFullScreenComponent
          data={data}
          timeautoplay={timeautoplay}
          post_id={post_id}
          listProgressBar={listProgressBar}
        />
        <HeaderComponent
          isShowLeftIcon={false}
          currentUser={userReducer}
          setPauseVideo={setPauseVideo}
          isHideToggleTab={isHideToggleTab}
          header={user}
        />
      </View>
    );
  }
  render() {
    const { screen } = this.props;
    if (screen == 'video') {
      return this.renderFullVideo();
    } else {
      return this.renderFullPhoto();
    }
  }
}
export default FullScreenVideo;