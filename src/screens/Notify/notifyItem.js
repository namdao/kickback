import React from 'react';
import { View, TouchableWithoutFeedback,Text } from 'react-native';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import ButtonBorder from '@components/buttonBorder'; 
import colors from '@constants/colors';
import {NavigationActions} from '@actions/navigate';
import { Avatar } from '@components/avatar';
import Image from '@components/imageProgress';

import styles from './styles';

class NotifyItem extends React.Component {

  calculateWeekByMiliseconds = milisecs => {

    let commentDate = moment(new Date(milisecs));

    let currentDate = moment(new Date());

    return currentDate.diff(commentDate, 'weeks');

  };

  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextProps.item.status != this.props.item.status){
  //     return true;
  //   }
  //   return false;
  // }
  _renderAvatar = (item) => {
    return item.userLike2 ? <View style={styles.avatar}> 
      <Avatar source={item.avatar ? item.avatar : null} styles={[styles.doubleAvatar1, item.avatar ? null : {borderWidth:1}]} isSmall={true} />
      <Avatar source={item.userLike2 ? item.userLike2 : null} styles={[styles.doubleAvatar2,item.userLike2 ? null : {borderWidth: 1}]} stylesImg={styles.imgAvatar2} isSmall={true} />
    </View> : 
    <View>
        <Avatar onPress={() => this.navigateToFollower(item)} source={ (item.track_type == 'post_reported' || item.track_type == 'comment_reported' ) ? null : item.avatar ? item.avatar : null} styles={item.avatar ? styles.avatar : { borderWidth: 1 }} />
    </View>
  };

  navigateToFollower(item){
    if(item && item.track_type != 'post_reported' && item.track_type != 'comment_reported')
      NavigationActions.navigateToDetailFollower({ header: { user_id: item.user[0].user_id } })
  }
  onPressNotifyItem = (item,user) => {
    if(item.track_type != 'user_follow'){
      const {detailEntity} = this.props;
      const entity = {
        post_id: item.post_id,
        user
      }
      if(item.track_type == 'post_reported'){
        NavigationActions.showNotificationBox();
      }
      else detailEntity({entity});
    } else if(item.track_type == 'user_follow'){
      NavigationActions.navigateToDetailFollower({ header: { user_id: item.user[0].user_id } })
    }
  };

  actiontFollow = (item,status) => {
    const {user} = item;
    if(user && user.length > 0 && user[0].user_id != ''){
      let user_from = user[0].user_id;
      let payload = {
        user_from,
        status,
        trackId: item.trackId
      }
      this.props.requestFollowNotify(payload);
    }
  }
  _renderItem = (item) => {
    if (!item) {
      return <Text allowFontScaling={false}>No item display</Text>;
    }
    if (item.isHeader) {
      return <View style={styles.headerListView}>
        <Text allowFontScaling={false} style={styles.titleHeadList}>
          {item.text}
        </Text>
      </View>
    }
    const {user_setting} = this.props.userReducer;
    const isHTML = !!(item.content_push && item.content_push.indexOf('<b>') > -1);
    let contentDisplay = item.content_push;
    if(item.track_type == 'user_follow' && user_setting && user_setting.privacy_mode == 'private'){
      if(item.status == 'request'){
        const contentPrivateMode = `<b>${item.user[0].username}</b> wants to follow you.`;
        contentDisplay = contentPrivateMode;
      }
    }
    const weeks = this.calculateWeekByMiliseconds(item.modified * 1000);
    return (
      <TouchableWithoutFeedback onPress={()=>this.onPressNotifyItem(this.props.item,this.props.userReducer)}>
          <View style={styles.itemView}>
            {this._renderAvatar(item)}
            <View style={styles.containerMessage}>
              {!isHTML ? <Text
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      allowFontScaling={false}
                      style={styles.message}>
                    {item.content_push}
                  </Text> :
                  <HTMLView
                      value={`<div>${contentDisplay}</div>`}
                      stylesheet={styles}
                  />}
              <Text allowFontScaling={false} style={styles.time}>
                {weeks > 1 ? `${weeks} wks` : moment(new Date(item.modified * 1000)).fromNow()}
              </Text>
              {item.track_type == 'user_follow' && 
              user_setting && user_setting.privacy_mode == 'private' &&
              item.status == 'request' ? 
                <View style={styles.containerButton}> 
                <ButtonBorder onPress={() => {this.actiontFollow(item,'accepted')}} colorText={colors.black} title='ACCEPT' styles={styles.buttonSubmit}/>
                <ButtonBorder onPress={() => {this.actiontFollow(item,'denied')}} colorText={colors.black} title='DENY' styles={styles.buttonDeny}/>
                </View> : null
              }
            </View>
            {item.image && <View>
              <Image source={item.image} resizeMode="cover" style={styles.avatar} />
            </View>}
          </View>
        </TouchableWithoutFeedback>
    )
  };

  render() {
    const { item } = this.props;
    return this._renderItem(item);
  }

}
export default NotifyItem;