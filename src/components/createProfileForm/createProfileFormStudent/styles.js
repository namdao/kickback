import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';
const widthTextInput = width - (width * 1/6);
const styles = StyleSheet.create({
  backgroundPicker: {
    position: 'absolute',
    height, width
  },
  buttonSubmit: {
    marginTop: 50,
    width: widthTextInput - (width * 1/6),
    backgroundColor: colors.black,
  },
  textInputForm: {
    alignItems: 'center',
    marginTop:10,
    marginBottom:10
  },
  textInput: {
    width: widthTextInput,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.largeRegular,
  },
  genderStyle: {
    width: widthTextInput,
    flexDirection: 'row',
  },
  textStyleSelected: {
    color: colors.black,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.largeRegular
  },
  textStyle: {
    color: colors.holderColor,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.largeRegular
  },
  titleInput: {
    marginTop: 20,
    marginBottom: -30,
    width: widthTextInput,
    fontSize: fontSizes.largeRegular,
    color: colors.holderDarkColor,
    fontFamily: 'Sofia Pro',
  },
  textChangePhoto: {
    left: 5,
    fontWeight: '400',
    fontSize: fontSizes.smallRegular,
    color: colors.holderDarkColor,
    fontFamily: 'Sofia Pro'
  },
  viewChangePhoto: {left: -5, top: 10, flexDirection:'row', alignItems: 'center'},
  styleImageCamera: {
    width: 20,
    height: 20
  },
  linearGradient: {
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: width, height: width / 6
  },
  sizeGradient: {
    width: width, height: width / 6
  },
  title: {
    fontSize: fontSizes.title,
    fontFamily: 'Sofia Pro',
    marginBottom: 20
  },
  textHeader: {
    left: 5,
    color: colors.white,
    fontFamily: 'Sofia Pro',
    fontWeight: '400',
    fontSize: fontSizes.smallRegular
  },
  subContainer: {
    alignItems: 'center'
  },
  imageLogo: {
    width: width * 0.5,
    height: 25
  },
  crop: {
    width: width,
    height: width / 2
  },
  avatar: {
    borderWidth: 5,
    borderColor: colors.white,
    marginTop: - (width * 2 / 7 /2 + 5),
    width: width * 2 / 6,
    height: width * 2 / 6
  },
});
export default styles;
