import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
} from 'react-native';
import LETTER from '../../thumbnails/ico-letter.png';
import CHECK from '../../thumbnails/ico-check.png';
import USER from '../../thumbnails/ico-user.png';
import styles from './styles';

const hitSlop = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
const Icon = (props) => {
  const {
    typeIcon,
    mainText,
    subText,
    stylesSubText,
    styleMainText,
  } = props;
  let iconSource = '';
  if(typeIcon == 'letter') {
    iconSource = LETTER;
  }
  else if(typeIcon == 'check') {
    iconSource = CHECK;
  }
  else if(typeIcon == 'user') {
    iconSource = USER;
  }
  return (
    <View style={styles.Container}>
      <View style={styles.iconContainer}>
        <Image resizeMode='contain' source={iconSource}/>
      </View>
      <View style={[styles.TextContainer,styleMainText]}>
        <Text allowFontScaling={false} style={styles.mainText}>{mainText}</Text>
      </View>
      {subText ? <View style={[styles.SubTextContainer,stylesSubText]}>
        <Text allowFontScaling={false} style={styles.subText}>{subText}</Text>
      </View> : null }
      {props.children}
    </View>
  );
};

export default Icon;

Icon.propTypes = {
  mainText: PropTypes.string,
  subText: PropTypes.string,
  typeIcon: PropTypes.string,
};
