import React from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';
import colors from '@constants/colors';
import stylesAvatar from './styles';
import CAMERAICON from '../../thumbnails/camera.png';
import HEADERKICKBACK from '../../thumbnails/header_kickback.png';
import LOGODEFAULT from '../../thumbnails/logo-default.png';
import FastImage from 'react-native-fast-image'


const CoverPage = (props) => {
  const {
    colorText = colors.holderColor,
    onPress,
    source = undefined,
    styles = {}
  } = props;
  return (
    <View>
      {onPress ? <TouchableOpacity onPress={onPress} style = {[stylesAvatar.container, styles]}>
      <View>
        {source ? <FastImage resizeMode={FastImage.resizeMode.cover}
        source={source ? source : HEADERKICKBACK} style = {[stylesAvatar.imageCover, styles]}/> :
          <View style = {stylesAvatar.imageCover}>
            <Text allowFontScaling={false} style={[stylesAvatar.textStyle, {color: colorText}]}>Add Header Photo</Text>
          </View>
        }
      </View>
      </TouchableOpacity> : 
        <View onPress={onPress} style = {[stylesAvatar.container, styles]}>
        <View>
          {source ? <FastImage resizeMode={FastImage.resizeMode.cover}
          source={source ? source : HEADERKICKBACK} style = {[stylesAvatar.imageCover, styles]}/> :
            <View style = {stylesAvatar.imageCover}>
              {/* <Text allowFontScaling={false} style={[stylesAvatar.textStyle, {color: colorText}]}>Add Header Photo</Text> */}
            </View>
          }
        </View>
        </View>
      }
    </View>
  )
}

export default CoverPage;