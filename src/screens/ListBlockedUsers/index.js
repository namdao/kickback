import React from 'react';
import {TouchableOpacity, View, SafeAreaView, FlatList, Text,Image,ActivityIndicator} from 'react-native';
import { NavigationActions } from '@actions/navigate';
import Container from '@components/container';
import {OptimizedFlatList} from '@components/optimizeFlatlist/src' 

import ICONBACK from '../../thumbnails/back_black.png';
import ICONCLOSED from '../../thumbnails/closed_button.png';
import colors from '@constants/colors';

import Header from '@components/header';
import styles from './styles';

class ListBlockedUsers extends React.Component{
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
          loadmore: false
        }
    }
    back = () => {
        NavigationActions.toggleTabs(false);
        NavigationActions.pop();
    }
    onNavigatorEvent(event) {
        switch(event.id) {
          case 'willAppear':
          NavigationActions.setNavigator(this.props.navigator);
          NavigationActions.toggleTabs(false);
           break;
          case 'didAppear':
            break;
          case 'willDisappear':
            break;
          case 'didDisappear':
            break;
          case 'willCommitPreview':
            break;
        }
      }
      componentWillMount(){
        this.props.requestListBlockedUsers();
      }
      onUnblock = (user_id) => {
        this.props.requestBlockedUsers({user_to: user_id});
      }
      onPressClosedButton = (item, index) => {
        const {userReducer,listBlockedUsersReducer} = this.props;
        NavigationActions.showUnblockUserBox({
          user_to : item.user_id,
          username : item.username,
          onUnblock : this.onUnblock
        });
      }
      
      componentWillUpdate(nextProps){
        if (nextProps.listBlockedUsersReducer.count != this.props.listBlockedUsersReducer.count) {
          if (nextProps.listBlockedUsersReducer.count == 0) {
            this.setState({loadmore: false});
          }
      }
    }

      _onEndReached = async () => {
        if (!this.onEndReachedCalledDuringMomentum) {
          this.onEndReachedCalledDuringMomentum = true;
          const {data, count, next} = this.props.listBlockedUsersReducer;
          if (count >= 0 && next && data.length != count) {
            this.setState({loadmore: true});
            this.props.fetchListBlockedUsersMore({next});
          } else {
            this.setState({loadmore: false});
          }
        }
    }
    renderFooter = () => {
      if (!this.state.loadmore || !this.props.listBlockedUsersReducer.next) return null;
          return (
          <View	style={{paddingVertical: 20}}>
              <ActivityIndicator animating size="large" />
          </View>
          );
    };
      keyExtractor = (item, index) => index.toString();
      _itemSeparator = () => <View style = {styles.separateLine}></View>
      _renderListData = ({item, index}) =>  {
        let style = {};
        const {username} = item
        const {listBlockedUsersReducer} = this.props
        if (index == listBlockedUsersReducer.data.length - 1)
        {
          style = [styles.item, {borderBottomColor: colors.holderColor, borderBottomWidth: 1}];
        } else {style = [styles.item]}
        return <View style = {style} onPress={item.onPress}>
          <Text allowFontScaling={false} style = {styles.text}>{username}</Text>
          <TouchableOpacity onPress={() => this.onPressClosedButton(item)}>
            <Image source={ICONCLOSED} resizeMode='cover' style={styles.btnClosed}/>
          </TouchableOpacity>
        </View>
      }
      render() {
        return (
          <Container>
            <Header leftAction={this.back} imageLeft={ICONBACK} noShadow={true} stylesHeader={styles.header}
            mainText={'Blocked Users'}/>
            <OptimizedFlatList
              ItemSeparatorComponent = {this._itemSeparator}
              style={{flex: 1, backgroundColor: 'white'}}
              keyExtractor={this.keyExtractor}
              data={this.props.listBlockedUsersReducer.data}
              renderItem={this._renderListData}
              onEndReached={this._onEndReached}
              ListFooterComponent={this.renderFooter}
              initialNumToRender={5}
              onEndReachedThreshold={0.7}
              onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
              />
          </Container>
        );
      }
}

export default ListBlockedUsers