import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
import colors from '@constants/colors';
const {width, height} = getWidthAndHeight();
import fontSizes from '@constants/font-sizes';
const sidePadding = width * 0.05;
const widthTextInput = width - (width * 1/6);
const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.title,
    fontFamily: 'Sofia Pro',
    bottom: 20
  },
  commentBar: {
    backgroundColor: colors.white,
    width,
    height: 60,
    borderTopWidth: 1,
    paddingLeft: sidePadding,
    alignItems: 'center',
    paddingRight: sidePadding,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopColor: colors.holderColor
  },
  descriptionContain:{
    paddingLeft:sidePadding,
    paddingRight:sidePadding,
    paddingBottom:sidePadding,
  },
  inputComment: {
    left: sidePadding,
    paddingRight: sidePadding,
    fontFamily: 'Sofia Pro',
    flex: 1,
    height: 40,
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
  loading: {
    position: 'absolute',
    width: width,
    height: height - height * 0.12,
    marginTop: height * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  buttonComment: {
    marginLeft: sidePadding,
    height: 28, 
    width: 65,
    borderRadius: 8,
    borderWidth:2
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
    flex: 1
  },
  line: {
    height: 3,
    //backgroundColor: colors.holderColor,
    width
  },
  containerScrollView: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
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
});
export default styles;
