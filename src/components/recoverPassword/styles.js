import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
import colors from '@constants/colors';
import fontSizes from '../../constants/font-sizes';
const widthTextInput = width * 4/ 6;
const widthButton = width * 4 / 5 + 30;
const styles = StyleSheet.create({
  container: {
    width: widthButton,
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
  textInput: {
    width: widthTextInput,
    fontFamily: 'Sofia Pro',
    top: -20,
    fontSize: fontSizes.largeRegular,
  },
  frameContent: {
    marginTop: 0,
    width: widthButton,
    justifyContent: 'space-between',
    paddingBottom: 50,
    alignItems: 'center'
  },
  frameButton: {
    width: widthButton,
    justifyContent: 'center',
    alignItems:'center',
    top:10
  },
  styleButtonBackLogin: {
    width: widthButton/2 - 10,
    top: 45
  },
  styleButtonSendPassword: {
    width: widthButton/2 - 10,
    backgroundColor: 'black',
    justifyContent:'center',
    alignItems:'center',
    top: 5
  },
});
export default styles;
