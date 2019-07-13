import {StyleSheet, Dimensions} from 'react-native';

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

const {width, height} = Dimensions.get('window');
const sizeIcon = (width * 3 / 20);
const sizeModal = width * 3 / 4;
const sidePadding = sizeModal * 0.05;
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  halfViewTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  halfViewBottom: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  iconError: {
    marginLeft: sizeModal/2 - sizeIcon/2,
    position: 'absolute',
    backgroundColor: colors.white,
    borderWidth: 5,
    borderColor: colors.white,
    borderRadius: sizeIcon/2,
    marginTop: -sizeIcon/2,
    width: sizeIcon,
    height: sizeIcon
  },
  subModal: {
    width: sizeModal,
    backgroundColor: colors.white,
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingTop: sidePadding,
    paddingBottom: sidePadding,
    paddingLeft: sidePadding,
    paddingRight: sidePadding
  },
  subTitle: {
    color: colors.black,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.regular
  },
  subMessage: {
    color: colors.black,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.regular,
    textAlign:'center',
    paddingBottom:5
  },
  title: {
    color: colors.black,
    fontFamily: 'Sofia Pro',
    fontSize: fontSizes.title
  }
});
