import React from 'react';
import {TouchableOpacity, View, SafeAreaView, FlatList, Text,Image} from 'react-native';
import { NavigationActions } from '@actions/navigate';
import Container from '@components/container';

import HEADERKICKBACK from '../../thumbnails/header_kickback.png';
import SETTING from '../../thumbnails/setting.png';
import ICONBACK from '../../thumbnails/back_black.png';
import ICONCHECKED from '../../thumbnails/iconCheckedBig.png';
import colors from '@constants/colors';

import Header from '@components/header';
import styles from './styles';
import {privacy_mode,Public,Private} from '@constants/privacy';
class PrivacyMode extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    const {user_setting:{privacy_mode}} = this.props.userReducer;
    this.state = {
      data: [
        {
            isActive: privacy_mode == 'public' ? true : false,
            title: 'Public Profile',
            content: 'Your profile and content is viewable to all users.',
        },
        {
            isActive: privacy_mode == 'private' ? true : false,
            title: 'Private Profile', 
            content: 'Users can see that you are on the app but cannot see your content unless they are an accepted follower.',
        },
      ]
    };
  }

  componentWillUpdate(nextProps) {
    if(nextProps.userReducer.user_setting.privacy_mode != this.props.userReducer.user_setting.privacy_mode){
      let newData = this.state.data.slice();
      let idx = 0;
      if(nextProps.userReducer.user_setting.privacy_mode == 'public'){
        idx = 0;
      } else {
        idx = 1;
      }
      newData[idx].isActive = true;
      newData.map((item, index) => {
        index != idx && (item.isActive = false);
      })
      this.setState({
        data: newData
      })
    }
  }
  changeStatus = (indexStatus) => {
    let payload = {
      setting_options: 'privacy_mode'
    };
    if (indexStatus == 0) {
      payload.setting_values = 'public';
      this.props.requestChangePrivacyMode(payload);
    } else {
      payload.setting_values = 'private';
      this.props.requestChangePrivacyMode(payload);
    }
  }
  back = () => {
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

  keyExtractor = (item, index) => index.toString();

  _itemSeparator = () => <View style = {styles.separateLine}></View>

  _renderListData = ({item, index}) =>  {
    let style = {};
    if (index == this.state.data.length - 1)
    {
      style = [styles.item, {borderBottomColor: colors.holderColor, borderBottomWidth: 1}];
    } else {style = [styles.item]}
    if (item.isActive) {
      return (
        <View style = {style}>
          <View style={{flexDirection:'row'}}>
            <Text allowFontScaling={false} style = {styles.activeText}>{item.title}</Text>
            <Image source={ICONCHECKED} resizeMode='stretch' style={styles.iconChecked}/>
          </View>
          <Text allowFontScaling={false} style = {styles.activeContent}>{item.content}</Text>
        </View>
      )
    } else {
      return (
        <TouchableOpacity style = {style} onPress={this.changeStatus.bind(this, index)}>
          <Text allowFontScaling={false} style = {styles.unactiveText}>{item.title}</Text>
          <Text allowFontScaling={false} style = {styles.unactiveContent}>{item.content}</Text>
        </TouchableOpacity>
      )
    }
  }
  render() {
    return (
      <Container>
        <Header leftAction={this.back} imageLeft={ICONBACK} noShadow={true} stylesHeader={styles.header}
        mainText={'Privacy Mode'}/>
        <FlatList
          ItemSeparatorComponent = {this._itemSeparator}
          style={{flex: 1, backgroundColor: 'white'}}
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this._renderListData}/>
      </Container>
    );
  }
}

export default PrivacyMode;