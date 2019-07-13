import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
import colors from '@constants/colors';
const {width, height} = getWidthAndHeight();
import fontSizes from '@constants/font-sizes';

const sidePadding = width * 0.05;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    height: 60,
    justifyContent: 'space-between',
    paddingLeft: height * 0.05,
    width,
    flexDirection:'row',
    alignItems:'center'
  },
  text: {
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.regular
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
  btnClosed :{
      right:sidePadding
  }
});
export default styles;
