import { AsyncStorage, Alert} from 'react-native';
import { setKeyAsyncStorage } from "@utils/async";
import {TYPE_POST_LIKE, 
    TYPE_COMMENT, 
    TYPE_FOLLOW, 
    TYPE_POST_REPORTED, 
    TYPE_COMMENT_REPORTED,
    TYPE_PRIVACY_MODE_FOLLOW} from '@constants/notification';
import firebase from 'react-native-firebase';
import { NavigationActions } from '@actions/navigate';
import { Navigation } from 'react-native-navigation';
import screenKeys from "@constants/screenKey";

export default class NotificationService  {
    constructor(props) {
        this.controller = null;
        this.token = null;
        this.createNotificationListeners();
    }

    setupNotificationService = (props) => {
        this.controller = props;
        if (props.registrationNotification && props.userReducer && props.userReducer.access_token) {
            this.checkPermission();
        }
    }

    checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            if(!this.token){
                this.getToken();
            }
        } else {
            this.requestPermission();
        }
    }
    
    // GET TOKEN FIREBASE NOTIFICATION
    getToken = async () => {
        // let fcmToken = await AsyncStorage.getItem('fcmToken');
        // if (!fcmToken || fcmToken == '') {
            let fcmToken = await firebase.messaging().getToken();
            this.token = fcmToken;
            if (fcmToken) {
                // USER HAS A DEVICE TOKEN
                AsyncStorage.setItem('fcmToken', fcmToken);
                // SEND TO API
                this.controller.registrationNotification({fcmToken})
            }
        // } else {
            // this.controller.registrationNotification({fcmToken})
        // }
    }
    
    requestPermission = async () => {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
        }
    }

    checkDuplicateScreen = (screenName, handler) => {
        const {screensReducer} = this.controller;
        if (screensReducer.name == screenName) {
            NavigationActions.pop();
            setTimeout(() => {
                handler();
            }, 300);
        } else {
            handler();
        }
    }
    
    async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        // this.showAlert(title, body);
    });
    
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(async (notificationOpen) => {
        const { title, body, _data = {} } = notificationOpen.notification;
        const {type, post_id, comment_id, user_id, privacy_mode} = _data;
        switch(type) {
            case TYPE_POST_LIKE: {
                this.checkDuplicateScreen(screenKeys.EntityDetail, () => {
                    this.controller.detailEntity({entity: {post_id}})
                })            
                break;
            }
            case TYPE_COMMENT: {
                this.checkDuplicateScreen(screenKeys.EntityDetail, () => {
                    this.controller.detailEntity({entity: {post_id}})
                })     
                break;
            }
            case TYPE_FOLLOW: {
                if(privacy_mode == 'public'){
                    this.checkDuplicateScreen(screenKeys.DetailFollower, () => {
                        NavigationActions.navigateToDetailFollower({header: {user_id}})
                    })  
                }   
                if (privacy_mode == 'private'){
                    NavigationActions.navigateToNotificationTab()
                }
                break;
            }
            case TYPE_POST_REPORTED:
            case TYPE_COMMENT_REPORTED :
            case TYPE_PRIVACY_MODE_FOLLOW : {
                NavigationActions.navigateToNotificationTab()
                break;
            }
        }
        // this.showAlert(title, body);
    });
    
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body, _data = {} } = notificationOpen.notification;
        const {type, post_id, comment_id, user_id, privacy_mode} = _data;
        setTimeout(() => {
            switch(type) {
                case TYPE_POST_LIKE: {
                    this.controller.detailEntity({entity: {post_id}})
                    break;
                }
                case TYPE_COMMENT: {
                    this.controller.detailEntity({entity: {post_id}})
                    break;
                }
                case TYPE_FOLLOW: {
                    if (privacy_mode == "public"){
                        NavigationActions.navigateToDetailFollower({header: {user_id}})
                    }
                    if (privacy_mode == 'private'){
                        NavigationActions.navigateToNotificationTab()
                    }
                    break; 
                }
                case TYPE_POST_REPORTED:
                case TYPE_COMMENT_REPORTED :{
                    NavigationActions.navigateToNotificationTab()
                    break;
                }
            }
        }, 400)
        // this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
        //process data message
    });
    }
      
    showAlert = (title, body) => {
        Alert.alert(
            title, body,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }
    
}