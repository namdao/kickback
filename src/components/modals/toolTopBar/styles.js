import { StyleSheet, Dimensions } from 'react-native';

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

const { width, height } = Dimensions.get('window');

// const margin = width * 0.03;
const sidePadding = width * 0.05;
const sizeBox = width * 2.5 / 4;
const heightHeader = height * 0.12;
// const topPadding = width * 0.09;
export default StyleSheet.create({
  container: {
    width, height,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textDot: {
    color: colors.white,
    fontWeight: 'bold',
    marginTop: -20,
    fontSize: fontSizes.hero
  },
  textAutoLike: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.smallRegular,
  },
  sub: {
    alignItems: 'center'
  },
  subContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: heightHeader,
    backgroundColor: 'rgba(0,0,0,0.85)',
    height: heightHeader
  },
  subRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 2 / 5
  }
});
