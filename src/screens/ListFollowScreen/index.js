import React from 'react';
import {StyleSheet, View, SafeAreaView, Image,Text,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import {OptimizedFlatList} from '@components/optimizeFlatlist/src' 
import { NavigationActions } from '@actions/navigate';
import {
  FollowerHistory,
  FOLLOWER,
  FOLLOWING,
} from '../../actions/follower.history';
import Container from '@components/container';
import {Avatar} from '@components/avatar';
import fontSizes from '@constants/font-sizes';

import ICONBACK from '../../thumbnails/back_black.png';
import ButtonBorder from '@components/buttonBorder'

import Header from '@components/header';
import styles from './styles'

class ListFollowScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loadmore : false
      };
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    onNavigatorEvent(event) {
      switch(event.id) {
        case 'willAppear':
          const user_id = this.props.user_id;
          // if(this.props.fromScreen === HOME){
          //
          // }else if(this.props.fromScreen === USER_PROFILE){
          //
          // }
          if (this.props.isFollower) {
            FollowerHistory.push(this.props.fromScreen,{
              screen: FOLLOWER,
              user_id,
              actionArrays: [()=>this.props.requestListFollower({user_id})]
            });
            FollowerHistory.runActionAtLastItemHistory(this.props.fromScreen);
          } else {
            FollowerHistory.push(this.props.fromScreen,{
              screen: FOLLOWING,
              user_id,
              actionArrays: [()=>this.props.requestListFollowing({user_id})]
            });
            FollowerHistory.runActionAtLastItemHistory(this.props.fromScreen);
          }

        NavigationActions.setNavigator(this.props.navigator);
        NavigationActions.toggleTabs(true);
         break;
        case 'didAppear':
          break;
        case 'willDisappear':
          FollowerHistory.pop(this.props.fromScreen,result=>{});
          break;
        case 'didDisappear':
          break;
        case 'willCommitPreview':
          break;
      }
    }
    navigateBack = () => {
      NavigationActions.pop();
    };
    componentWillMount(){
      const user_id = this.props.user_id;
      if (this.props.isFollower) {
        this.props.requestListFollower({user_id});
      } else {
        this.props.requestListFollowing({user_id});
      }

    }

    componentWillUnmount(){
      const {user_id, userReducer} = this.props;
      const isMe = user_id === userReducer.user_id;
      this.props.clearListFollow({isMe});
    } 
    componentDidUpdate(prevProps) {
      if (this.props.user_id === this.props.userReducer.user_id) {
        if (this.props.listFollowReducer.data !== prevProps.listFollowReducer.data) {
          if (this.props.listFollowReducer.count === this.props.listFollowReducer.data.length ) {
            if(this.state.loadmore){
              this.setState({loadmore: false})
            }
          }
        }
      } else {
        if (this.props.listFollowReducer.dataFriend !== prevProps.listFollowReducer.dataFriend) {
          if (this.props.listFollowReducer.countDataFriend === this.props.listFollowReducer.dataFriend.length ) {
           if(this.state.loadmore){
             this.setState({loadmore: false})
           } 
          }
        }
      }
    }

    fetchFollowerDetail = (item) => {
      if(item.user_id === this.props.userReducer.user_id){
        // NavigationActions.navigateToProfileTab();
      }else{
        setTimeout(()=>{
          const {user_id, userReducer} = this.props;
          const isMe = user_id === userReducer.user_id;
          this.props.clearListFollow({isMe});
        },300);
        NavigationActions.navigateToDetailFollower({header: {user_id: item.user_id}, fromScreen: this.props.fromScreen})
      }
    };
    
    onPressFollow = (item, index) => {
      const {user_id, userReducer, listFollowReducer} = this.props;
      const isMe = user_id === userReducer.user_id;
      if (isMe) {
        const {blocked} = listFollowReducer.data[index];
        if(blocked) {
          this.props.requestBlockedUsers({user_to:item.user_id})
        }
        else {
          const is_follow = item.follow_status != null;
          this.props.requestFollowing({user_to: item.user_id, isFollow: is_follow, screen: 'listfollow'});
        }
      } else {
        const {blocked} = listFollowReducer.dataFriend[index];
        if(blocked){
          this.props.requestBlockedUsers({user_to:item.user_id})
        }
        else{
          const is_follow = item.follow_status !== null;
          this.props.requestFollowing({user_to: item.user_id, isFollow: is_follow, screen: 'listfollow'});
        }
      }
    };
    _keyExtractor = (item,index) => `${index}`;
    _renderItem = ({item, index}) => {
      const {
        username,
        name,
        avatar,
        thumbnail
      } = item;
      let isMe = item.user_id === this.props.userReducer.user_id;
      let statusFollow = item.follow_status === 'accepted' ? 'FOLLOWING' : 'FOLLOW';
      statusFollow = item.follow_status === 'request' ? 'REQUESTED' : statusFollow;
      let labelButton = statusFollow ;
      labelButton = item.blocked ? 'BLOCKED' : labelButton;
      return (
          <View style={styles.containerItems}>
            <TouchableOpacity pointerEvents={'none'} style={{flexDirection: 'row'}} onPress={() => this.fetchFollowerDetail(item)}>
              <Avatar
                title={''}
                styles={{ width: 50, height: 50}}
                stylesImg={styles.imgAvatar}
                source={thumbnail ? {uri : thumbnail} : null}
                onPress={() => this.fetchFollowerDetail(item)}
                />
              <View style={styles.containerName}>
                <Text numberOfLines={1} allowFontScaling={false} style={styles.textUsername}>{username}</Text>
                <Text numberOfLines={1} allowFontScaling={false} style={styles.textName}>{name}</Text>
              </View>
            </TouchableOpacity>
            {/* { is_follow ?
            <ButtonBorder
              fontWeight={'400'}
              titleSize={fontSizes.smallRegular}
              styles={styles.buttonFollow} title = 'FOLLOWING'
              onPress={this.onPressFollow.bind(this, item, index)}
            /> :  */}
            {isMe ? null :<ButtonBorder
            fontWeight={'400'}
            titleSize={fontSizes.smallRegular}
            styles={styles.buttonFollow} title = {labelButton}
            onPress={this.onPressFollow.bind(this, item, index)}
            /> }
        </View>
      )
    };
    _onEndReached = async () => {
      if(!this.onEndReachedCalledDuringMomentum){
        this.onEndReachedCalledDuringMomentum = true;
        const {count, data, next, countDataFriend, dataFriend, nextDataFriend} = this.props.listFollowReducer;
        let isMe = false;
        if (this.props.user_id === this.props.userReducer.user_id) {
          isMe = true;
        }
        const user_id = this.props.user_id;
        if(this.props.isFollower){
          if (isMe) {
            if(count >= 0 && next && data.length !== count){
              this.setState({loadmore:true});
              this.props.fetchListFollowerMore({user_id,next});
            } else {
              this.setState({loadmore:false})
            }
          } else {
            if(countDataFriend >= 0 && nextDataFriend && dataFriend.length !== countDataFriend){
              this.setState({loadmore:true});
              this.props.fetchListFollowerMore({user_id,next: nextDataFriend});
            } else {
              this.setState({loadmore:false})
            }
          }
        } else {
          if (isMe) {
            if(count >= 0 && next && data.length !== count){
              this.setState({loadmore:true});
              this.props.fetchListFollowingMore({user_id,next});
            } else {
              this.setState({loadmore:false})
            }
          } else {
            if(countDataFriend >= 0 && nextDataFriend && dataFriend.length !== countDataFriend){
              this.setState({loadmore:true});
              this.props.fetchListFollowingMore({user_id,next: nextDataFriend});
            } else {
              this.setState({loadmore:false})
            }
          }
        }
      }
    };
    renderFooter = () => {
      if (!this.state.loadmore) return null;
      return (
      <View	style={{paddingVertical: 20}}>
        <ActivityIndicator animating size="large" />
      </View>
      );
    };

    render() {
      const {isFollower, user_id, userReducer, listFollowReducer} = this.props;
      const isMe = user_id === userReducer.user_id;
      const dataSource = isMe ? listFollowReducer.data : listFollowReducer.dataFriend;
      return (
        <Container> 
          <Header imageLeft={ICONBACK} leftAction={this.navigateBack} 
              noShadow={true} stylesHeader={styles.header}>
              <Text allowFontScaling={false} style={styles.title}>{isFollower ? 'Followers' : 'Following'}</Text>
            </Header>
          <OptimizedFlatList
            scrollEventThrottle={16}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            style = {{flex: 1, marginBottom : 10}}
            data={dataSource}
            onEndReached={this._onEndReached}
            onMomentumScrollBegin={() => {this.onEndReachedCalledDuringMomentum = false;}}
            ListFooterComponent={this.renderFooter}
            initialNumToRender={7}
            onEndReachedThreshold={0.7}
            />
        </Container>
      );
    }
  }
  
  export default ListFollowScreen;