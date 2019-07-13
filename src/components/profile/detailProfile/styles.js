import {StyleSheet, Dimensions} from 'react-native';

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
const sidePadding = width * 0.05;

export default StyleSheet.create({
  scrollView: {
    width,height,
  },
  container: {
    width,
    backgroundColor:'rgba(0,0,0,0.8)',
    alignItems: 'center',
  },
  avatar: {
    width: (width - sidePadding *2),
    height: height * 0.5,
    marginTop: sidePadding,
  },
  linewhite:{
    backgroundColor: 'white',
    height:1,
    width: width,
  },
  header:{
    backgroundColor:'transparent',
  },
  headerText:{
    fontSize: fontSizes.larger,
    color:colors.white,
    fontWeight: 'bold',
    alignItems:'center',
    fontFamily: 'Sofia Pro',
  },
  textContainer:{
    paddingTop:sidePadding,
  },
  titleText: {
    color: colors.white,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.regular,
    paddingBottom:5,
  },
  scrollStyle: {
    height: height - height * 0.1,
    width,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    paddingTop: 0,
    paddingBottom: 20,
  },
  titleData: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSizes.largeRegular,
    fontFamily: 'Sofia Pro',
  },
  titleDataName:{
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSizes.larger,
    fontFamily: 'Sofia Pro',
  }
});
