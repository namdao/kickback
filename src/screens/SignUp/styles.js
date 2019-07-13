import {StyleSheet} from 'react-native';
import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
const widthTextInput = width * 4/ 6;
const styles = StyleSheet.create({
  halfViewTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfViewEnd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    width: width * 4/ 6,
    height: height /6
  },
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerButton:{
    flexDirection:'row',
    width: width,
    justifyContent:'center'
  },
  containerButtonRow:{
    flexDirection:'row',
    width: width,
    justifyContent:'center'
  },
  button:{
    borderWidth: 2,
    borderRadius: 10,
    width: widthTextInput/2 + 10,
    marginTop: 15, 
    marginLeft:width *0.02, 
    marginRight:width * 0.02,
  },
  styleOrgButton:{
    width: widthTextInput + 35,
    marginTop: height * 0.03
  }
});
export default styles;
