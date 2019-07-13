import React from 'react';
import {View,
  Image, Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert, Keyboard
} from 'react-native';
import Container from '@components/container';
import ICONBACK from '../../thumbnails/ico-arrow-white.png';
import DRAWING from '../../thumbnails/drawing_picture.png';
import Swiper from 'react-native-swiper';
import ICONDELETE from '../../thumbnails/icon-delete-white.png';
import EDIT from '../../thumbnails/edit_picture.png';
import { NavigationActions } from '@actions/navigate';
import Header from '@components/header';
import styles from './styles';
import { captureRef } from "react-native-view-shot";
import {getWidthAndHeight} from '@utils/dimensions';
import {default as ImagePickerCrop} from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import {checkPermissionRequest} from '@sagas/permissionsSaga';
import {TYPE_CAMERA, TYPE_PHOTO} from '@constants/permissions';
import Picker from 'react-native-picker';
import tinycolor from 'tinycolor2';
import EditTextView from './editTextView';
import ViewDrawing from './viewDrawing';
import DisplayView from './displayView';
import ViewAddText from './viewAddText';
import contentSwiperView from './contentSwiperView';
const {width, height} = getWidthAndHeight();
const sizeDot = width > 375 ? 10 : width > 320 ? 6 : 6; 

class EditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.location = {styles: {top: height / 2, scale: 1}}
    this.currentIndex = 0;
    this.previousTime = '3s';
    this.initClor = {
      a:1,
      h:1,
      l: 0.5,
      s:0.8
    }
    this.state = {
      isSwipeable: true,
      isDrawing: false,
      isCroping: false,
      selectedEditText: null,
      uri: this.props.arrayMedias.map((media) => (
        {
          uri: media.uri,
          originalUri: media.uri,
          uriDrawArray: [],
          text: [],
          styles: null,
          type: media.type,
          fileName: media.fileName
        }
      )),
      time: '3s',
      isAddText: false,
      isChangeText: false,
      isCrop: false,
      loading: false,
      text: 'Edit Text Here!',
      color: {
        a:1,
        h:1,
        l: 0.5,
        s:0.8
      },
      tempColor: {
        a:1,
        h:1,
        l: 0.5,
        s:0.8
      },
      colorCurr: '',
      currentIndex: 0,
      colorsPicker: [''],
      tempText: '',
      isEditing: false,
      saved: false,
      pauseVideo: false,
    }
    this.isVideo = this.props.type.includes('video') ? true : false;
  }

  updateScrollViewRef = (ref) => {
    this.scrollView = ref;
  };

  updateViewRef = (ref) => {
    this.viewRef = ref;
  };

  updateDrawingRef = (ref) => {
    this.drawing = ref;
  };

  onNavigatorEvent(event) {
    switch(event.id) {
      case 'willAppear':
      NavigationActions.setNavigator(this.props.navigator);
      NavigationActions.toggleTabs(false);
       break;
      case 'didAppear':
        break;
      case 'willDisappear':
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }

  revert = () => {
    if (this.state.isDrawing) {
      const value = this.drawing.undo();
      if (value != -1) return;
    }
    this.setState({
      isChangeText: false,
      isAddText: false,
      isDrawing: false,
      color: this.initClor,
      text: 'Edit Text Here',
      selectedEditText: null,
      isCrop: false
    })
  };

  done = () => {
    if (this.state.isCrop) {
      captureRef(this.swiper, {
        format: "jpg",
        quality: 1,
      })
      .then(uri => {
        this.findIndexAndReplace(uri, null, null, this.temptStyles)
        this.setState({isCrop: false});
      },error => console.error("Oops, snapshot failed", error));
      return;
    };
    if (this.state.isChangeText) {
      const {selectedEditText} = this.state;
      const newArrayText = this.state.uri[this.currentIndex].text.slice();
      newArrayText[selectedEditText].value = this.state.tempText;
      newArrayText[selectedEditText].color = this.state.tempColor;
      this.findIndexAndReplace(null, newArrayText);
      this.setState({isChangeText: false, color: this.initClor, text: 'Edit Text Here', selectedEditText: null}, () => {
        setTimeout(() => {
          captureRef(this.swiper, {
            format: "jpg",
            quality: 1,
          })
          .then(uri => {
            this.findIndexAndReplace(uri)
          },error => console.error("Oops, snapshot failed", error));
        }, 300);
      })
      return;
    }
    if (this.state.isDrawing) {
      captureRef(this.viewRef, {
        format: "jpg",
        quality: 1,
      })
      .then(uri => {
        this.findIndexAndReplace(uri);
        this.drawing.save('png', true, 'kickbackCanvas', String(Math.ceil(Math.random() * 100000000)), true, false, false);
      },error => console.error("Oops, snapshot failed", error));
      return;
    }
    if (this.state.isEditing) {
      Keyboard.dismiss();
      this.setState({isEditing: false, text: this.state.tempText})
      return;
    }
    if (this.state.isAddText) {
      this.setState({loading: true});
      captureRef(this.viewRef, {
        format: "jpg",
        quality: 1,
      })
      .then(uri => {
        const arrayText = this.state.uri[this.currentIndex].text || [];
        arrayText.push({value: this.state.text, styles: this.location.styles, color: this.state.color});
        this.findIndexAndReplace(uri, arrayText)
        this.setState({
          loading: false,
          isAddText: false,
          color: this.initClor,
          text: 'Edit Text Here',
          selectedEditText: null
        })
        this.location = {styles: {top: height / 2, scale: 1}}
      },error => console.error("Oops, snapshot failed", error));
    }
  }
  
  back = () => {
    setTimeout(() => {
      NavigationActions.toggleTabs(false);
    },400);
    NavigationActions.showDeleteBox({screen:'editScreen',action:'delete_post',mess:'Delete this post?'})
    // NavigationActions.pop();
  }

  cropImage = () => {
    this.setState({isCrop: true});
  }

  drawingMode = () => {
    this.setState({
      isDrawing: true
    })
  }

  initColor = () => {
    this.setState({
      color: tinycolor('#70c1b3').toHsl()
    })
  }

  addText = () => {
    this.setState({
      isAddText: true
    })
  }
  onChangeText = (text) => {
    this.setState({tempText: text})
  }
  // FIND INDEX AND REPLACE URI AT INDEX
  findIndexAndReplace = (newUri, arrayText = null, uriDrawArray = null, styles = null) => {
    const previousUriArray = this.state.uri;
    var index = previousUriArray.indexOf(previousUriArray[this.currentIndex]);
    if (~index) {
      if (styles) {
        previousUriArray[index].styles = styles;
      }
      if (newUri) {
        previousUriArray[index].uri = newUri;
      }
      if (arrayText && arrayText.length) {
        previousUriArray[index].text = arrayText;
      }
      if (uriDrawArray) {
        previousUriArray[index].uriDrawArray.push(uriDrawArray);
      }
      this.setState({uri: previousUriArray});
    }
  }

  onChangeColor = (color) => {
    if (this.state.isChangeText) {
      if(color.h < 345){
        if(this.state.tempColor.l == 1){
          this.setState({tempColor:{...color,l:0.5}});
        } else{
          this.setState({tempColor: color});
        }
      } else {
        this.setState({tempColor:{...color,l: 1}});
      }
      return;
    }
    if(color.h < 345){
      if(this.state.color.l == 1){
        this.setState({color:{...color,l:0.5}});
      } else{
        this.setState({color});
      }
    } else{
      this.setState({color:{...color,l:1}});
    }
  }
  
  editTextData = () => {
    this.setState({isEditing: true, tempText: this.state.text})
  }

  toggleSave = () => this.setState({saved: !this.state.saved});

  onSubmit = () => {
    const {uri, saved, time} = this.state;
    const uriValid = uri.map((item) => ({uri: item.uri, type: item.type, fileName: item.fileName}));
    const duration = this.props.duration ? this.props.duration : 0;
    this.props.createPost({uri: uriValid, fileName: this.fileName, type: this.type, saved, time,duration});
  }

  addNewImage = (arrayMedias) => {
    const previousUri = [...this.state.uri, ...arrayMedias];
    debugger
    this.setState({uri: previousUri},
      () => {
        this.swiper.scrollBy(previousUri.length - 1 - this.currentIndex, true)
    });
  }

  _setPicture = (response) => {
    const arrayMedias = [];
    response.map((media) => {
      let fileName = media.fileName;
      if (!fileName)
      fileName = media.uri.substr(media.uri.lastIndexOf('/') + 1);
      const ext = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
      let source = {
        uri: media.uri,
        fileName: fileName,
        originalUri: media.uri,
        text: [],
        uriDrawArray: [],
        type: media.mime ? media.mime : `image/${fileName.substr(fileName.lastIndexOf('.') + 1)}`
      };
      arrayMedias.push(source);
    });
    this.addNewImage(arrayMedias);
  }

  addSlide = () => {
    if (this.state.uri.length == 10) {
      // Alert.alert('The number of images must less than 10')
      return;
    }
    const dataListSelectBox = [
      {
        title:'Use Camera',
        onPress: async () => {
          const response = await checkPermissionRequest({type: TYPE_CAMERA});
          if (response) {
            NavigationActions.navigateToCamera({addSlide: this.addNewImage, isAddSlide: true});
          }
        }
      },{
        title: 'Photo Library',
        onPress: async () => {
          const response = await checkPermissionRequest({type: TYPE_PHOTO});
          if (response) {
            ImagePickerCrop.openPicker({
              path: response.uri,
              width,
              height,
              multiple: true,
              maxFiles: 10 - this.state.uri.length,
              compressImageQuality: 0.8,
              compressImageMaxWidth: 480,
              compressImageMaxHeight: 640,
              cropping: true,
              forceJpg: true,
              mediaType: 'photo'
            }).then(async data => {
              NavigationActions.toggleTabs(false);
              data = data.map((media) => ({...media, uri: media.path}))
              const sequenceCropImage = data.map((media, index) => {
                return (
                  () => {
                    return ImagePickerCrop.openCropper({
                      path: media.path,
                      width,
                      height,
                      compressImageQuality: 0.8,
                      compressImageMaxWidth: 480,
                      compressImageMaxHeight: 640,
                      cropping: true,
                      forceJpg: true,
                    }).catch((err)=>{
                      NavigationActions.toggleTabs(false);
                      console.log(err);
                    })
                  }
                )
              });
              this.setState({isCroping: true})
              for (let i =0 ; i < sequenceCropImage.length; i++) {
                try {
                  const response = await sequenceCropImage[i]();
                  data[i].uri = response.path;
                  NavigationActions.toggleTabs(false);
                  if (i == sequenceCropImage.length - 1) {
                    this._setPicture(data);
                    this.setState({isCroping: false})
                  }
                } catch(error) {
                  this.setState({isCroping: false})
                }
              }
            });
          }
        }
      }
    ];
    setTimeout(() => {
      NavigationActions.toggleTabs(false);
    },400);
    NavigationActions.showListSelectBox({dataListSelectBox});
  }

  getPosition = (index) => {
    this.currentIndex= index;
    this.setState({currentIndex: index})
  }

  delete = () => {
    const {uri} = this.state;
    if (uri.length == 1) {
      NavigationActions.pop();
    } else {
      let array = this.remove(uri, this.currentIndex);
      this.currentIndex = 0;
      this.setState({uri: array, currentIndex: 0});
    }
  }

  deleteModalBox = () => {
    setTimeout(() => {
      NavigationActions.toggleTabs(false);
    },400);
    NavigationActions.showDeleteBox({onDelete:this.delete,screen:'editScreen',action:'delete_photo',mess:'Delete this photo?'})
  }

  onSketchSaved = (success, path) => {
    if (success) {
      this.findIndexAndReplace(null, null, path);
      this.setState({isDrawing: false, color: this.initClor, text: 'Edit Text Here'})
    } else {
      Alert.alert(success ? 'Image saved!' : 'Failed to save image!')
    }
  }

  onPressText = (text, index) => () => {
    let color = this.state.uri[this.currentIndex].text[index].color;
    this.setState({
      tempColor: color,
      isChangeText: true,
      text: text.value,
      tempText: text.value,
      color: text.color,
      selectedEditText: index,
    });
  };

  onEndDragText = (index) => (event, styles) => {
    const newUri = this.state.uri.slice();
    newUri[this.currentIndex].text[index].styles = styles;
    captureRef(this.swiper, {
      format: "jpg",
      quality: 1,
    })
    .then(uri => {
      this.findIndexAndReplace(uri)
      this.setState({
        isSwipeable: true,
        uri: newUri,
        loading: false,
        isAddText: false,
        color: this.initClor,
        text: 'Edit Text Here',
        selectedEditText: null
      })
      this.location = {styles: {top: height / 2, scale: 1}}
    },error => console.error("Oops, snapshot failed", error));
  };

  showPickerTime = () => {
    this.previousTime = this.state.time;
    this.setState({isShowPicker: true});
    Picker.init({
      pickerToolBarBg: [232, 232, 232, 1],
      pickerBg: [255,255,255, 1],
      pickerTitleText: 'Set Time',
      selectedValue: [this.previousTime],
      pickerConfirmBtnText: 'OK',
      pickerCancelBtnText: 'Cancel',
      pickerData: ['1s', '2s', '3s', '5s', '10s'],
      onPickerConfirm: data => this.setState({isShowPicker: false}),
      onPickerCancel: data => this.setState({time: this.previousTime, isShowPicker: false}),
      onPickerSelect: data => this.setState({time: data[0]})
    });
    Picker.show();
  }

  hidePicker = () => {
    this.setState({isShowPicker: false});
    Picker.hide();
  }

  remove(array, idx) {
    return array.filter((el, index) => index !== idx);
  }

  pauseVideo = () => {
    this.setState({pauseVideo: !this.state.pauseVideo})
  }
  
  // RENDER HEADER DEFAULT
  _renderHeaderDefault = () => {
    const actionRight = this.state.uri[0].type.includes('video') ? [] : [
      // {
      //   component: <Image source={CROP} style={{top: 2, right: 2}} resizeMode={'cover'}/>,
      //   action: this.cropImage,
      // },
      {
        component: <Image source={EDIT} style={{top: 5}} resizeMode={'cover'}/>,
        action: this.addText,
      },{
        component: <Image source={DRAWING} style={{top: 2}} resizeMode={'cover'}/>,
        action: this.drawingMode,
      },{
        component: <Image source={ICONDELETE} style={{right: -2}} resizeMode={'cover'}/>,
        action: this.deleteModalBox,
      }];
    return (
      <View pointerEvents={'box-none'} style = {styles.headerGradient}>
        <Header
          isShadow={true}
          leftAction={this.back} 
          actionRight={actionRight}
          // imageRight2={EDIT}
          colorTextRight={{color: 'white'}}
          // rightAction2={this.addText}
          stylesHeaderImage={{marginRight: 10}}
          imageLeft={ICONBACK} noShadow={true} stylesHeader={styles.header}/>
      </View>
    )
  }
  // RENDER HEADER EDITING
  _renderHeaderDrawing = () => {
    const {isCrop} = this.state;
    return(
      <View pointerEvents={'box-none'} style = {styles.headerGradient}>
        <Header isShadow={true} leftAction={this.back} 
        actionRight={[{
          text: 'DONE' ,
          action: this.done,
        }]}
        leftText={!isCrop ? 'UNDO' : null}
        leftAction={this.revert}
        colorTextRight={{color: 'white'}}
        colorTextLeft={{color: 'white'}}
        stylesHeaderImage={{marginRight: 10}}
        noShadow={true}
        isShadow={true} stylesHeader={styles.header}/>
      </View>
    )
  }
  // RENDER HEADER DEFAULT
  _renderHeader = () => {
    const {isDrawing, isAddText, isCrop, isChangeText} = this.state;
    if (!isDrawing && !isAddText && !isChangeText && !isCrop) {
      return this._renderHeaderDefault()
    } else {
      return this._renderHeaderDrawing()
    }
  }

  render() {
    const {
      isDrawing,
      isAddText,
      uri = [],
      color,
      text,
      isEditing,
      tempText,
      isCrop,
      saved,
      pauseVideo,
      time,
      isShowPicker,
      isSwipeable,
      isChangeText,
      tempColor,
      isCroping
    } = this.state;

    const {videoTime} = this.props;
    const valueVideoTime = Math.floor(videoTime);
    const exValueVideoTime = valueVideoTime + 1;
    const photoPath = uri[this.currentIndex].uri.replace('file://', '');
    const overLayColor = tinycolor(color).toHslString()
    return (
      <Container stylesContainer={{backgroundColor: 'transparent'}}>
        {!(isDrawing || isAddText) && (
          this.isVideo ? 
          <View style = {styles.image}>
            <Video
            source={{uri: uri[this.currentIndex].uri}}
            ref={(ref) => {
              this.player = ref
            }}
            onBuffer={this.onBuffer}               
            onError={this.videoError} 
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            paused={pauseVideo}
            volume={this.state.volume}
            repeat={true}
            fullscreenOrientation='portrait'
            resizeMode='cover'
            style={styles.stylesVideo}
            onFullscreenPlayerWillDismiss = {this.disableFullVideo}/>
            {pauseVideo ? <View style = {[styles.image, 
              {position: 'absolute', justifyContent: 'center',
              alignItems: 'center',backgroundColor: 'rgba(0,0,0,0.5)'}]}>
              <Text allowFontScaling={false} style = {styles.buttonPlay}>Play</Text>
            </View> : null}
          </View> :
           <View style = {styles.viewSwiper}>
            <Swiper
              ref={node => this.swiper = node}
              onIndexChanged={this.getPosition}
              index={this.state.currentIndex}
              loop={false}
              scrollEnabled={isSwipeable && !isCrop}
              key={`${uri.length}`}
              dot={<View style={[{backgroundColor:'transparent', width: sizeDot, borderWidth: 2, borderColor: 'white', height: sizeDot,borderRadius: sizeDot/2, marginLeft: 3, marginRight: 3}, styles.marginBottomDot]} />}
              activeDot={<View style={[{backgroundColor:'white', width: sizeDot, height: sizeDot,borderRadius: sizeDot/2, marginLeft: 3, marginRight: 3}, styles.marginBottomDot]} />}
              style = {styles.swiper}
              onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}>
              {
                contentSwiperView({
                  uri,
                  onEnd: (event, styles) => {
                    this.temptStyles = styles;
                  },
                  onPressText: this.onPressText,
                  onEndDragText: this.onEndDragText,
                  onStart: () => {this.setState({isSwipeable: false})},
                  isCrop
                })
              }
              </Swiper>
            </View>
          )}

        {/* RENDER EDIT TEXT VIEW */}
        {isChangeText && (<EditTextView
          text={tempText}
          color={tempColor}
          onChangeColor={this.onChangeColor}
          onChangeText={this.onChangeText}
          onDone={this.done}
          updateScrollViewRef = {this.updateScrollViewRef}/>
        )}

        {/* RENDER VIEW ADD TEXT */}
        {isAddText && (<ViewAddText
          overLayColor={overLayColor}
          editTextData={this.editTextData}
          onChangeText={this.onChangeText}
          onChangeColor={this.onChangeColor}
          color={color}
          tempText={tempText}
          onKeyboardWillHide={(frames: Object) => {
            this.setState({isEditing: false, text: tempText})
          }}
          isEditing={isEditing}
          onEnd={(event, styles) => {
            this.location = {
              styles
            }
          }}
          text={text}
          updateScrollViewRef = {this.updateScrollViewRef}
          uri={uri[this.currentIndex].uri}
          updateViewRef={this.updateViewRef}

        />)}

        {/* RENDER DRAWING VIEW */}
        {isDrawing && (<ViewDrawing
          color={color}
          onChangeColor={this.onChangeColor}
          uri={uri[this.currentIndex].uri}
          updateDrawingRef={this.updateDrawingRef}
          updateViewRef={this.updateViewRef}
          overLayColor={overLayColor}
          onSketchSaved={this.onSketchSaved}
        />)}

        {/* DISPLAY VIEW */}
        {!isDrawing && !isAddText && !isCrop && (<DisplayView
          maxVideoTime={valueVideoTime}
          saved={saved}
          maxLength={uri.length}
          addSlide={this.addSlide}
          time={time}
          onSubmit={this.onSubmit}
          isVideo={this.isVideo}
          showPickerTime={this.showPickerTime}
          toggleSave={this.toggleSave}
        />)}

        {/* RENDER HEADER */}
        {this._renderHeader()}

        {isShowPicker ? <TouchableOpacity onPress = {this.hidePicker} style = {styles.pickerHide}/> : null }
        {isCroping && (
          <View style = {styles.indicator}>
            <ActivityIndicator
              animating={true}
              color={'gray'}
            />
          </View>
        )}
      </Container>
    );
  }
};

export default EditScreen;
