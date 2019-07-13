import {StyleSheet, Dimensions} from 'react-native';

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

const {width, height} = Dimensions.get('window');

// const margin = width * 0.03;
// const sidePadding = width * 0.05;
// const topPadding = width * 0.09;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subModal: {
    backgroundColor: colors.white,
    height: 100,
    width: 100,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    color: colors.red,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.title
  }
});
