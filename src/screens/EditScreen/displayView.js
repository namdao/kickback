import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import ButtonBorder from '@components/buttonBorder';
import SAVE from '../../thumbnails/save_picture.png';
import CLOCK from '../../thumbnails/clock_white.png';
import SAVED from '../../thumbnails/saved.png';
import colors from '@constants/colors';
import {getWidthAndHeight} from '@utils/dimensions';
const {width, height} = getWidthAndHeight();

export default class DisplayView extends React.PureComponent {
  render() {
    const {
      maxVideoTime,
      maxLength,
      saved,
      isVideo,
      toggleSave,
      onSubmit,
      addSlide,
      showPickerTime,
      time
    } = this.props;
    const styleIsVideo = isVideo ? {justifyContent: 'space-between', marginBottom: 20} : {justifyContent: 'space-between', marginBottom: 20}
    const styleContainVideo = isVideo ? {width: width * 4/5 + 40, paddingTop: 10} : {};
    const styleBtnVideo = isVideo ? {marginRight: 0} : {};

    return(
      <LinearGradient style = {styles.buttonForm} colors={['transparent', 'rgba(0,0,0,0.35)']}>
        <View style = {[styles.formHorizontal, styleIsVideo]}>
          <TouchableOpacity onPress = {toggleSave} style = {{flexDirection: 'row'}}>
            <Image resizeMode='contain' style = {{marginRight: 10}} source= {saved ? SAVED : SAVE}/> 
            <Text  allowFontScaling={false} style = {styles.saveText}>{saved ? 'Saved': 'Save'}</Text>
          </TouchableOpacity>
          <View style = {{flexDirection: 'row'}}>
            {!isVideo ? (
              <TouchableOpacity onPress={showPickerTime} style = {{flexDirection: 'row'}}>
                <Text  allowFontScaling={false} style = {styles.saveText}>{time}</Text>
                <Image resizeMode='contain' style = {{marginLeft: 10}} source= {CLOCK}/>
              </TouchableOpacity> 
            ) : (
              <View  style = {{flexDirection: 'row'}}>
                <Text  allowFontScaling={false} style = {styles.saveText}>{maxVideoTime}s</Text>
              <Image resizeMode='contain' style = {{marginLeft: 10}} source= {CLOCK}/>
            </View>)}
          </View>
        </View>
        <View style = {[styles.formHorizontal, styleContainVideo]}>
          {!isVideo ? (
            <ButtonBorder
              onPress={onSubmit}
              colorText={colors.black}
              title='Create Post'
              styles={[styles.buttonCreatePost, styleBtnVideo]}
            />
          ) : (
            <ButtonBorder
              onPress={onSubmit}
              colorText={colors.black}
              title='Create Post'
              styles={[styles.buttonCreatePost, styleBtnVideo]}
            />
          )}
          {!isVideo && (
            <View style={[styles.buttonSlide, maxLength == 10 ? {borderColor: 'rgba(255,255,255,0.35)'} : {}]}>
              <TouchableOpacity style={styles.touchableSlide} onPress={addSlide}>
                {maxLength == 10 ? <View style={styles.viewAddMax}>
                  <Text allowFontScaling={false} style={styles.txtAddMax}>Add Slide</Text>
                  <Text allowFontScaling={false} style={styles.numberAddMax}> (max10)</Text>
                  </View> : <Text allowFontScaling={false} style={styles.txtAdd}>Add Slide</Text>}
              </TouchableOpacity>
            </View>
          )}
        
          {/* <ButtonBorder  colorText={'rgba(255,255,255,0.35)'} title='Add Slide' styles={styles.buttonSlide}/>} */}
        {/* <View style = {[styles.formHorizontal,isStyleContainVid]}>
          <ButtonBorder onPress={this.onSubmit} colorText={colors.black} title='Create Post' styles={[styles.buttonCreatePost,isStyleBtnVid]}/>
          {!uri[0].type.includes('video') ? <ButtonBorder onPress={this.addSlide} colorText={colors.white} title='Add Slide' styles={styles.buttonSlide}/>
          : null }
            <ButtonBorder  colorText={colors.holderColor} title='Add Slide' styles={styles.buttonSlide}/>} */}
        </View>
      </LinearGradient>
    )
  }
}