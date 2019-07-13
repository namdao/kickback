import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const hitSlop = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
const Header = (props) => {
  const {
    mainText,
    leftText,
    leftAction,
    rightText,
    rightAction,
    rightAction1,
    rightAction2,
    noShadow,
    imageLeft,
    actionRight = [],
    styleMainText = {},
    styleContainer = {},
    stylesHeader = {},
    stylesHeaderImage = {},
    stylesHeaderText = {},
    colorTextRight = {},
    colorTextLeft = {},
    isShadow = false
  } = props;
  const containerStyles = noShadow ? styles.containerNoShadow : styles.container;
  return (
    <LinearGradient pointerEvents={'box-none'} colors={isShadow ? ['rgba(0,0,0,0.35)', 'transparent'] : ['transparent', 'transparent']} style={[containerStyles, styleContainer]}>
      <View pointerEvents={'box-none'} style={[styles.headerContainer, stylesHeader]}>
        <View pointerEvents={'box-none'} style={[styles.styleTitle, styleMainText]}>
          {props.children}
          {mainText ? <Text
            numberOfLines={1} ellipsizeMode='tail'
            allowFontScaling={false} style={[styles.headerText, stylesHeaderText]}>{mainText}</Text> : null}
        </View>
        <TouchableOpacity style={[styles.secondaryHeaderImage, stylesHeaderImage]} hitSlop={hitSlop} onPress={leftAction}>
          {imageLeft ? <Image resizeMode='cover' source={imageLeft} /> : null}
          {leftText ? <Text allowFontScaling={false} style={[styles.secondaryHeaderText, styles.cancelText, colorTextLeft]}>{leftText}</Text> : null}
        </TouchableOpacity>
        <View pointerEvents={'box-none'} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {actionRight.map((value, index) => <TouchableOpacity
          key={`${index}`}
          hitSlop={hitSlop}
          style={[styles.secondaryHeaderImage, index > 0 ? { marginLeft: 20 } : {}, value.styleTouchable || {}]}
          onPress={value.action}>
            {value.component ? value.component : null}
            {value.icon ? <Image resizeMode='cover' source={value.icon} /> : null}
            {value.text ? <Text allowFontScaling={false} style={[styles.secondaryHeaderText, colorTextRight]}>{value.text}</Text> : null}
          </TouchableOpacity>)}
        </View>
      </View>
    </LinearGradient>
  );
};

export default Header;

Header.propTypes = {
  mainText: PropTypes.string,
  leftText: PropTypes.string,
  leftAction: PropTypes.func,
  rightText: PropTypes.string,
  rightAction: PropTypes.func,
  noShadow: PropTypes.bool,
};
