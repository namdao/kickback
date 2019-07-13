import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import colors from '@constants/colors';
import stylesAvatar from './styles';
import CAMERAICON from '../../thumbnails/camera.png';
import HEADERKICKBACK from '../../thumbnails/header_kickback.png';
import LOGODEFAULT from '../../thumbnails/logo-small.png';
import LOGOSMALL from '../../thumbnails/logo-very-small.png';
import FastImage from 'react-native-fast-image'
import Image from '@components/imageProgress';
import * as Progress from 'react-native-progress';
import { getWidthAndHeight } from '@utils/dimensions';
const sizeScreen = getWidthAndHeight();
const Avatar = (props) => {
  const {
    isSmall = false,
    onPress,
    source = undefined,
    styles = { width: 100, height: 100 },
    stylesImg = {}
  } = props;
  let validAvatar = source ? source : !isSmall ? LOGODEFAULT : LOGOSMALL;
  validAvatar = validAvatar && source && source.uri ? source : !isSmall ? LOGODEFAULT : LOGOSMALL;
  return (
    <TouchableOpacity onPress={onPress} style={[stylesAvatar.container, styles, stylesImg]}>
      <Image resizeMode={'contain'} source={validAvatar} style={[stylesAvatar.imageAvatar, styles]} />
    </TouchableOpacity>
  )
}

const ChooseAvatarButton = (props) => {
  const {
    title = 'Add User Photo',
    colorText = colors.holderColor,
    onPress,
    source = undefined,
    styles = { width: 100, height: 100 }
  } = props;
  return (
    <View>
      {onPress ? <TouchableOpacity onPress={onPress} style={[stylesAvatar.container, styles]}>
        {source ?
          <Image resizeMode={'cover'}
            borderRadius={sizeScreen.width <= 320 ? 60 : 75}
            source={source ? source : HEADERKICKBACK} style={[stylesAvatar.imageAvatar, styles, { marginTop: 0, borderWidth: 0 }]} /> :
          <View style={stylesAvatar.subContainer}>
            <Image
              indicator={Progress.Circle}
              indicatorProps={{
                size: 20,
                borderWidth: 0,
                color: 'rgba(150, 150, 150, 1)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
              resizeMode='contain' style={[{ width: styles.width / 4, height: styles.width / 4 }]} source={CAMERAICON} />
            <Text allowFontScaling={false} style={[stylesAvatar.textStyle, { color: colorText }]}>{title}</Text>
          </View>
        }
      </TouchableOpacity> :
        <View onPress={onPress} style={[stylesAvatar.container, styles]}>
          {source ? <Image
            indicator={Progress.Circle}
            indicatorProps={{
              size: 20,
              borderWidth: 0,
              color: 'rgba(150, 150, 150, 1)',
              unfilledColor: 'rgba(200, 200, 200, 0.2)'
            }}
            resizeMode={'cover'}
            source={source ? source : HEADERKICKBACK} style={[stylesAvatar.imageAvatar, styles, { marginTop: 0, borderWidth: 1 }]} /> :
            <View style={stylesAvatar.subContainer}>
              <Image
                indicator={Progress.Circle}
                indicatorProps={{
                  size: 20,
                  borderWidth: 0,
                  color: 'rgba(150, 150, 150, 1)',
                  unfilledColor: 'rgba(200, 200, 200, 0.2)'
                }}
                resizeMode='contain' style={[{ width: styles.width / 4, height: styles.width / 4 }]} source={CAMERAICON} />
              <Text allowFontScaling={false} style={[stylesAvatar.textStyle, { color: colorText }]}>{title}</Text>
            </View>
          }
        </View>
      }
    </View>
  )
}

export { Avatar, ChooseAvatarButton };