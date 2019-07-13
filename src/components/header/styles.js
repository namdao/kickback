import {StyleSheet, Dimensions} from 'react-native';

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
const margin = width * 0.03;
const sidePadding = width * 0.05;
const topPadding  = width == 375 ? height * 0.02 : height * 0.05;

// width = 375 for IPhone X
const bottomPadding = width == 375 ? 0 : width * 0.05;
export default StyleSheet.create({
  container: {
    width,
    height:height/2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 4,
    marginBottom: margin
  },
  containerNoShadow: {
    width,
  },
  headerContainer: {
    height: height * 0.12,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingTop: topPadding,
    paddingBottom: bottomPadding,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
  },
  headerText: {
    color: colors.black,
    fontSize: fontSizes.regular,
    fontWeight: '400',
    height: 25,
    top: 2,
    textAlign: 'center',
    width: width/2
  },
  secondaryHeaderText: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    fontFamily: 'Sofia Pro',
    minWidth: 35,
  },
  styleTitle: {
    position: 'absolute',
    width,flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    alignItems: 'center'
  },
  secondaryHeaderImage: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  cancelText: {
    color: colors.cancel
  },
  doneText: {
    color: colors.done
  }
});
