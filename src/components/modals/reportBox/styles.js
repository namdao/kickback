import { StyleSheet, Dimensions } from 'react-native';

import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

const { width } = Dimensions.get('window');
const sidePadding = width * 0.05;
const sizeBox = width * 2.5 / 4;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    justifyContent: 'center',
    height: 50,
    alignItems: 'flex-start'
  },
  text: {
    fontSize: fontSizes.largeRegular,
    fontFamily: 'Sofia Pro'
  },
  separateLine: {
    width: sizeBox,
    height: 1,
    backgroundColor: colors.holderColor
  },
  subModal: {
    width: sizeBox,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 21,
    paddingVertical: 19
  },
  title: {
    fontSize: fontSizes.largeRegular,
    fontFamily: 'Sofia Pro',
    paddingHorizontal: 25,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: fontSizes.smallRegular,
    fontFamily: 'SofiaProLight',
    marginTop: 17,
    marginBottom: 19,
    paddingHorizontal: 25,
    textAlign: 'center'
  },
  btnCancel: {
    width: width / 4,
    borderRadius: 10,
    borderWidth: 2,
  },
  listStyle: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.holderColor,
    borderTopWidth: 1,
    borderTopColor: colors.holderColor,
    marginHorizontal: 5,
    marginBottom: 22,
  }
});
