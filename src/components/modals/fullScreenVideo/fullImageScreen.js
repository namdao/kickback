// @flow
/* global requestAnimationFrame */

import React, {Component} from 'react';
import ReactNative, {View,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native';
import Image from '@components/imageProgress';
import * as Progress from 'react-native-progress';
import styles from './styles';
import Swiper from 'react-native-swiper';
import CustomProgressBar from '@components/progressbar';
import CLOSE  from '../../../thumbnails/close_white.png';
import { NavigationActions } from '@actions/navigate';
import ImageZoom from 'react-native-image-pan-zoom';
import LinearGradient from 'react-native-linear-gradient';
// import ImageViewer from 'react-native-image-zoom-viewer';
const getWidth = Dimensions.get('window').width;
const getHeight = Dimensions.get('window').height;
const sidePadding = getWidth * 0.05;
export default class PhotoFullScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.currentPage= 0;
    const {timeautoplay,data} = this.props;
    this.fixTotalSecond = timeautoplay * data.length / 1000;
    this.endOfSlide =false;
    this.interSecond = null;
    this.imgZ;
    this.state={
      lengthItem: data.length,
      currentIndex: 0,
      enableZoom: true,
      progressing: 0,
      pauseVideo: false,
      secondPerItem: timeautoplay/1000,
      isLoading:false,
    }
  }

  getPosition = (index) => {
    this.setState({
      currentIndex: index,
    },this.autoPlaySwiper()
  );

  }

  showImage(photo){
    return (
      
      <ImageZoom 
        ref={node => this.imgZ = node}
        doubleClickInterval={300}
        onClick={this.showCloseButton}
        cropWidth={getWidth}
        pinchToZoom={this.state.enableZoom}
        minScale={0.8}
        maxScale={2.0}
        cropHeight={getHeight}
        style = {{backgroundColor: 'rgb(0,0,1)'}}
        imageWidth={getWidth}       
        onMove= { (data) => {
          if (data.scale != 1) {
            this.setState({pauseVideo: true})
          } else {
            this.setState({pauseVideo: false}, () => {
              if (this.state.currentIndex < this.state.lengthItem) {
                this.autoPlaySwiper();
              }
            })
          }
        }}
        imageHeight={getHeight}>
          <Image
          resizeMode={'cover'}
          style={[styles.styleVideo, {backgroundColor: '#000001'}]}
          source={{uri: photo.media_url}}
          indicator={Progress.Circle}
          indicatorProps={{
            size: 30,
            color: 'rgba(150, 150, 150, 1)',
            unfilledColor: 'rgba(200, 200, 200, 0.2)'
          }}
          onLoadEnd={this._finishLoading}
          />
          {!this.state.isLoading && <ActivityIndicator style={styles.loading} />}
      </ImageZoom>
    );
  }
  _finishLoading = () => {
    if(!this.state.isLoading){
      this.setState({isLoading:true})
    }
  }
  autoPlaySwiper = () => {
    this.swiper && this.swiper.autoplay()
  }
  renderProcessBar = (index) => {
    const {currentIndex, progressing} = this.state;
    const {data, timeautoplay} = this.props;
    let val = 0;
    let isNext = false;
    if(index <= currentIndex){
      isNext = true;
    } else {
      isNext = false;
    }
    return  (
      <CustomProgressBar
        progress={progressing}
        isNext={isNext}
        index={index}
        pauseVideo={this.state.pauseVideo}
        isFullScreen={true}
        width={((getWidth - 2 *sidePadding)/data.length) - 5}
        customStyle={styles.customBar}
        steps={100}
        currentPage={currentIndex}
        autoPlaySwiper={this.autoPlaySwiper}
        duration={timeautoplay}
        current={val}
      />
    );
  }
  showCloseButton = () => {
    const {data} = this.props;
    if (data[0].media_type == 'photo') {
      this.closeFullScreen();
      return;
    }
    // clearTimeout(this.timeout);
    // this.setState({isShowClose: true});
    // this.timeout = setTimeout(() => {
    //   this.setState({isShowClose: false});
    // }, 3000)
  }
  closeFullScreen = () => {
    NavigationActions.toggleTabs(true);
    NavigationActions.pop();
    clearInterval(this.interSecond)
  }
  // generateFakeData = () => {
  //   const {data} = this.props;
  //   let arrFake = [];
  //   data.map((item,key) =>{
  //     arrFake.push({key})
  //   })
  //   return arrFake;
  // }

  onScrollBeginDrag = () => {
    this.setState({enableZoom: false})
  }

  onResponderRelease = () => {
    this.setState({enableZoom: true})
  }

  render() {
    let {data} = this.props;
    const {isShowClose, progressing, pauseVideo,currentIndex} = this.state;
    const heightVideo = getHeight;
    
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.showCloseButton}
        style = {[styles.container, {backgroundColor: '#080808'}]}>
        <Swiper 
          scrollEnabled={!pauseVideo}
          index={currentIndex}
          onScrollBeginDrag= {this.onScrollBeginDrag}
          onTouchEnd={this.onResponderRelease}
          ref={node => this.swiper = node}
          onIndexChanged={this.getPosition}
          loop={false}
          autoplay={!pauseVideo}
          autoplayTimeout={this.state.secondPerItem}
          showsButtons={true}
          nextButton={
            <View style={{width:50,right:-10,height:heightVideo}}>
            </View>
          }
          prevButton={
            <View style={{width:50,left:-10,height:heightVideo}}>
            </View>
          }
          dot={
          <View style={{opacity:0}} />}
          activeDot={
          <View style={{opacity:0}} />}
          >
          {data.map((media,key) => {
            return(
              <View key={key} style = {{backgroundColor: '#080808'}}>
                {this.showImage(media)}
              </View>
            );
          })}
        </Swiper>
        {/* {isShowClose && data[0].media_type != 'photo' ?
          <TouchableOpacity onPress={this.closeFullScreen} style={styles.buttonClose}>
            <ImageRn source={CLOSE}/>
          </TouchableOpacity>  : null} */}
          {data.length > 1 ?
          <LinearGradient pointerEvents={'none'}  
            colors={['transparent','rgba(0,0,0,0.5)']}
            style={styles.progressContainer}>
              <View style={styles.progressContainerbarLeft}>
                {/* <FlatList 
                  keyExtractor = { (item, index) => index.toString()}
                  scrollEnabled={false} 
                  horizontal={true}
                  data={fakeProgress}
                  extraData={progressing}
                  renderItem={this.renderProcessBar}/>  */}
                  {data.map((value,index)=> {
                    return this.renderProcessBar(index);
                  })
                  }
              </View>
          </LinearGradient>
          : 
          <LinearGradient
          colors={['transparent','rgba(0,0,0,0.35)']}
          style={styles.linearBottom}>
          </LinearGradient>}          
        </TouchableOpacity>
    );
  }
}
