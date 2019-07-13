import {AppState, PushNotificationIOS} from 'react-native';
import { changeStateLoading } from '@actions/loading';
const ACTIVE = 'active';
const BACKGROUND = 'background';
let currentState = ACTIVE;
const appStateMiddleware = (store) => {
  AppState.addEventListener('change', (appState) => {
    // PushNotification.configure({
    //   onNotification: function(notification) {
    //     console.log( 'NOTIFICATION:', notification);
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
    //   requestPermissions: false,
    // });
    if (appState == 'inactive') {
      store.dispatch(changeStateLoading({isLoading: false}));
    }
    if (appState == 'background') {
    }
    currentState = appState;
  });
  return (next) => (action) => next(action);
};
export default appStateMiddleware;
