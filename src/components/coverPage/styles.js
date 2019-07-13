import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
const sizeScreen = getWidthAndHeight();
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';
const styles = StyleSheet.create({
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: sizeScreen.width,
    height: sizeScreen.width / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: "hidden",
    borderBottomColor: colors.holderColor,
    borderBottomWidth: 1,
  },
  imageLogo: {
    width: sizeScreen.width / 6, 
    height: sizeScreen.width / 4,
    borderRadius: sizeScreen.width / 4
  },
  imageCover: {
    width: sizeScreen.width,
    justifyContent: 'center',
    alignItems: 'center',
    height: sizeScreen.width / 2
  },
  textStyle: {
    fontSize: fontSizes.largeRegular,
    fontFamily: 'Sofia Pro',
  }
});
export default styles;
