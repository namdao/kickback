import {StyleSheet, Dimensions} from 'react-native';

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
// const margin = width * 0.03;
const sidePadding = width * 0.05;
// const topPadding = width * 0.09;
const fontSizeFollow = width > 375 ? fontSizes.smallerRegular : width > 320 ? fontSizes.small : fontSizes.small; 
const fontSizeNumber = width > 375 ? fontSizes.large : width > 320 ? fontSizes.regular : fontSizes.regular; 
const paddingFollowText = width > 375 ? 6 : 10;
const topFollowNumber = width > 375 ? 7 : 8;
export default StyleSheet.create({
  avatar: {
    borderWidth: 5,
    borderColor: colors.white,
    marginTop: - (width * 2 / 7 /2 + 5),
    width: width * 2 / 6,
    height: width * 2 / 6,
    borderRadius: width*2/12,
  },
  avatarDefault:{
    borderWidth: 5,
    borderColor: colors.white,
    marginTop: - (width * 2 / 7 /2 + 5),
    width: width * 2 / 6,
    height: width * 2 / 6,
    borderRadius: width * 2 /12
  },
  headerList: {
    paddingBottom: sidePadding * 2
  },
  buttonFollow: {
    flex: 3,
    borderWidth: 2,
    borderRadius: 10,
    top: 5,
    marginBottom: 0,
    height: 35,
    fontSize: fontSizes.small,
    // width: width - (width * 1.7 / 7) - (sidePadding * 3)
  },
  info: {flex: 1},
  subTextFollower: {flex: 1,flexDirection: 'row'},
  followingText: {
    fontSize: fontSizeFollow,
    color: colors.holderDarkColor,
    fontFamily: 'Sofia Pro',
    paddingTop:paddingFollowText
  },
  followingNumber: {
    fontSize: fontSizeNumber,
    color: colors.black,
    fontFamily: 'Sofia Pro',
    top:topFollowNumber
  },
  sloganText: {
    fontSize: fontSizes.smallRegular,
    fontFamily: 'Sofia Pro'
  },
  block: {
    height: 35,
    marginRight:sidePadding,
    flex: 2, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  status: {marginTop: sidePadding ,flexDirection: 'row', alignItems: 'center'},
  followingStatus: {
    fontSize: fontSizeFollow,
    color: colors.holderDarkColor,
    fontFamily: 'Sofia Pro'
  },
  nameStyle: {
    textAlign: 'center',
    width,
    fontSize: fontSizes.larger,
    paddingLeft: sidePadding * 2,
    paddingRight: sidePadding * 2,
    fontFamily: 'Sofia Pro',
  },
  nameStyleSecond: {
    fontSize: fontSizes.largeRegular,
    fontFamily: 'Sofia Pro',
    paddingLeft: sidePadding * 2,
    paddingRight: sidePadding * 2,
    color: colors.holderDarkColor,
  },
  wrappedBio:{
    alignItems: 'center', 
    flexDirection:'column',
    justifyContent: 'space-between',
    height: 70,
  },
  nameStyleBio: {
    fontSize: fontSizes.medium,
    fontFamily: 'Sofia Pro',
    color: colors.black,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusFrame: {left: sidePadding, flex: 1},
  halfViewTop: {
    flex: 1,
    alignItems: 'center',
    width
  },
  paddingFrame: {
    width,
    paddingLeft: sidePadding,
    paddingTop: sidePadding,
    paddingRight: sidePadding,
    justifyContent:'center',
    alignItems:'center',
  },
});
