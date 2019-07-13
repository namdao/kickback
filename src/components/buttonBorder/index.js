import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import stylesButton from './styles';
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';
import _ from 'lodash';

const ButtonBorder = (props) => {
  const {
    title = '',
    onPress,
    styles = {},
    colorText = colors.black,
    titleSize = fontSizes.medium,
    fontWeight = 'normal'
  } = props;
  const onPressDebounce = _.debounce(onPress, 400, { leading: true, trailing: false });
  return (
    <TouchableOpacity onPress={onPressDebounce} style = {[stylesButton.container, styles]}>
      <Text allowFontScaling={false} style={[stylesButton.textStyle, {color: colorText, fontSize: titleSize, fontWeight}]}>{title}</Text>
    </TouchableOpacity>
  );
}


export default ButtonBorder;