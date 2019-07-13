import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
const widthTextInput = width * 4/ 6;
const widthButton = width * 4/5 + 30;
const styles = StyleSheet.create({
  halfViewTop: {
    flex: 1,
    justifyContent: 'center',
  },
  halfViewEnd: {
    flex: 1,
    justifyContent: 'center',
  },
  imageLogo: {
    width: width * 4/ 6,
    height: height / 5,
    top:-20
  },
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  styleButtonBackLogin: {
    width: widthButton/2 - 10,
    top: height/6 + 15
  },
});
export default styles;
