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
    width: width, height:height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'transparent'

  },
  customBar:{
    marginTop:7,
  },
  viewContainer: {
    width: width, height: height,
    alignItems: 'center',
    justifyContent: 'center'
    // transform: [{ rotate: '90deg'}]
  },
  subContainer: {
    width: width, height: height,
  },
  styleVideo: {
    // aspectRatio: 1,
    // width: "100%",
    // height : "100%",
    backgroundColor:'transparent',
    height,
    width,
  },
  buttonClose: {
    top:30,
    right: 10,
    alignItems: 'center', position: 'absolute',
    justifyContent: 'center', width: 35, height: 35,
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  loading: {
    flex:1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  secondsText:{
    color: colors.white,
    fontSize: fontSizes.large,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  progressContainerbar: {
    flex:1,
    width,
    justifyContent:'center',
    flexDirection: "row",
    // backgroundColor:'red',
    position:'absolute',
    bottom:sidePadding *2,
    paddingLeft:sidePadding,
    paddingRight:sidePadding
  },
  secondsContainer:{
    width: 35,
    // backgroundColor:'yellow',
    marginLeft: sidePadding  ,
  },
  progressContainer:{
    flex:1,
    width: width,
    bottom: 0,
    paddingBottom: 40,
    justifyContent:'space-between',
    position:'absolute',
    paddingLeft:sidePadding,
    paddingRight:sidePadding,
  },
  progressContainerbarImg:{
    height:20,
  },
  progressContainerbarLeft:{
    // backgroundColor:'blue',
    flexDirection:'row',
    width: width - ( 2*sidePadding) - 40,
    height:20,
  },
  bar:{
    paddingLeft:5
  },
  linearBottom: {
    width,
    height:100,
     bottom:0,
     position:'absolute',
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
    // flexDirection: 'row',
  }
});
