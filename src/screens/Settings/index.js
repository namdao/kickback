import React from 'react';
import { TouchableOpacity, View, SafeAreaView, FlatList, Text } from 'react-native';
import { NavigationActions } from '@actions/navigate';
import Container from '@components/container'; 
import HEADERKICKBACK from '../../thumbnails/header_kickback.png';
import SETTING from '../../thumbnails/setting.png';
import ICONBACK from '../../thumbnails/back_black.png';
import colors from '@constants/colors';

import Header from '@components/header';
import styles from './styles'

import terms from '@html/TermsAndConditions.js';
import privacyPolicy from '@html/PrivacyPolicy.js';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.data = [
      {title: 'Invite Friends', onPress: () => {NavigationActions.navigateToInviteFriendScreen({  })}},
      {title: 'Edit Profile', onPress: () => {NavigationActions.navigateToCreateProfile({isEdit: true, userData: props.userReducer, isHideToggleTab: true})}},
      {title: 'Top Post Radius', onPress: () => {NavigationActions.showCommingSoonBox('COMING SOON')}},
      {title: 'Privacy Mode', onPress: () => {NavigationActions.navigateToPrivacyMode()}},
      {title: 'Default Landing Feed', onPress: () => {NavigationActions.showCommingSoonBox('COMING SOON')}},
      {title: 'Change Email', onPress: () => {NavigationActions.showCommingSoonBox('COMING SOON')}},
      {title: 'Blocked Users', onPress: () => {NavigationActions.navigateToListBlockedUsers()}},
      {title: 'Terms and Conditions', onPress: () => {NavigationActions.navigateToTermsAndPrivacy({title: 'Terms and Conditions', htmlSource: terms})}},
      {title: 'Privacy Policy', onPress: () => {NavigationActions.navigateToTermsAndPrivacy({title: 'Privacy Policy', htmlSource: privacyPolicy})}},
      {title: 'Sign Out', onPress: () => {
        this.props.logout()
      }}
    ];
  }
  back = () => {
    NavigationActions.toggleTabs(true);
    NavigationActions.pop();
  }
  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        NavigationActions.setNavigator(this.props.navigator);
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
  _itemSeparator = () => <View style={styles.separateLine}></View>
  _renderListData = ({ item, index }) => {
    let style = {};
    if (index == this.data.length - 1) {
      style = [styles.item, { borderBottomColor: colors.holderColor, borderBottomWidth: 1 }];
    } else { style = [styles.item] }
    return <TouchableOpacity style={style} onPress={item.onPress}>
      <Text allowFontScaling={false} style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  }
  render() {
    return (
      <Container>
        <Header leftAction={this.back} imageLeft={ICONBACK} noShadow={true} stylesHeader={styles.header}
          mainText={'Settings'} />
        <FlatList
          ItemSeparatorComponent={this._itemSeparator}
          style={{ flex: 1, backgroundColor: 'white' }}
          keyExtractor={this.keyExtractor}
          data={this.data}
          renderItem={this._renderListData} />
      </Container>
    );
  }
}

export default Settings;