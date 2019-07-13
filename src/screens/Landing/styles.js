import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
const {width, height} = getWidthAndHeight();

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default styles;
