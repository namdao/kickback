import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';
import screenKeys from '@constants/screenKey';
import LoginScreen from './LoginScreen';
import CreateProfile from './CreateProfile';
import Home1 from './Home1';
import Home2 from './Home2';
import notifyContainer from '@containers/notifyContainer/notifyContainer';
import Profile from './Profile';
import { Provider } from 'react-redux';
import { SignUpAfterScreen, SignUpActiveScreen } from './SignUp';
import VerifyRecoverPasswordScreen from './VerifyRecoverPasswordScreen';
import Settings from './Settings';
import EntityDetailContainer from '@containers/entityDetailContainer/entityDetailContainer';
import SignUpContainer from '@containers/signupContainer/signupContainer';
import LoginContainer from '@containers/loginContainer/loginContainer';
import HomeContainer from '@containers/homeContainer/homeContainer';
import DetailProfileContainer from '@containers/detailProfileContainer/detailProfileContainer';
import LandingContainer from '@containers/landingContainer/landingContainer';
import ProfileContainer from '@containers/profileContainer/profileContainer';
import CreateProfileContainer from '@containers/createProfileContainer/createProfileContainer';
import FollowerContainer from '@containers/followerContainer/followerContainer';
import MyUOpenContainer from '@containers/myUOpenContainer/myUOpenContainer';
import SettingsContainer from '@containers/settingsContainer/settingsContainer';
import SearchContainer from '@containers/searchContainer/searchContainer';
import SearchProfileContainer from '@containers/searchProfileContainer/searchProfileContainer';
import CreateStory from './CreateStory';
import EditScreenContainer from '@containers/editScreenContainer/editScreenContainer';
import EditCommentContainer from '@containers/commentContainer/commentContainer';
import ToolTopBarContainer from '@containers/toolTopBarContainer/toolTopBarContainer';
import ListFollowScreenContainer from '@containers/listFollowScreenContainer/listFollowScreenContainer';
import RecoverPasswordScreenContainer from '@containers/recoverPasswordScreenContainer/recoverPasswordScreenContainer';
import ListBlockedUsersContainer from '@containers/listBlockedUsersContainer/listBlockedUsersContainer';
import SearchAdvanceContainer from '@containers/searchAdvanceContainer/searchAdvanceContainer';
import SearchAdvanceProfileContainer from '@containers/searchAdvanceProfileContainer/searchAdvanceProfileContainer';
import InviteFriendsContainer from '@containers/inviteFriendsContainer/inviteFriendsContainer';
import PrivacyModeContainer from '@containers/privacyModeContainer/privacyModeContainer';
import FullScreenContainer from '@containers/fullScreenContainer/fullScreenContainer';
import WarningBox from '@components/modals/warning';
import CreatePostBox from '@components/modals/createPostBox';
import ListSelectBox from '@components/modals/listSelectBox';
import LoadingBox from '@components/modals/loadingBox';
import ReportBox from '@components/modals/reportBox';
import FullScreenVideo from '@components/modals/fullScreenVideo';
import MyU from '@components/modals/myU';
import SearchBox from '@components/modals/searchBox'
import DeleteBox from '@components/modals/deleteBox';
import BlockUserBox from '@components/modals/blockUserBox';
import BlockConfirmBox from '@components/modals/blockConfirmBox';
import UnblockUserBox from '@components/modals/unblockUserBox';
import NotificationBox from '@components/modals/notificationBox';
import TermsAndPrivacy from '@screens/TermsAndPrivacy';

import TAB_1 from '../thumbnails/ico-home.png';
import TAB_2 from '../thumbnails/tab_2.png';
import TAB_3 from '../thumbnails/tab_3.png';
import TAB_4 from '../thumbnails/tab_4.png';
import TAB_5 from '../thumbnails/tab_5.png';
import MYUICON from '../thumbnails/icon-myu.png';
import CameraScreen from './Camera';
import { updateScreenName } from '@actions/screens';

// import TAB_5 from '../thumbnails/ico-myu.png';
import { NavigationActions } from '@actions/navigate';
export function registerScreens(store) {
  Navigation.registerComponent(screenKeys.LoginScreen, () => LoginContainer, store, Provider);
  // Modal Box

  
  Navigation.registerComponent(screenKeys.WarningBox, () => WarningBox);
  Navigation.registerComponent(screenKeys.CommingSoon, () => WarningBox);
  Navigation.registerComponent(screenKeys.CreatePostBox, () => CreatePostBox);
  Navigation.registerComponent(screenKeys.ListSelectBox, () => ListSelectBox);
  Navigation.registerComponent(screenKeys.LoadingBox, () => LoadingBox);
  Navigation.registerComponent(screenKeys.ToolTopBar, () => ToolTopBarContainer, store, Provider);
  Navigation.registerComponent(screenKeys.FullScreenVideo, () => FullScreenContainer,store,Provider);
  Navigation.registerComponent(screenKeys.MyU, () => MyU);
  Navigation.registerComponent(screenKeys.SearchBox, () => SearchBox);
  Navigation.registerComponent(screenKeys.DeleteBox, () => DeleteBox);
  Navigation.registerComponent(screenKeys.ReportBox, () => ReportBox);

  Navigation.registerComponent(screenKeys.BlockUserBox, () => BlockUserBox);
  Navigation.registerComponent(screenKeys.BlockConfirmBox, () => BlockConfirmBox);
  Navigation.registerComponent(screenKeys.UnblockUserBox, () => UnblockUserBox);
  Navigation.registerComponent(screenKeys.NotificationBox, () => NotificationBox);
  // Screen
  
  // Navigation.registerComponent(screenKeys.TabOne, () => SearchAdvanceContainer, store, Provider);
  Navigation.registerComponent(screenKeys.TabOne, () => HomeContainer, store, Provider);
  Navigation.registerComponent(screenKeys.TabTwo, () => Home2, store, Provider);
  Navigation.registerComponent(screenKeys.CreateProfile, () => CreateProfileContainer, store, Provider);
  Navigation.registerComponent(screenKeys.TabNotify, () => notifyContainer, store, Provider);
  Navigation.registerComponent(screenKeys.SignUpAfter, () => SignUpAfterScreen, store, Provider);
  Navigation.registerComponent(screenKeys.SignUpActive, () => SignUpContainer, store, Provider);
  Navigation.registerComponent(screenKeys.Landing, () => LandingContainer, store, Provider);
  Navigation.registerComponent(screenKeys.Profile, () => ProfileContainer, store, Provider);
  Navigation.registerComponent(screenKeys.DetailProfile, () => DetailProfileContainer, store, Provider);
  Navigation.registerComponent(screenKeys.CreateStory, () => CreateStory, store, Provider);
  Navigation.registerComponent(screenKeys.MyUOpen, () => MyUOpenContainer, store, Provider);
  Navigation.registerComponent(screenKeys.EntityDetail, () => EntityDetailContainer, store, Provider);
  Navigation.registerComponent(screenKeys.Settings, () => SettingsContainer, store, Provider);
  Navigation.registerComponent(screenKeys.DetailFollower, () => FollowerContainer, store, Provider);
  Navigation.registerComponent(screenKeys.EditScreen, () => EditScreenContainer, store, Provider);
  Navigation.registerComponent(screenKeys.Search, () => SearchContainer, store, Provider);
  Navigation.registerComponent(screenKeys.SearchProfile, () => SearchProfileContainer, store, Provider);
  Navigation.registerComponent(screenKeys.EditComment, () => EditCommentContainer, store, Provider);
  Navigation.registerComponent(screenKeys.CameraScreen, () => CameraScreen);
  Navigation.registerComponent(screenKeys.ListFollowScreen, () => ListFollowScreenContainer, store, Provider);
  Navigation.registerComponent(screenKeys.RecoverPasswordScreen, () => RecoverPasswordScreenContainer, store, Provider);
  Navigation.registerComponent(screenKeys.VerifyRecoverPasswordScreen, () => VerifyRecoverPasswordScreen, store, Provider);
  Navigation.registerComponent(screenKeys.ListFollowScreen, () => ListFollowScreenContainer,store,Provider);
  Navigation.registerComponent(screenKeys.RecoverPasswordScreen, () => RecoverPasswordScreenContainer,store,Provider);
  Navigation.registerComponent(screenKeys.VerifyRecoverPasswordScreen, () => VerifyRecoverPasswordScreen,store,Provider);
  Navigation.registerComponent(screenKeys.ListBlockedUsers, () => ListBlockedUsersContainer,store,Provider);
  Navigation.registerComponent(screenKeys.SearchAdvance, () => SearchAdvanceContainer,store,Provider);
  Navigation.registerComponent(screenKeys.SearchAdvanceProfile, () => SearchAdvanceProfileContainer,store,Provider);
  Navigation.registerComponent(screenKeys.InviteFriends, () => InviteFriendsContainer, store, Provider);
  Navigation.registerComponent(screenKeys.PrivacyMode, () => PrivacyModeContainer,store,Provider);
  Navigation.registerComponent(screenKeys.TermsAndPrivacy, () => TermsAndPrivacy);
}
export function registerScreenVisibilityListener(store) {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => {
      store.dispatch(updateScreenName({name: screen}));
    },
    didAppear: ({ screen, startTime, endTime, commandType }) => {
      // console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`)
    },
    willDisappear: ({ screen }) => {
      // console.log(`Screen will disappear ${screen}`)
    },
    didDisappear: ({ screen }) => {
      // console.log(`Screen disappeared ${screen}`)
    }
  }).register();
};

export function startRoot({ screen, passProps }) {

  let options = {
    animationType: 'fade',
    screen: {
      screen: screen,
      title: 'Signup Success',
      navigatorStyle: {
        statusBarHidden: false,
        statusBarHideWithNavBar: false,
        navBarHidden: true
      },
      navigatorButtons: {},
    },
    passProps
  };

  if (screen == screenKeys.TabOne) {
    Navigation.startTabBasedApp({
      tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
        tabBarButtonColor: '#000', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
        tabBarSelectedButtonColor: '#fd8042', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
        tabBarBackgroundColor: '#FFFFFF', // optional, change the background color of the tab bar,
      },
      appStyle: {
        tabBarButtonColor: '#929292', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
        tabBarSelectedButtonColor: '#fd8042', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
        tabBarBackgroundColor: '#FFFFFF', // optional, change the background color of the tab bar,
      },
      animationType: 'fade',
      tabs: [
        {
          iconInsets: { top: 5, bottom: -5 },
          screen: screenKeys.TabOne,
          icon: TAB_1,
          selectedIcon: TAB_1,
          title: 'Hey',
          overrideBackPress: false, //this can be turned to true for android
          navigatorStyle: {
            drawUnderTabBar: true,
            navBarHidden: true,
            screenBackgroundColor: '#0D1011',
          }
        }, {
          iconInsets: { top: 5, bottom: -5 },
          screen: screenKeys.TabTwo,
          icon: TAB_2,
          selectedIcon: TAB_2,
          title: 'Hey',
          navigatorStyle: {
            drawUnderTabBar: true,
            navBarHidden: true,
            screenBackgroundColor: '#0D1011',
          }
        }, {
          iconInsets: { top: 5, bottom: -5 },
          screen: screenKeys.Profile,
          icon: TAB_3,
          selectedIcon: TAB_3,
          title: 'Hey',
          navigatorStyle: {
            drawUnderTabBar: true,
            navBarHidden: true,
            screenBackgroundColor: '#0D1011',
          }
        }, {
          iconInsets: { top: 5, bottom: -5 },
          screen: screenKeys.TabNotify,
          icon: TAB_4,
          selectedIcon: TAB_4,
          title: 'Notification',
          navigatorStyle: {
            drawUnderTabBar: true,
            navBarHidden: true,
            screenBackgroundColor: '#0D1011',
          }
        }, {
          iconInsets: { top: 5, bottom: -5 },
          screen: screenKeys.MyUOpen,
          icon: TAB_5,
          selectedIcon: MYUICON,
          title: 'Hey',
          navigatorStyle: {
            drawUnderTabBar: true,
            navBarHidden: true,
            screenBackgroundColor: '#0D1011',
          }
        }],
    });
  } else {

    Navigation.startSingleScreenApp(options);
  }
}