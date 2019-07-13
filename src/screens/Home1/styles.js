import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
import colors from '@constants/colors';
const {width, height} = getWidthAndHeight();
import fontSizes from '@constants/font-sizes';
const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width,
    height
  },
  title: {
    fontSize: fontSizes.title,
    fontFamily: 'Sofia Pro',
    bottom: 20
  },
  leftNavButton: {
    width: 25,
    height: 25,
    top: -5
  },
  rightNavButton: {
    width: 25,
    height: 25,
    top: -5
  },
  imageLogo: {
    width: width * 0.5,
    height: 35,
  },
  avatar: {
    width: width * 3 / 7,
    height: width * 3 / 7
  },
  container: {
    width: width,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colors.holderColor
  }
});
export default styles;
