import {StyleSheet, Dimensions} from 'react-native';

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

const {width, height} = Dimensions.get('window');

// const margin = width * 0.03;
const sidePadding = width * 0.05;
const sizeBox = width * 2.5 / 4;
const imageButton = sizeBox / 10;
// const topPadding = width * 0.09;
export default StyleSheet.create({
  container: {
    width: width, height: height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.black,
    fontWeight: 'bold',
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.hero
  }
});
