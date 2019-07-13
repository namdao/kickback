import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
const styles = StyleSheet.create({
  halfViewTop: {
    flex: 1,
    justifyContent: 'center'
  },
  halfViewEnd: {
    flex: 1,
  },
  imageLogo: {
    width: width * 4/ 6,
    top: -20,
    height: height /6
  },
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default styles;
