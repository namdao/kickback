import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
const sizeScreen = getWidthAndHeight();
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';
const styles = StyleSheet.create({
  container: {
    width: sizeScreen.width / 2,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontFamily: 'Sofia Pro',
  },
  sliderRow: {
    transform: [{ rotate: '180deg'}]
  },
});
export default styles;
