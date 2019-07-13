import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
const sizeScreen = getWidthAndHeight();
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';
const styles = StyleSheet.create({
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: sizeScreen.width / 3, 
    borderWidth: 6,
    borderColor: colors.holderColor,
    height: sizeScreen.width / 3,
    borderRadius: sizeScreen.width / 6,
  },
  container: {
    width: sizeScreen.width / 2,
    height: sizeScreen.width / 2,
    borderRadius: sizeScreen.width / 4,
    borderWidth: 1,
    borderColor: colors.holderColor,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  imageLogo: {
    width: sizeScreen.width / 2, 
    height: sizeScreen.width / 2,
    borderRadius: sizeScreen.width / 4
  },
  imageAvatar: {
    width: sizeScreen.width / 2,
    height: sizeScreen.width / 2,
    borderRadius: sizeScreen.width / 4,
  },
  textStyle: {
    top: 5,
    lineHeight: fontSizes.largeRegular,
    textAlign: 'center',
    fontSize: fontSizes.largeRegular,
    fontFamily: 'Sofia Pro',
  }
});
export default styles;
