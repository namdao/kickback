import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
import colors from '@constants/colors';
const {width, height} = getWidthAndHeight();
const widthTextInput = width - (width * 1/6);
const sidePadding = width * 0.05;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height
  },
  line: {
    height: 1,
    backgroundColor: colors.holderColor,
    width
  },
  containerScrollView: {
    flex: 1,
    width: width,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colors.holderColor
  },
  buttonSubmit: {
    marginTop: 45,
    width: widthTextInput - (width * 1/6),
    backgroundColor: colors.black,
  },
  inputEditComment:{
    justifyContent:'space-between',
    flexDirection:'column',
    paddingRight: sidePadding,
    paddingRight:sidePadding,
    left: sidePadding,
    fontFamily: 'Sofia Pro',
    flex: 1,
    width,
  },
})
export default styles;