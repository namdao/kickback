import React from 'react';
import {
  View, SafeAreaView, Image, FlatList, ActivityIndicator, Platform,Text
} from 'react-native';
import moment from 'moment';
import { styles } from './styles';
import Header from '@components/header';
import direct from '../../thumbnails/tab_2.png';
import dot from '../../thumbnails/buttonCamera.png';
import NotifyItem from './notifyItem';
import { NavigationActions } from '@actions/navigate';
import {FollowerHistory, NOTIFICATION} from "../../actions/follower.history";
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
class Notification extends React.PureComponent {

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      isShow: true,
    };
  }

  isIOS = Platform.OS === 'ios';
  pageSize = 15;
  iconDirect = <View style={styles.containerIconDirect}>
    <Image source={direct} />
    <Image source={dot} style={styles.imgDot} resizeMode="contain" />
  </View>;

  state = {
    loadMore: false,
  }

  onEndReachedCalledDuringMomentum = true;

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        FollowerHistory.setTabActiveName(NOTIFICATION);
        NavigationActions.setNavigator(this.props.navigator);
        this.props.getListNotify({
          page: 1,
          type: 'notify',
          limit: this.pageSize,
        });
        this.setState({isShow:true})
        break;
      case 'didAppear':
        NavigationActions.toggleTabs(true);
        break;
      case 'willDisappear':
      this.setState({isShow:false});
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }

  onPressDirect = () => {
    this.props.navigator.switchToTab({
      tabIndex: 1,
    });
  }

  _onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
      const {
        listNotify,
        count,
        next,
        hasThisWeek,
        hasRecent,
      } = this.props.notifyReducer;
      let len = listNotify.length;
      if (hasRecent) {
        len = len - 1;
      }
      if (hasThisWeek) {
        len = len - 1;
      }
      if (count >= 0 && next && Array.isArray(listNotify) && len <= count) {
        this.setState({ ...this.state, loadMore: true }, () => {
          this.props.getListNotifyLoadMore({ next });
        });
      } else {
        this.setState({ ...this.state, loadMore: false });
      }
    }
  };

  _renderItem = ({ item }) => {
    return(
        <NotifyItem 
        item={item}
        detailEntity={this.props.detailEntity} 
        requestEntityDetail={this.props.requestEntityDetail} 
        userReducer={this.props.userReducer}
        requestFollowNotify={this.props.requestFollowNotify}
        />
    )
  };

  renderFooter = () => {
    if (!this.state.loadMore) {
      return null;
    }
    return (
      <View style={styles.containerLoadMore}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  }

  _keyExtractor = (item, index) => (item.trackId || index.toString())

  _renderContent = () => {
    const { listNotify, count } = this.props.notifyReducer;
    let content;
    if (count === 0) {
      content = [<Header
        mainText="Notifications"
        noShadow={false}
        key={`header`}
        styleContainer={styles.headerContainer}
        stylesHeaderText={styles.titleHeader}
        stylesHeader={styles.styleHeader}
        stylesHeaderImage={styles.stylesHeaderImage}
        styleMainText={styles.styleMainText}
        actionRight={[{
          action: this.onPressDirect,
          component: this.iconDirect,
          styleTouchable: styles.styleTouchable
        }]} />,
      <View key={`body`} style={styles.containerListEmpty} key="noNotify">
        <Text allowFontScaling={false} style={styles.textListEmpty}>You don't have any notifications.</Text>
      </View>];
      return content;
    }
    content = [<Header
      mainText="Notifications"
      noShadow={false}
      key={`header`}
      styleContainer={styles.headerContainer}
      stylesHeaderText={styles.titleHeader}
      stylesHeader={styles.styleHeader}
      stylesHeaderImage={styles.stylesHeaderImage}
      styleMainText={styles.styleMainText}
      actionRight={[{
        action: this.onPressDirect,
        component: this.iconDirect,
        styleTouchable: styles.styleTouchable
      }]} />,
    <View key={`body`} style={styles.container}>
      <FlatList
        data={listNotify}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        onMomentumScrollBegin={this.onMomentumScrollBegin}
        ListFooterComponent={() => this.renderFooter()}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0}
        scrollEventThrottle={100}
        keyExtractor = {(item, index) => index.toString()}
      />
    </View>];
    return content;
  }

  render() {
    if(!this.state.isShow) return null;
    const content = this._renderContent();
    const wrapper = this.isIOS ? <SafeAreaView style={styles.flex1}>
      {content}
    </SafeAreaView> : <View style={styles.flex1}>
        {content}
      </View>
    return (
      <View style={styles.container}>
        {wrapper}
      </View>
    )
  }
}
export default Notification;
