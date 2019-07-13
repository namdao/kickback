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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    justifyContent: 'center',
    height: 50,
    alignItems: 'center'
  },
  text: {
    fontSize: fontSizes.regular,
    fontFamily: 'Sofia Pro'
  },
  separateLine: {
    width: sizeBox,
    height: 1,
    backgroundColor: '#BCBCBC'
  },
  subModal: {
    width: sizeBox,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 20,
  }
});
