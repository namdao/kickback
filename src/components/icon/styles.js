import {StyleSheet, Dimensions} from 'react-native';
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';
import {getWidthAndHeight} from '@utils/dimensions'

const {width, height} = getWidthAndHeight();
const margin = width * 0.03;
const sidePadding = width * 0.1;
const topPadding = height * 0.1 - 50;

export default StyleSheet.create({
  Container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    alignItems: 'center',
    paddingTop: topPadding,
  },
  TextContainer: {
    paddingTop: height * 0.03,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    width: width -10
  },
  mainText: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSizes.largeRegular,
    fontWeight: '400',
    lineHeight: 25,
  },
  SubTextContainer:{
    marginTop: height * 0.03,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    width
  },
  subText: {
    fontSize: fontSizes.smallRegular,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 19
  },
});
