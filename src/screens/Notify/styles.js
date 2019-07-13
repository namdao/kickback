import { StyleSheet } from 'react-native';
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';
import {getWidthAndHeight} from '@utils/dimensions'
const {width} = getWidthAndHeight();
const widthButton = width > 320 ? width - (width * 1/6) : width - (width* 1/4);

export const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  headerContainer: {
    marginBottom: 0,
    height: undefined,
  },
  titleHeader: {
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.large,
    height: undefined,
    top: 0,
  },
  containerIconDirect: {
    position: 'absolute',
    right: 20
  },
  imgDot: {
    width: 6,
    position: 'absolute',
    top: -8,
    left: 1
  },
  stylesHeaderImage: {
    width: undefined
  },
  styleHeader: {
    height: undefined,
    paddingTop: 18.5,
    paddingBottom: 13.5,
    paddingLeft: 0,
    paddingRight: 0,
  },
  styleMainText: {
    position: 'relative',
    paddingTop: 0,
  },
  styleTouchable: {
    height: undefined,
    width: undefined
  },
  titleHeadList: {
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.largeRegular,
    paddingHorizontal: 20,
    paddingTop: 9,
  },
  headerListView: {
    marginTop: 9,
    borderTopWidth: 1,
    borderTopColor: colors.holderColor
  },
  itemView: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderWidth: 0,
  },
  containerLoadMore: {
    paddingVertical: 20,
  },
  message: {
    fontSize: fontSizes.smallRegular,
    lineHeight: 20,
  },
  b: {
    fontSize: fontSizes.smallRegular,
    fontWeight: 'bold'
  },
  time: {
    fontSize: fontSizes.small,
    color: colors.holderDarkColor,
  },
  containerMessage: {
    paddingHorizontal: 17,
    flex: 1
  },
  doubleAvatar1: {
    position: 'absolute',
    width: 33,
    height: 33,
    borderWidth: 0,
  },
  doubleAvatar2: {
    width: 33,
    height: 33,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 0,
    borderColor: colors.white,
  },
  imgAvatar2: {
    borderWidth: 0,
  },
  containerListEmpty: {
    flex: 1,
    justifyContent: 'center',
  },
  textListEmpty: {
    fontFamily: 'SofiaProLight',
    fontSize: fontSizes.large,
    textAlign: 'center',
  },
  containerButton:{
    paddingTop:5,
    justifyContent:'space-between',
    flexDirection:'row'
  },
  buttonSubmit: {
    width: widthButton * 0.38,
    backgroundColor: colors.white,
    borderRadius:7,
    borderWidth:2,
    fontSize:fontSizes.smallRegular,
  },
  buttonDeny: {
    width: widthButton * 0.38,
    backgroundColor: colors.white,
    borderRadius:7,
    borderWidth:2,
    fontSize:fontSizes.smallRegular,
  },
});
export default styles;
