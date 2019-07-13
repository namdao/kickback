import {
  RESET_ALL_STATE,
  ROOT_CHANGED
} from '@constants/action-names';
import screenKeys from '@constants/screenKey';
//action creator
function changeAppRoot(screen, props) {
    return {
    type: ROOT_CHANGED,
    payload: {
      screen,
      passProps: props
    }
  };
}
function appInitialized(props = {}) {
  return changeAppRoot(screenKeys.LoginScreen, props)
}
function home(props = {}) {
  return changeAppRoot(screenKeys.TabOne, props)
}
function splashScreen(props = {}) {
  return changeAppRoot(screenKeys.Landing, props)
}
function signUpActiveScreen(props = {}) {
  return changeAppRoot(screenKeys.SignUpActive, props)
}
function signUpSetTypeScreen(props = {}) {
  return changeAppRoot(screenKeys.CreateProfile, props)
}
export {
  changeAppRoot,
  appInitialized,
  home,
  splashScreen,
  signUpActiveScreen,
  signUpSetTypeScreen
}