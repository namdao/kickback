import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
import colors from '@constants/colors';
const {width, height} = getWidthAndHeight();
import fontSizes from '@constants/font-sizes';
const styles = StyleSheet.create({
  container: {
    width: width,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    justifyContent: 'center',
    paddingLeft: height * 0.05,
    width,
    paddingTop: 20,
    paddingBottom: 30
  },
  activeText: {
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.largeRegular,
    width: width * 0.7
  },
  activeContent : {
    fontFamily : 'Sofia Pro',
    fontSize: fontSizes.smallRegular,
    color : colors.lightBlack,
    width: width * 0.7,
    top : 5,
  },
  unactiveText: {
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.largeRegular,
    width: width * 0.7,
    color : colors.holderDarkColor,
  },
  unactiveContent : {
    fontFamily : 'Sofia Pro',
    fontSize: fontSizes.smallRegular,
    color : colors.lightBlack,
    width: width * 0.7,
    color: colors.holderDarkColor,
    top : 5,
  },
  separateLine: {
    height: 1,
    backgroundColor: colors.holderColor,
    width
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colors.holderColor
  },
  iconChecked : {
      height:height/25 - 5,
      width:width/25 + 15,
      left: height * 0.04
    }
});
export default styles;
