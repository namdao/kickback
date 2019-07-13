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
    height: 60,
    justifyContent: 'center',
    paddingLeft: height * 0.05,
    width,
  },
  text: {
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.largeRegular
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
  }
});
export default styles;
