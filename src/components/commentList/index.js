import React from 'react';
import { Text, TouchableOpacity, FlatList, View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Avatar } from '../avatar';
import moment from 'moment';
import { NavigationActions } from '@actions/navigate'
import {OptimizedFlatList} from '@components/optimizeFlatlist/src' 

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

class ComponentComment extends React.Component {
  constructor(props) {
    super(props)
    this.lengthComment = 0;
    this.state = {
      isLoading: false,
      isRefreshing: false,
      loadmore: false
    }
    this.showTop = false;
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95
    }

  }

  calculateWeekByMiliseconds = milisecs => {
    let commentDate = moment(new Date(milisecs));
    let currentDate = moment(new Date());
    return currentDate.diff(commentDate, 'weeks');
  };

  scrollToEnd = () => {
    if (this.refs.flatlist) {
      this.refs.flatlist.scrollToEnd({ animated: true })
    }
  }

  scrollToTop = () => {
    if (this.refs.flatlist) {
      this.refs.flatlist.scrollToOffset({ offset: 0, animated: true });
    }
  }

  componentDidUpdate = () => {
    // setTimeout(() => {
    //   this.scrollToEnd();
    // }, 1000)
  }
  componentWillUpdate = (nextProps) => {
    if (nextProps.commentReducer.count != this.props.commentReducer.count) {
      if (nextProps.commentReducer.count == 0) {
        this.setState({ loadmore: false });
      }
    }
  }
  shareData = (item, parentId) => {
    this.props.share(item, parentId)
  }
  keyExtractor = (item, index) => item.comment_id;
  itemSeparator = () => <View style={styles.separateLine}></View>
  _renderListData = ({ item }) => {
    const {
      currentUser,
      parent,
      onDeleteComment,
      isSubMess,
      commentReducer,
      fetchCommentMore,
      fetchSubCommentMore,
      entity
    } = this.props;
    const parentId = parent ? parent : item.comment_id;

    const weeks = this.calculateWeekByMiliseconds(item.created * 1000);

    return (<View style={[styles.container, isSubMess ? { alignItems: 'flex-end' } : {}]}>
      <View style={isSubMess ? { width: '85%' } : {}}>
        <View style={[styles.item]}>
          <View style={{ flexDirection: 'row' }}>
            <Avatar onPress={this.shareData.bind(this, item, parentId)} styles={{ width: isSubMess ? 30 : 50, height: isSubMess ? 30 : 50 }} source={item.user.thumbnail ? { uri: item.user.thumbnail } : null} isSmall={!isSubMess ? false : true}/>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <TouchableOpacity onPress={this.shareData.bind(this, item, parentId)}>
                <Text style={styles.paddingLeftMess}>
                  <Text allowFontScaling={false} style={styles.userName}>{item.user.username}</Text>
                  <Text includeFontPadding={false} adjustsFontSizeToFit={true} allowFontScaling={false} style={styles.message}>{` ${item.content}`}</Text>
                </Text>
              </TouchableOpacity>
              <View style={styles.frameTime}>
                <Text allowFontScaling={false} style={styles.time}>{weeks > 1 ? `${weeks} wks` : moment(new Date(item.created * 1000)).fromNow()} •  </Text>
                <TouchableOpacity onPress={() => this.props.onPressReplyItem(item, parentId)}><Text allowFontScaling={false} style={styles.reply}>Reply</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {!parent ?
            <ComponentComment
                share={this.props.share}
                onDeleteComment={onDeleteComment}
                onPressReplyItem={this.props.onPressReplyItem}
                isSubMess={true} currentUser={currentUser}
                onPressItem={this.props.onPressItem}
                parent={item.comment_id}
                fetchCommentMore={fetchCommentMore}
                fetchSubCommentMore={fetchSubCommentMore}
                parentComment={item}
                entity={entity}
                dataListSelectBox={item.subComments}
                commentReducer={commentReducer} /> : null}
      </View>
    </View>)
  };
  _loadComments = () => {
    const { requestEntityDetail, entity: { post_id } } = this.props;
    this.setState({ isRefreshing: true }, () => {
      requestEntityDetail({ post_id });
      this.setState({ isRefreshing: false });
    });
  }
  _onEndReached = async () => {
  }

  loadMore = () => {
    const { entity: { post_id }, fetchCommentMore } = this.props
    const { comments, count, next } = this.props.commentReducer;
    if (count >= 0 && next && comments.length != count) {
      fetchCommentMore({ next, post_id });
    }
  }
  loadMoreSubComment = () => {
    const { entity: { post_id }, fetchSubCommentMore, parentComment } = this.props
    const { comments } = this.props.commentReducer;
    const { total_sub_comment, next, comment_id } = parentComment;
    if (total_sub_comment >= 0 && next && comments.length != total_sub_comment) {
      fetchSubCommentMore({ next, post_id, comment_id });
    }
  }
  renderFooter = () => {
    const { comments, count, next } = this.props.commentReducer;
    if (!this.state.loadmore) {
      return (
          <View>
            {!this.props.parent
            && count > comments.length ?
                <TouchableOpacity onPress={this.loadMore} style={styles.wrappedMore}>
                  <Text style={styles.txtMore}>More...</Text>
                </TouchableOpacity> : null}
          </View>
      )
    };
    return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator animating size="large" />
        </View>
    );
  };
  handleScroll = (event: Object) => {
    if (event.nativeEvent.contentOffset.y >= 500 && !this.showTop) {
      this.showTop = true;
      this.props.setShowButtonScroll(true, this.scrollToTop)
    } else if (event.nativeEvent.contentOffset.y < 500 && this.showTop) {
      this.showTop = false;
      this.props.setShowButtonScroll(false, this.scrollToTop)
    }
  }
  render() {
    return (
        <View>
          <FlatList
              onScroll={!this.props.parent ? this.handleScroll : null}
              scrollEventThrottle={16}
              scrollsToTop
              ItemSeparatorComponent={this._itemSeparator}
              ref={!this.props.parent ? 'flatlist' : null}
              style={{ flex: 1 }}
              ListHeaderComponent={!this.props.parent ? this.props.FeedEntity : null}
              keyExtractor={this.keyExtractor}
              onContentSizeChange={() => {
                if (!this.props.parent
                    && this.props.dataListSelectBox
                    && this.props.dataListSelectBox.length != this.lengthComment) {
                  this.lengthComment = this.props.dataListSelectBox.length;
                  setTimeout(() => {
                    this.scrollToEnd();
                  }, 200)
                }
              }}
              data={this.props.dataListSelectBox ? this.props.dataListSelectBox : []}
              renderItem={this._renderListData}
              // refreshing={this.state.isRefreshing}
              // onRefresh={() => {this._loadComments()}}
              onEndReached={this._onEndReached}
              onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
              ListFooterComponent={this.renderFooter}
          />
          {
            this.props.parent
            && this.props.parentComment.total_sub_comment > this.props.parentComment.subComments.length ?
                <TouchableOpacity onPress={this.loadMoreSubComment} style={styles.wrappedMore}>
                  <Text style={styles.txtMore}>More...</Text>
                </TouchableOpacity> : null}
        </View>

    );
  }
}

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowScrollButton: false
    }
  }
  following = (user_to_id, follow_status, parent) => {
    let follow = follow_status == null ? false : true; 
    const payload = { user_to: user_to_id, isFollow: follow, screen: 'commentList', parent }
    this.props.requestFollowing(payload);
  }

  getParamReport = (item) => {
    const functionReport = this.props.createReportComment || function () { };
    const dataListReport = [{
      title: 'It\'s inappropriate',
      onPress: () => functionReport({
        comment: item,
        reason: 'It\'s inappropriate'
      })
    },
      {
        title: 'It\'s harassment',
        onPress: () => functionReport({
          comment: item,
          reason: 'It\'s harassment'
        })
      },
      {
        title: 'It\'s abusive',
        onPress: () => functionReport({
          comment: item,
          reason: 'It\'s abusive'
        })
      }];
    const reportParams = {
      title: 'Report Comment',
      subTitle: 'Choose a reason for reporting this post:',
      dataListReport
    };
    return reportParams;
  }
  onBlock = (user_to_id, screen = null) => {
    // const {currentUser} = this.props;
    const payload = {user_to : user_to_id,isBlocked: true, screen}
    this.props.requestBlockedUsers(payload);
  }
  menuOtherUser = (item, itemUserId, parent) => {
    const {user_id,username,follow_status} = item.user;
    const {screen} = this.props;
    return [
      {
        title: follow_status == 'accepted' ? 'Following' : 'Follow',
        isCheck: follow_status == 'accepted' ? true : false,
        onPress: () => this.following(itemUserId, follow_status, parent)
      }, {
        title: 'Mute',
        onPress: () => NavigationActions.showCommingSoonBox('COMING SOON')
      }, {
        title: 'Report',
        onPress: () => NavigationActions.showReportBox(this.getParamReport(item))
      }, {
        title: 'Block',
        isBlocked: true,
        onPress: () => NavigationActions.showBlockUserBox({
          onBlock: this.onBlock,
          user_id,
          screen,
          username
        })
      }
    ];
  }

  share = (item, parent) => {
    const { currentUser, onDeleteComment } = this.props;
    const currentUserId = currentUser.user_id;
    const itemUserId = item.user.user_id;
    let dataListSelectBox = [];
    if (currentUserId != itemUserId) {
      dataListSelectBox = this.menuOtherUser(item, itemUserId, parent);
    }
    else {
      dataListSelectBox = [
        {
          title: 'Edit',
          onPress: () => {
            NavigationActions.navigateToEditComment({ item: item });
          }
        }, {
          title: 'Delete',
          onPress: () => {
            const onDelete = (payload) => { onDeleteComment(payload) };
            NavigationActions.showDeleteBox({
              item: item,
              onDelete: onDelete,
              screen: 'detailPostScreen',
              mess: 'Delete this comment?'
            })

          }
        }
      ];
    }
    NavigationActions.showListSelectBox({ dataListSelectBox, isLeft: true });
  }

  onPressItem = (item) => {
    NavigationActions.dismissLightBox();
    item.onPress();
  }

  onPressReplyItem = (item, parent) => {
    if (this.props.onPressReply) {
      this.props.onPressReply(item, parent)
    }
  }

  // Using for show or hide button scroll
  setShowButtonScroll = (logic, scrollToTop) => {
    this.setState({ isShowScrollButton: logic })
    // Sync function ScrollToTop With This Variable
    if (!this.scrollToTop) {
      this.scrollToTop = scrollToTop;
    }
  }
  moveTop = () => {
    if (this.scrollToTop) {
      this.scrollToTop();
    }
  }
  render() {
    const {
      currentUser,
      onDeleteComment,
      requestEntityDetail,
      entity, fetchCommentMore,
      commentReducer,
      fetchSubCommentMore,
      dataListSelectBox,
      FeedEntity
    } = this.props;
    const { isShowScrollButton } = this.state;
    return (
        <View style={styles.commentBox}>
          <ComponentComment
              FeedEntity={FeedEntity}
              entity={entity}
              requestEntityDetail={requestEntityDetail}
              share={this.share}
              onDeleteComment={onDeleteComment}
              onPressReplyItem={this.onPressReplyItem}
              onPressItem={this.onPressItem}
              currentUser={currentUser}
              dataListSelectBox={dataListSelectBox}
              fetchCommentMore={fetchCommentMore}
              fetchSubCommentMore={fetchSubCommentMore}
              setShowButtonScroll={this.setShowButtonScroll}
              commentReducer={commentReducer} />
          {isShowScrollButton ? (
              <TouchableOpacity
                  onPress={this.moveTop}
                  style={styles.buttonBackToTop}>
                <Text
                    style={styles.textBackToTop}
                    allowFontScaling={false}>Top</Text>
              </TouchableOpacity>
          ) : null}
        </View>
    );
  }
}
export default CommentList;
