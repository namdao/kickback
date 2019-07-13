import React from 'react';
import { View, TouchableOpacity, Text, Image, NativeModules, LayoutAnimation,ActivityIndicator } from 'react-native';
import Icon from 'react-native-ionicons'

import Container from '@components/container';
import Header from '@components/header';
import styles from './styles'
import { NavigationActions } from '@actions/navigate';
import ICONBACK from '../../thumbnails/ico-arrow-white.png';
import { default as ImagePickerCrop } from 'react-native-image-crop-picker';
import { RNCamera } from 'react-native-camera';
import shortid from 'shortid'
import { getWidthAndHeight } from '@utils/dimensions';
const { width, height } = getWidthAndHeight();
import AnimatedCircularProgress from '../../components/customProgressVideo/animatedCircularProgress';
import buttonCamera from '../../thumbnails/buttonCamera.png';
import MediaMeta from 'react-native-media-meta';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.take = false;
    this.camera = null;
    this.maximumFill = 300;
    this.state = {
      isShowCapture: false,
      fill: 300,
      r1: 32.5,
      r2: 38.5,
      cameraType: RNCamera.Constants.Type.back,
      mirrorImg: false,
      isShowCamera: true
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    // setTimeout(() => this.setState({ isShowCapture: true }), 2000);
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        NavigationActions.setNavigator(this.props.navigator);
        NavigationActions.toggleTabs(false);
        if(!this.state.isShowCamera){
          this.setState({isShowCamera:true})
        }
        break;
      case 'didAppear':
        break;
      case 'willDisappear':
      if(this.state.isShowCamera){
        this.setState({isShowCamera:false},()=>{
          this.resetProgressBar();
        })
      }
      break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }
  _setPicture = (response) => {
    const arrayMedias = [];
    response.map((media) => {
      let fileName = media.fileName;
      if (!fileName) {
        fileName = Array.isArray(media.path) ?
          path.split('id=')[1].split('&')[0] :
          shortid();
      }
      let source = {
        uri: media.path,
        fileName: `${fileName}.jpg`,
        type: `image/jpg`,
        originalUri: media.path,
        text: [],
        uriDrawArray: [],
      };
      arrayMedias.push(source);
    });
    if (this.props.isAddSlide) {
      NavigationActions.pop();
      this.props.addSlide(arrayMedias);
      return;
    };
    NavigationActions.navigateToEditScreen({arrayMedias, type: response[0].mime});
  }
  _setVideo = (response) => {
    const arrayMedias = [];
    let fileName = response.fileName;
    if (!fileName) {
      fileName = Array.isArray(response.path) ?
        path.split('id=')[1].split('&')[0] :
        shortid();
    }
    const videoPath = response.uri.replace('file://', '');
    let duration = 0;
    MediaMeta.get(videoPath).then((metadata) => {
      duration = metadata.duration;
      let source = {
        uri: response.uri,
        fileName: `${fileName}.mp4`,
        type: 'video/mp4',
        videoTime: duration/1000
      };
      arrayMedias.push(source);
      this.setState({ fill: 300 }, () => {
        NavigationActions.navigateToEditScreen({arrayMedias, type: 'video', videoTime: source.videoTime,duration:duration/1000});
      });
    });
  }
  back = () => NavigationActions.pop();
  takePicture = async () => {
    if (!this.take) {
      this.take = true;
      this.setState({ r1: this.state.r1 + 4, r2: this.state.r2 + 4 });
      if (this.camera) {
        try{
          const data = await this.camera.takePictureAsync({quality:0.6,width:width*1.5, mirrorImage: this.state.mirrorImg})
          // if (!this.props.isAddSlide) {
          //   NavigationActions.pop();
          // }
          ImagePickerCrop.openCropper({
            path: data.uri,
            width,
            height,
            compressImageQuality: 0.8,
            compressImageMaxWidth: 816,
            compressImageMaxHeight: 1088,
          }).then(data => {
            this.take = false;
            this._setPicture([data]);
          }).catch((err) => {
            this.take = false;
            this.resetProgressBar();
            NavigationActions.toggleTabs(false);
            console.log(err);
          });
        }
        catch(err){
          NavigationActions.pop();
        }
      }
    }
  };
  // Reset circle progress when navigate to edit screen
  
  resetProgressBar = () => {
    clearInterval(this.intervalId);
    this.setState({ fill: this.maximumFill, r1: 32.75, r2: 38.5 })
  }
  runningProgress = () => {
    if (!this.props.isAddSlide) {
      var isCap = false;
      this.setState({ r1: this.state.r1 + 4, r2: this.state.r2 + 4 })
      this.intervalId = setInterval(() => {
        const newFill = this.state.fill - 0.98;
        this.setState({ fill: newFill }, () => {
          if (!isCap) {
            isCap = true;
            LayoutAnimation.spring();
            this.camera.recordAsync({
              quality: RNCamera.Constants.VideoQuality["480p"],
              maxDuration: 60
            }).then((data) => {
              this._setVideo(data)
            }).catch(err => {
            });
          }
        })
      }, 190);
    }
  }
  stopRunningProgress = () => {
    this.camera.stopRecording();
    clearInterval(this.intervalId);
    this.setState({ fill: this.maximumFill, r1: 32.75, r2: 38.5 })
  }

  changeCameraType = () => {
    if (this.state.cameraType === RNCamera.Constants.Type.back) {
      this.setState({ ...this.state, cameraType: RNCamera.Constants.Type.front,mirrorImg:true });
    } else {
      this.setState({ ...this.state, cameraType: RNCamera.Constants.Type.back,mirrorImg:false });
    }
  }
  cameraReady = () =>{
    if(!this.state.isShowCapture){
      this.setState({ isShowCapture: true })
    }
  }
  render() {
    const { isShowCapture, r1, r2 , isShowCamera } = this.state;
    if(!isShowCamera) {
      return <ActivityIndicator style={styles.loading} size="small" color="#fff"  />
    };
    return (
      <Container>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          // captureQuality={Camera.constants.CaptureQuality.high}
          // aspect={RNCamera.constants.Aspect.fill}
          videoQuality={'480p'}
          onCameraReady={this.cameraReady}
          autoFocus="on"
          focusDepth={0.5}
          // captureTarget={RNCamera.constants.CaptureTarget.disk}
          style={styles.ctnCamera}
          type={this.state.cameraType}
          // flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'} />
        {isShowCapture && 
        <View style={styles.buttonCapture}>
         <TouchableOpacity
            style={styles.buttonSwitchCamera}
            onPress={this.changeCameraType} >
            <Icon color="white" name="reverse-camera" size={50}></Icon>
          </TouchableOpacity>
          <Header
            leftAction={this.back} imageLeft={ICONBACK}
            noShadow={true} stylesHeader={styles.header}
          />
          <View style={styles.w100}>
              <View style={styles.containerButtons}>
                <AnimatedCircularProgress
                  size={100}
                  r1={r1}
                  r2={r2}
                  width={50}
                  fill={this.state.fill}
                  prefill={this.maximumFill}
                  tintColor="white"
                  linecap="round"
                  style={styles.flexCenterAll}
                >
                  {
                    (fill) => (
                      <TouchableOpacity
                        onPress={this.takePicture}
                        onLongPress={this.runningProgress}
                        onPressOut={this.stopRunningProgress}
                        style={styles.btnTakePicture}
                      >
                        <Image source={buttonCamera} />

                      </TouchableOpacity>
                    )
                  }
                </AnimatedCircularProgress>
              </View>
          </View>
        </View>}
      </Container>
    );
  }
};

export default CameraScreen;