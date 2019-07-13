import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions';
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';

const sizeScreen = getWidthAndHeight();
const {width,height} = sizeScreen;
const margin = width * 0.03;
const sidePadding = width * 0.05;
const topPadding = width * 0.03 +10;
const styles = StyleSheet.create({
  container: {
      width,
      flex:1
  },
  buttonFollow: {
      width:width * 2/5 - 35,
      borderWidth: 2,
      borderRadius: 10,
      top: 10,
      marginBottom: 0,
      height: 35,
    },
  buttonFollowing: {
      width:width * 2/5 - 35,
      borderWidth: 2,
      borderRadius: 10,
      top: 10,
      marginBottom: 0,
      height: 35,
      backgroundColor:'black',
  },
   blockHeader: {
      flex: 1, height: height * 0.12/2 + 5,
      justifyContent: 'center', alignItems: 'center',
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
  containerItems: {
      paddingLeft:sidePadding,
      paddingRight:sidePadding,
      paddingTop :sidePadding,
      width,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  containerName: {
      height:35,
      paddingTop: width * 0.03 - 5,
      paddingLeft: sidePadding - 5,
  },
  title: {
    fontSize: fontSizes.medium,
    fontFamily: 'Sofia Pro',
    fontWeight:'500',
    top: 5
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
    width: width,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colors.holderColor
  },
  imgAvatar:{
      width:50,
      height:50,
      borderRadius:25,
    },
  textUsername: {
      fontSize: fontSizes.largeRegular,
      fontFamily: 'Sofia Pro',
      alignItems:'flex-start',
      fontWeight:'400',
      width: width * 0.35,
    },
  textName: {
      fontSize: fontSizes.smallRegular,
      fontFamily: 'Sofia Pro',
      alignItems:'flex-start',
      color:colors.holderDarkColor,
      fontWeight:'400',
      paddingTop: width * 0.03 - 15,
      width: width * 0.35,
  }
  });
  export default styles;