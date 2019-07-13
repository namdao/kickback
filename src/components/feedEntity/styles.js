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
    position:'absolute',
    // top: 0,
    // bottom:0,
    // height:0
  },
  headerContainer: {
    height: height * 0.1 + 10,
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // backgroundColor: 'transparent',
    // flexDirection: 'row',
    // paddingTop: topPadding,
    // paddingLeft: sidePadding,
    // paddingRight: sidePadding,
  },
  customsHeader:{
    width: width* 0.8
  },
  headerText: {
    color: colors.white,
    fontSize: fontSizes.largeRegular, 
    fontFamily: 'Sofia Pro',
    alignItems:'flex-start',
    paddingLeft:sidePadding,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  secondaryHeaderText: {
    fontSize: fontSizes.small,
    fontWeight: '400',
    minWidth: 35,
  },
  secondaryHeaderImage: {
    height: 20,
    width: 20,
    bottom: 5
  },
  cancelText: {
    color: colors.cancel
  },
  doneText: {
    color: colors.done
  },
  imgAvatar:{
    width:50,
    height:50,
    borderRadius:25,
  },
  shareButton:{
  },
  numberSlider:{
    flex:1,
    zIndex:99,
    position:'absolute',
    top: 10, left: width* 0.8,
    backgroundColor:'rgba(52, 52, 52, 0.8)',
    borderRadius:20, 
    padding:10,
    width:50, 
    height:35,
    alignItems:'center'
  },
  imgContainer:{
    backgroundColor: '#080808',
    width: width,
    height:height - height/5
  },
  likeCommentContainer:{
    position:'absolute',
    width,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:sidePadding,
    paddingRight:sidePadding*2,
  },
  timeStamps: {
    fontFamily: 'Sofia Pro',
    position:'absolute',
    width,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    paddingLeft:sidePadding,
    fontSize:fontSizes.regular,
  },
  // countLiked: {
  //   height: 30,
  //   alignItems: 'flex-end',
  //   justifyContent: 'center',
  // },
  txtCountLiked : {
    fontFamily: 'Sofia Pro',
    color:'white',
    fontSize:fontSizes.smallerRegular,
    textAlign:'center',
    marginLeft: 10,
    marginRight: -10,
    marginTop:4,
  },
  descriptioncontainer:{
    padding:sidePadding,
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
  lineContainer:{
    width,
    flexDirection:'row',
    justifyContent: 'center',
  },
  
  secondsText:{
    color: colors.white,
    fontSize: fontSizes.large,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  viewMoreText: {
    right: 0,
    top: 17,
    position: 'absolute',
    color: colors.holderDarkColor,
    fontSize: fontSizes.regular,
    fontFamily: 'Sofia Pro',
  },
  loading: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textDescription: {
    fontSize:fontSizes.regular,
    fontFamily: 'Sofia Pro',
    color: colors.desColor
  },
  linearGradient:{
    width,
    position:'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: topPadding,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
  },
  linearGradientBottom:{
    width,
    height:100,
    bottom:0,
    position:'absolute',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  containerbar: {
    flex: 1,
    bottom:100,
    width,
    paddingLeft:sidePadding,
    paddingRight:sidePadding
  },
  customBar:{
    marginTop:5,
  },
  progressContainer:{
    flex:1,
    flexDirection:'row',
    width,
    bottom: 20,
    justifyContent:'space-between',
    position:'absolute',
    paddingLeft:sidePadding,
    paddingRight:sidePadding
  },
  progressContainerbarLeft:{
    // backgroundColor:'blue',
    flexDirection:'row',
    width: width - ( 2*sidePadding) - 40,
    height:20,
  },
  progressContainerbarRight:{
    // flex:1,
    alignItems:'flex-end',
    justifyContent:'center',
    height:20,
    width: 40,
  },
  progressContainerbar: {
    flex:1,
    width,
    justifyContent:'center',
    flexDirection: "row",
    position:'absolute',
    bottom:80,
    paddingLeft:sidePadding,
    paddingRight:sidePadding
  },
  
});
export default styles;