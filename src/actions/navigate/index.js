import screenKeys from "@constants/screenKey";
import colors from '@constants/colors';

class NavigationActionsClass {
  navigator = [];
  switchToTab = (index) => {
    this.navigator.switchToTab({
      tabIndex: index // (optional) if missing, this screen's tab will become selected
    });
  }
  showModal = (key, params = {}) => {
    this.navigator.showModal({
      animationType: 'none',
      navigatorStyle: {
        screenBackgroundColor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        navBarHidden: true
      },
      overrideBackPress: false,// true / false, (Android only), prevents back button and hardware back button from hiding the dialog on Android, instead the [navigator event](https://wix.github.io/react-native-navigation/#/screen-api?id=setonnavigatoreventcallback) 'backPress' will be sent (optional)
      screen: key, // unique ID registered with Navigation.registerScreen
      passProps: params, // simple serializable object that will pass as props to the lightbox (optional)
    });
  };
  showLightBox = (key, params = {}, light = "light", backgrounColor = "rgba(0,0,0,0.5)") => {
    this.navigator.showLightBox({
      animationType: 'none',
      screen: key, // unique ID registered with Navigation.registerScreen
      passProps: params, // simple serializable object that will pass as props to the lightbox (optional)
      style: {
        backgroundBlur: light, // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: backgrounColor, // tint color for the background, you can specify alpha here (optional)
        tapBackgroundToDismiss: params.hasOwnProperty('tapBackgroundToDismiss') ? params.tapBackgroundToDismiss : true // dismisses LightBox on background taps (optional)
      },
      adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
    });
  };
  dismissAllModal = () => {
    this.navigator.dismissAllModals();
  }
  dismissModal = () => {
    this.navigator.dismissModal({
      animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }
  dismissLightBox = () => {
    this.navigator.dismissLightBox({ animationType: 'slide-down' });
  };
  setNavigator(navigator) {
    this.navigator = navigator
  };
  push = (key, params = {}) => this.navigator &&
    this.navigator.push({
      screen: key,
      navigatorStyle: {
        drawUnderTabBar: params.hasOwnProperty('drawUnderTabBar') ? params.drawUnderTabBar : true,
        navBarHidden: true,
        disabledBackGesture: params.hasOwnProperty('disabledBackGesture') ? params.disabledBackGesture : false
      },
      animationType: 'fade',
      passProps: params,
      popGesture: false,
    });
  resetTo = (key, params = {}) => this.navigator &&
    this.navigator.resetTo({
      screen: key,
      navigatorStyle: {
        drawUnderTabBar: true,
        navBarHidden: true
      },
      passProps: params,
    });
  resetToHome = () => {
    this.resetTo(screenKeys.TabOne)
  }
  resetToSignUpActive = () => {
    this.resetTo(screenKeys.SignUpActive);
  }
  pop = (params = {}) => this.navigator && this.navigator.pop({ animated: true, animationType: 'fade', passProps: params });
  toggleTabs = (isShow) => this.navigator && this.navigator.toggleTabs({
    to: isShow ? 'show' : 'hidden',
    animate: false
  });

  // SHOW COMMING SOON
  showCommingSoonBox = (msg, subMessage = '') => {
    this.showLightBox(screenKeys.CommingSoon, { msg, subMessage, type: 'comming' }, 'none', 'rgba(0,0,0,0.5)');
  } 

  // SHOW WARNING BOX
  showWarningBox = (msg) => {
    this.showLightBox(screenKeys.WarningBox, { msg }, 'none', 'rgba(0,0,0,0.5)');
  }
  dismissWarningBox = () => {
    this.dismissLightBox();
  }
  // SHOW TOOL TOP BAR
  showToolTopBar = (props) => {
    this.showModal(screenKeys.ToolTopBar, props);
  }
  dismissToolTopBar = () => {
    this.dismissModal();
  }

  // SHOW CREATE POST BOX
  showCreatePostBox = (props) => {
    this.showLightBox(screenKeys.CreatePostBox, props, 'none', 'rgba(0,0,0,0.5)');
  }
  dismissCreatePostBox = () => {
    this.dismissLightBox();
  }

  // SHOW LIST SELECT BOX
  showListSelectBox = (props) => {
    this.showLightBox(screenKeys.ListSelectBox, props, 'none', 'rgba(0,0,0,0.5)');
  }
  dismissListSelectBox = () => {
    this.dismissLightBox();
  }

  // SHOW MYU BOX
  showMyU = (props) => {
    this.showLightBox(screenKeys.MyU, props, 'xlight', 'rgba(255,255,255,0.7)');
  }
  dismissMyU = () => {
    this.dismissLightBox();
  }

  // SHOW LOADING BOX
  showLoadingBox = () => {
    this.showLightBox(screenKeys.LoadingBox, { tapBackgroundToDismiss: false }, 'none', 'rgba(0,0,0,0.5)');
  }
  dismissLoadingBox = () => {
    this.dismissLightBox();
  }
  // SHOW SEARCH BOX
  showSearchBox = (props) => {
    this.showLightBox(screenKeys.SearchBox, props, 'none');
  }
  // SHOW DELETE BOX 
  showDeleteBox = (props) => {
    this.showLightBox(screenKeys.DeleteBox, props, 'none');
  }
  // SHOW DARK BOX DETAIL PROFILE
  showDetailProfileBox = (props) => {
    this.showLightBox(screenKeys.DetailProfile, props, 'none');
  }
  // SHOW BLOCK/UNBLOCK BOX
  showBlockUserBox = (props) => {
    this.showLightBox(screenKeys.BlockUserBox,props, 'none');
  }
  showBlockConfirmBox = (props) => {
    this.showLightBox(screenKeys.BlockConfirmBox,props, 'none');
  }
  showUnblockUserBox = (props) => {
    this.showLightBox(screenKeys.UnblockUserBox,props,'none');
  }
  // SHOW NOTIFICATION BOX
  showNotificationBox = (props) => {
    this.showLightBox(screenKeys.NotificationBox,props, 'none');
  }
  // SHOW DARK BOX DETAIL PROFILE
  showFullScreenVideo = (props) => {
    props.disabledBackGesture = true;
    this.push(screenKeys.FullScreenVideo, props);
  }
  // SHOW REPORT BOX
  showReportBox = (props) => {
    this.showLightBox(screenKeys.ReportBox, props, 'none', 'rgba(0,0,0,0.5)');
  }
  dismissReportBox = () => {
    this.dismissLightBox();
  }
  // NAVIGATE TO LOGIN ACTION
  resetToLogin = (props) => {
    this.resetTo(screenKeys.LoginScreen, props);
  };

  navigateToSettings = (props) => {
    this.toggleTabs(false);
    this.push(screenKeys.Settings, props);
  }

  // NAVIGATE TO EDIT SCREEN
  navigateToEditScreen = (props) => {
    props.disabledBackGesture = true;
    this.push(screenKeys.EditScreen, props);
  }

  // NAVIGATE TO SIGNUP AFTER ACTION
  navigateToSignUpAfter = (props) => {
    this.push(screenKeys.SignUpAfter, props);
  };

  // NAVIGATE TO SIGNUP SUCCESS ACTION
  navigateToSignUpActive = (props) => {
    this.push(screenKeys.SignUpActive, props);
  };

  // NAVIGATE TO CAMERA SCREEN
  navigateToCamera = (props) => {
    this.push(screenKeys.CameraScreen, props);
  };

  navigateToLandingScreen = (props) => {
    this.push(screenKeys.Landing, props);
  };

  // NAVIGATE TO CREATE PROFILE
  navigateToCreateProfile = (props) => {
    this.push(screenKeys.CreateProfile, props);
  };

  // NAVIGATE TO PROFILE - TAB3
  navigateToProfileTab = () => {
    this.switchToTab(2);
  };

  // NAVIGATE TO NOTIFICATION - TAB4
  navigateToNotificationTab = () => {
    this.switchToTab(3);
  }

  // NAVIGATE TO DETAIL FOLLOWER
  navigateToDetailFollower = (props) => {

    this.push(screenKeys.DetailFollower, props);
  }
  // NAVIGATE TO CREATE STORY
  navigateToCreateStory = (props) => {
    this.push(screenKeys.CreateStory, props);
  }

  navigateToTermsAndPrivacy = (props) => {
    this.push(screenKeys.TermsAndPrivacy, props);
  }

  // NAVIGATE TO ENTITY DETAIL
  navigateToEntityDetail = (props) => {
    this.push(screenKeys.EntityDetail, props);
  }
  // NAVIGATE TO SEARCH PAGE
  navigateToSearchPage = (props) => {
    this.push(screenKeys.Search, {...props, drawUnderTabBar: false})
  }
  // NAVIGATE TO SEARCH PAGE FROM PROFILE
  navigateToSearchPageFromProfile = (props) => {
    this.push(screenKeys.SearchProfile, {...props, drawUnderTabBar: false})
  }
  // NAVIGATE TO EDIT SCREEN
  navigateToEditComment = (props) => {
    // this.toggleTabs(false);
    this.push(screenKeys.EditComment, props);
  }
  navigateToListFollowScreen = (props) => {
    this.push(screenKeys.ListFollowScreen, { ...props, drawUnderTabBar: false });
  }
  navigateToRecoverPasswordScreen = (props) => {
    this.push(screenKeys.RecoverPasswordScreen, props);
  }
  navigateToVerifyRecoverPasswordScreen = (props) => {
    this.push(screenKeys.VerifyRecoverPasswordScreen, props);
  }
  navigateToListBlockedUsers = (props) => {
    this.push(screenKeys.ListBlockedUsers,props);
  }
  navigateToSearchAdvance = (props) => {
    this.push(screenKeys.SearchAdvance, props);
  }
  navigateToSearchAdvanceFromProfile = (props) => {
    this.push(screenKeys.SearchAdvanceProfile, props);
  }
  navigateToInviteFriendScreen = (props) => {
    this.push(screenKeys.InviteFriends, props);
  }

  navigateToPrivacyMode = (props) => {
    this.push(screenKeys.PrivacyMode, props);
  }
}
export const NavigationActions = new NavigationActionsClass();
