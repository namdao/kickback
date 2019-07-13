import React from 'react';
import { ActivityIndicator, View, TouchableOpacity, TextInput, Text, FlatList, Keyboard } from 'react-native';
import { NavigationActions } from '@actions/navigate';
import Container from '@components/container';
import Header from '@components/header';
import ICON_BACK from '../../thumbnails/back_black.png'
import FILTER from '../../thumbnails/filter.png'
import FeedEntity from '@components/feedEntity';
import styles from './styles';
import _ from 'lodash'
import { Avatar } from '@components/avatar';
import ButtonBorder from '@components/buttonBorder'
import fontSizes from '@constants/font-sizes';
import colors from '@constants/colors';
import {HOME, SEARCH_RESULT, USER_PROFILE, FollowerHistory} from '../../actions/follower.history';
import {OptimizedFlatList} from '@components/optimizeFlatlist/src' 

export default class SearchProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      positionY: 0,
      loadmore: false,
      textSearch: props.textSearch,
      isDisplay: false
    };
    this.screen = props.fromScreen;
    this.searchApi = _.debounce(this.searchApi, 700);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':

        NavigationActions.setNavigator(this.props.navigator);

        const { searchMode } = this.props;
        if(searchMode === 'basic'){
          FollowerHistory.push(this.props.fromScreen,{
            screen: SEARCH_RESULT,
            user_id: null,
            actionArrays: [
              ()=>this.props.requestListSearchUsersBasic({ textSearch: this.state.textSearch }),
              ()=>this.setState({
                ...this.state
              })
            ]
          });

        }else if(searchMode === "advance"){

        }
        FollowerHistory.runActionAtLastItemHistory(this.props.fromScreen);

        break;
      case 'didAppear':
        // this.props.playCurrentVideo({ isSearch: true });
        break;
      case 'willDisappear':
        FollowerHistory.pop(this.props.fromScreen,result=>{});
        // this.props.stopAllVideo();
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }
  changeTextSearch = (textSearch) => {
    this.setState({textSearch});
  }
  dismissKeyBoard = () => {
    Keyboard.dismiss();
  }
  searchApi = () => {
    const { textSearch } = this.state;
    // this.props.fetchEntities({ isSearch: true, textSearch: textSearch })
    if(this.props.searchMode === "basic"){
      this.props.requestListSearchUsersBasic({ textSearch: textSearch , fromScreen: this.props.fromScreen, searchMode: this.props.searchMode })
    }else if(this.props.searchMode === "advance"){
      this.props.requestListSearchUsersBasic({ textSearch: textSearch , fromScreen: this.props.fromScreen, searchMode: this.props.searchMode })
      // alert("ADVANCE NHA1");
    }
  }
  componentWillMount = () => {
    setTimeout(() => {
      this.setState({ isDisplay: true });
    }, 30)
    // this.props.fetchEntities({ isSearch: true, textSearch: this.state.textSearch })
    if (this.screen === USER_PROFILE && this.props.searchMode ==="basic"){
      this.props.requestListSearchUsersBasic({ textSearch: this.state.textSearch, fromScreen: this.props.fromScreen, searchMode: 'basic'})
    }else if(this.props.searchMode === "advance"){
      // alert("ADVANCE NHA2");
    }
  }
  back = () => {
    this.props.backHome();
    NavigationActions.pop();
    this.props.clearListSearchUsers();
  }
  showBox = () => {
    this.setState({
      textSearch: ""
    });
    FollowerHistory.pop(this.props.fromScreen,result=>{});
    NavigationActions.pop();
    NavigationActions.navigateToSearchAdvanceFromProfile({ fromScreen: this.props.fromScreen, textSearch: this.changeTextSearch, searchMode: "advance"});
  }

  fetchFollowerDetail = (item) => {
    const {user_id} = this.props.userReducer;
    const { tabIndex } = this.props;
    if(user_id === item.user_id){
      //Current screen is Profile, so not navigate.
      if(tabIndex === 2) {
        NavigationActions.pop();
        return;
      }
      NavigationActions.navigateToProfileTab();
    }else{
      NavigationActions.navigateToDetailFollower({header : {user_id:item.user_id }, fromScreen: this.props.fromScreen});
    }
  };

  onPressFollow = (item) => {
    const { requestFollowing, requestBlockedUsers } = this.props;
    const { blocked } = item;
    if (blocked) {
      requestBlockedUsers({ user_to: item.user_id })
    }
    else {
      const is_follow = item.follow_status == null ? false : true;
      // requestFollowing({ user_to: item.user_id, isFollow: is_follow, screen: 'searchUsers' });
      requestFollowing({ user_to: item.user_id, isFollow: is_follow, screen: 'searchUsers' });
    }
  }

  _renderItem = ({ item, index }) => {
    const {
      username,
      name,
      avatar,
      thumbnail
    } = item;
    const { user_id } = this.props.userReducer;
    let statusFollow = item.follow_status == 'accepted' ? 'FOLLOWING' : 'FOLLOW';
    statusFollow = item.follow_status == 'request' ? 'REQUESTED' : statusFollow;
    let labelButton = statusFollow;
    labelButton = item.blocked ? 'BLOCKED' : labelButton;
    return (
      <View style={styles.containerItems}>
        <TouchableOpacity pointerEvents={'none'} style={{ flexDirection: 'row' }} onPress={this.fetchFollowerDetail.bind(this, item)}>
          <Avatar
            title={''}
            styles={{ width: 50, height: 50 }}
            stylesImg={styles.imgAvatar}
            source={thumbnail ? { uri: thumbnail } : null}
            onPress={this.fetchFollowerDetail.bind(this, item)}
          />
          <View style={styles.containerName}>
            <Text numberOfLines={1} allowFontScaling={false} style={styles.textUsername}>{username}</Text>
            <Text numberOfLines={1} allowFontScaling={false} style={styles.textName}>{name}</Text>
          </View>
        </TouchableOpacity>
        {user_id != item.user_id ? <ButtonBorder
          fontWeight={'400'}
          titleSize={fontSizes.smallRegular}
          styles={styles.buttonFollow} title={labelButton}
          onPress={this.onPressFollow.bind(this, item)}
        /> : null}
      </View>
    );
  }
  onChangeText = (text) => {
    this.onEndReachedCalledDuringMomentum = false;
    this.setState({ textSearch: text });
    this.searchApi();
  }
  componentDidUpdate(prevProps) {
    if (this.props.searchProfileReducer.data != prevProps.searchProfileReducer.data) {
      if (this.props.searchProfileReducer.count == this.props.searchProfileReducer.data.length) {
        this.setState({ loadmore: false })
      }
    }
  }
  renderFooter = () => {
    if (!this.props.loadingReducer.isLoadMoreSearchProfile) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  _onEndReached = async () => {
    if (!this.onEndReachedCalledDuringMomentum && !this.props.loadingReducer.isLoadMoreSearchProfile) {
      this.onEndReachedCalledDuringMomentum = true;
      const { data, count, next } = this.props.searchProfileReducer;
      if (count >= 0 && next && data.length != count) {
        this.setState({ loadmore: true });
        // this.props.fetchEntitiesMore({ nextSearch, isSearch: true });
        this.props.fetchListSearchUsersBasicMore({next});
      } else {
        this.setState({ loadmore: false });
      }
    }
  }
  render() {
    const { loadingReducer } = this.props;
    const { isDisplay } = this.state;
    const dataList = this.props.searchProfileReducer.data;
    return (
      <Container>
        <Header imageLeft={ICON_BACK}
          actionRight={[{
            icon: FILTER,
            action: this.showBox
          }]}
          leftAction={this.back}
          noShadow={true} stylesHeader={styles.header}>
          <View style={styles.blockHeader}>
            <Text allowFontScaling={false} style={styles.title}>SEARCHING</Text>
            <TextInput allowFontScaling={false} value={this.state.textSearch} onChangeText={this.onChangeText} style={styles.inputSearch} />
          </View>
        </Header>
        {isDisplay ? <OptimizedFlatList
          scrollEventThrottle={16}
          // onScrollEndDrag={this.handleScroll}
          ListFooterComponent={this.renderFooter}
          onEndReached={this._onEndReached}
          initialNumToRender={5}
          contentContainerStyle={{paddingBottom: 10}}
          onEndReachedThreshold={0.7}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          data={dataList}
          renderItem={this._renderItem}
          extraData={dataList}
          keyExtractor={(item, index) => index.toString()}
        /> : null}
        {!loadingReducer.isLoading && isDisplay && this.props.searchProfileReducer.data.length == 0 ? <TouchableOpacity
          onPress={this.dismissKeyBoard}
          style={styles.loading}>
          <Text allowFontScaling={false}>There are no results that match your search</Text>
        </TouchableOpacity> : null}
      </Container>
    )
  }
}

