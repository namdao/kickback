import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
import colors from '@constants/colors';
const {width, height} = getWidthAndHeight();
import fontSizes from '@constants/font-sizes';
const sidePadding = width * 0.05;
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
  imageLogo: {
    width: width * 0.5,
    height: 35,
  },
  viewSwiper: {
    position: 'absolute',
    width,height
  },
  swiper: {
    height
  },
  imageBackground: {
    width,
    height,
  },
  image: {
    width,
    height,
    overflow: 'hidden',
    position: 'absolute'
  },
  containerDrawing: { backgroundColor: 'black', height, width  },
  canvas: {
    width,height,
    backgroundColor: 'black',
    position: 'absolute',
  },
  containEditText: {
    width,height,
  },
  imageBackground: {
    width,height,
    backgroundColor: 'black',
  },
  snapShot: {
    position: 'absolute',
    width,height
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
    borderBottomColor: 'transparent'
  },
  textInput: {
    width: width - 2 * sidePadding,
    height: 60,
    fontSize: fontSizes.regular,
    textAlign: 'center'
  },
  colorPicker: {
    position: 'absolute',
    bottom: 0,
    height: 0,
    top: height / 3,
    left: width / 9,
    justifyContent: 'center',
    alignItems: 'center',
    right: - width / 2 - 4 * sidePadding
  },
  containerEditText: {flex: 1, width},
  editText: {
    textAlign: 'center',
    width: width,
    fontSize: fontSizes.hero,
    fontFamily: 'Sofia Pro'
  },
  buttonPlay: {
    fontSize: fontSizes.title,
    color: colors.white,
    fontFamily: 'Sofia Pro',
    fontWeight: 'bold'
  },
  sizeEditText: {
    fontSize: fontSizes.title
  },
  formHorizontal: {
    width: width-(2*sidePadding),
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center',
  },
  stylesVideo: {
    width,
    height,
  },
  saveText: {
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.largeRegular,
    color: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  buttonForm :{
    position: 'absolute',
    bottom: 0,
    paddingTop: sidePadding * 2,
    paddingBottom: sidePadding,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    width, alignItems: 'center',
  },
  headerGradient : {
    position: 'absolute',
  },
  pickerHide: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  marginBottomDot: {
    bottom: sidePadding + 20 + 20 ,
  },
  buttonCreatePost: {
    flex: 1,
    marginRight: sidePadding,
    backgroundColor: colors.white,
    borderColor:colors.white,
    borderRadius:8,
    fontSize: fontSizes.medium
  },
  buttonSlide: {
    flex: 1,
    //borderColor: 'rgba(255,255,255,0.35)',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius:8,
    alignItems:'center'
    // backgroundColor: 'transparent',
    // shadowColor: colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: -2
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
  touchableSlide: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  viewAddMax:{
    flexDirection: 'row', 
    alignItems: 'center'
  },
  txtAddMax:{
    fontSize:fontSizes.medium,
    color:'rgba(255,255,255,0.35)',
    fontFamily: 'Sofia Pro'
  },
  numberAddMax:{
    fontSize:fontSizes.smallRegular,
    color:'rgba(255,255,255,0.35)',
    fontFamily: 'Sofia Pro'
  },
  txtAdd:{
    fontSize:fontSizes.medium,
    color:'white',
    fontFamily: 'Sofia Pro'
  },
  header2: {
    backgroundColor: 'transparent',
    width,
    height: 60,
    marginTop: height * 0.12 / 2 - 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginTop: height * 0.12 / 2 - 15,
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey'
  },
  functionButton: {
    marginTop: height * 0.12 / 2 - 15,
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
  }
});
export default styles;
