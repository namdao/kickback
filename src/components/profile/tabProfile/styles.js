import {StyleSheet, Dimensions} from 'react-native';

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
const heightButtonTab = height / 13;
const sizeIcon = heightButtonTab - heightButtonTab / 1.5
export default StyleSheet.create({
  tab: {height: heightButtonTab, width, flexDirection: 'row'},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width/2,
    height: heightButtonTab,
    borderWidth: 1,
    borderColor: colors.holderColor
  },
  iconStyle: {
    width: sizeIcon,
    height: sizeIcon
  },
  text: {
    fontSize: fontSizes.small,
    fontFamily: 'Sofia Pro'
  }
});
