import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
import fontSizes from '@constants/font-sizes';

const styles = StyleSheet.create({
  halfViewTop: {
    flex: 1,
    justifyContent: 'center'
  },
  halfViewEnd: {
    flex: 1,
    justifyContent:'center'
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
  },
  txtEmail:{
    textAlign:'center',
    fontSize:fontSizes.largeRegular,
    fontFamily: 'Sofia Pro',

  }
});
export default styles;