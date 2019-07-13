import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
const sizeScreen = getWidthAndHeight();
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';
const {width, height} = sizeScreen;
const sidePadding = width * 0.05;
const styles = StyleSheet.create({
  container: {
    width,
  },
  textStyle: {
    fontFamily: 'Sofia Pro',
  },
  paddingLeftMess: {
    marginLeft: sidePadding,
  },
  userName: {
    color: colors.black,
    // fontFamily: 'Sofia Pro',
    flex: 1,
    lineHeight: 17,
    fontSize: fontSizes.smallerRegular,
    fontWeight: 'bold',
  },
  subMess: {alignItems: 'flex-end', width},
  message: {
    color: colors.black,
    textAlign: 'left',
    flex: 1,
    fontFamily: 'Sofia Pro',
    // lineHeight: fontSizes.regular,
    fontSize: fontSizes.smallerRegular
  },
  frameTime: {
    flexDirection: 'row',
    paddingLeft: sidePadding,
    marginTop: 10,
    alignItems: 'flex-start'
  },
  time: {
    fontFamily: 'Sofia Pro',
    marginTop: -4,
    fontSize: fontSizes.small,
    color:colors.holderDarkColor
  },
  reply: {
    fontFamily: 'SofiaPro-Bold',
    color: colors.holderColorDark,
    fontSize: fontSizes.small,
    color:colors.holderDarkColor
  },
  item: {
    flex: 1,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    paddingTop: sidePadding / 2,
  },
  commentBox: {
    alignItems: 'center',
    height : height * 4/5 - 10
  },
  txtMore:{
    color: colors.black,
    fontFamily:'Sofia Pro'
  },
  wrappedMore:{
    paddingTop: 20, 
    paddingBottom: 20,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  textBackToTop : {
    fontFamily:'Sofia Pro',
    fontSize : fontSizes.smallRegular
  },
  buttonBackToTop: {
    position: 'absolute', 
    bottom: 20, 
    right: 10,
    height: 28, 
    width: 50,
    borderRadius: 8,
    borderWidth:2,
    textAlign:'center',
    alignItems:'center',
    backgroundColor:'#fff',
  }
});
export default styles;
