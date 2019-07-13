import {StyleSheet, Dimensions} from 'react-native';

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

const {width, height} = Dimensions.get('window');

// const margin = width * 0.03;
const sidePadding = width * 0.05;
const sizeBox = width * 2.5 / 4;
const imageButton = sizeBox / 10;
// const topPadding = width * 0.09;
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  styleButtonCancel: {
    width: sizeBox / 3,
    borderWidth: 2,
    borderRadius: 10
  },
  halfViewTop: {
    flex: 1,
    width: sizeBox,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:sidePadding,
    paddingRight:sidePadding,
    justifyContent: 'space-between'
  },
  boxButton: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageButton: {
    width: imageButton,
    height :imageButton
  },
  imagePlus: {
    width: imageButton / 1.5,
    height :imageButton / 1.5
  },
  halfViewBottom: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  subModal: {
    width: sizeBox,
    backgroundColor: colors.white,
    height: sizeBox,
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: sidePadding,
    paddingBottom: sidePadding,
    paddingLeft: sidePadding,
    paddingRight: sidePadding
  },
  title: {
    color: colors.black,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.medium
  },
  subTitle: {
    color: colors.black,
    marginTop: sidePadding / 2,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.smallRegular
  },
  buttonText: {
    color: colors.black,
    marginTop: 0,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.large
  }
});
