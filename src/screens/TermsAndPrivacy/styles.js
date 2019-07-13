import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
import colors from '@constants/colors';
const {width, height} = getWidthAndHeight();
import fontSizes from '@constants/font-sizes';
const styles = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 100,
  },
  html: {
    width,
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colors.holderColor
  }
});
export default styles;
