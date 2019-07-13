import React from 'react';
import { Image, TouchableOpacity,View, Text } from 'react-native';
import styles from './styles';
import moment from 'moment';
// import COMMENT from '../../thumbnails/icon-comment-notempty.png';
// import COMMENTEMTY from '../../thumbnails/icon-comment-white.png';
// import NOTLIKE from '../../thumbnails/icon-like-white.png';
// import LIKE from '../../thumbnails/ico-like.png';
// import directSmall from '../../thumbnails/direct-white.png';
let COMMENT = null;
let COMMENTEMTY = null;
let NOTLIKE = null;
let LIKE = null;
let directSmall = null;
moment.updateLocale(moment.locale(), {
  relativeTime: {
    future: "in %s",
    past: function (number) {
      const oneDay = 'day', manyDay = 'days', oneWeek = 'wk', manyWeeks = 'wks';
      let splitByDay = number.split("day");
      let splitByWeeks = number.split("week");
      if(splitByDay.length > 1) {
        const dayCount = parseInt(splitByDay[0], 10);
        if (dayCount === 1) {
          return `${dayCount} ${oneDay}`;
        } else if (dayCount > 1 && dayCount < 7) {
          return `${dayCount} ${manyDay}`;
        } else {
          const weekCount = Math.round(dayCount/7);
          return weekCount > 1 ? `${weekCount} ${manyWeeks}` : `${weekCount} ${oneWeek}`;
        }
      }else if(splitByWeeks.length > 1){
        const weekCount = parseInt(splitByDay[0], 10);
        if (weekCount === 1) {
          return `${weekCount} ${oneWeek}`;
        } else {
          return `${weekCount} ${manyWeeks}`;
        }
      }
      return `${number} ago`;
    },
    s: "seconds",
    m: "1 min",
    mm: "%d mins",
    h: "1 hr",
    hh: "%d hrs",
    d: "1 day",
    dd: "%d days",
    w: "1 wk",
    ww: "%d wks",
    /**
     * @return {string}
     */
    M: function (number) {
      return number * 4 + " wks";
    },
    /**
     * @return {string}
     */
    MM: function (number) {
      return number * 4 + " wks";
    },
    y: function (number) {
      return number * 52 + " wks";
    },
    yy: function (number) {
      return number * 52 + " wks";
    }
  }
});
class ListIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.btnHitslop = {
      top: 5, bottom: 5, left: 10, right: 10
    }
    if(COMMENT == null){
      COMMENT = require('@thumbnails/icon-comment-notempty.png');
    }
    if(COMMENTEMTY == null){
      COMMENTEMTY = require('@thumbnails/icon-comment-white.png');
    }
    if(NOTLIKE == null){
      NOTLIKE = require('@thumbnails/icon-like-white.png');
    }
    if(LIKE == null){
      LIKE = require('@thumbnails/ico-like.png');
    }
    if(directSmall == null){
      directSmall = require('@thumbnails/direct-white.png');
    }
    let {entities:{created}} = this.props;
    this.weeks = this.calculateWeekByMiliseconds(created * 1000);
  }

  calculateWeekByMiliseconds = milisecs => {
    let createDate = moment(new Date(milisecs));
    let currentDate = moment(new Date());
    let weeks = currentDate.diff(createDate, 'weeks');
    if(weeks > 1){
      return `${weeks} wks` ;
    }
    else{
      return createDate.fromNow();
    }
  };
  onPressComment = () => {
    this.props.detailEntity({ entity: this.props.entities });
  };
  likePost = () => {
    const {entities:{post_id,like,total_like}} = this.props;
    const payload = { post: post_id, isLike: like, total_like }
    this.props.requestLikeEntity(payload);
  }
  comingSoon = () => {
    this.props.comingSoon();
  };
  render() {
    let {userReducer,entities:{medias,total_comments,user:{user_id},like,total_like},screenDetail} = this.props;
    const bottomStyle = { bottom: (medias.length == 1 && medias[0].media_type == 'photo') ? 60 : 80 };
    return (
     <View pointerEvents={'box-none'} style={[styles.likeCommentContainer, bottomStyle]}>
          <Text style={{color:'white'}}>
          {/* {this.weeks} */}
          </Text>
          <View pointerEvents={'box-none'} style={{ flexDirection: 'row' }}>
            {screenDetail ? null :
              <TouchableOpacity hitSlop={this.btnHitslop} style={{ width: 15, height: 30, marginRight: 25 }} onPress={this.comingSoon}>
                <Image source={directSmall} resizeMode='cover' />
              </TouchableOpacity>
            }
            {screenDetail ? null :
              <TouchableOpacity hitSlop={this.btnHitslop} style={{ width: 15, height: 30, marginRight: 25 }} onPress={this.props.detailEntity ? this.onPressComment : null}>
                <Image source={total_comments > 0 ? COMMENT : COMMENTEMTY} resizeMode='cover' />
              </TouchableOpacity>
            }
              <TouchableOpacity style={{ width: 15, height: 30 }} hitSlop={this.btnHitslop} onPress={this.likePost} >
                <Image source={!like ? NOTLIKE : LIKE} resizeMode='stretch' />
              </TouchableOpacity>
            {userReducer.user_id == user_id && total_like > 0 ? 
              <Text allowFontScaling={false} style={styles.txtCountLiked}>{total_like}</Text>
            : null}
          </View>
    </View>
    )
  }
}

export default ListIcon