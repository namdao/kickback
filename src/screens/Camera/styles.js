
import { StyleSheet } from 'react-native';
import { getWidthAndHeight } from '@utils/dimensions';
import colors from '@constants/colors';
const { width, height } = getWidthAndHeight();
import fontSizes from '@constants/font-sizes';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  ctnCamera: {
    width,
    height,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  header: {
    backgroundColor: 'transparent',
  },
  btnTakePicture: {
    position: 'absolute',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundBtnTakePicture: {
    borderColor: '#fff',
    borderWidth: 2,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  buttonCapture: {
    height,
    width,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  containerButtons: {
    flexDirection: 'row',
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSwitchCamera: {
    right: 20,
    position: 'absolute',
    zIndex: 110,
    top: 25,
  },
  w100: {
    width: '100%'
  },
  flexCenterAll: {
    justifyContent: 'center',
    alignItems: 'center',
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
})
export default styles;