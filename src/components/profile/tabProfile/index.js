import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import { NavigationActions } from '@actions/navigate';
import CAMERA_PROFILE from '../../../thumbnails/camera_profile.png';
import PAGES_PROFILE from '../../../thumbnails/pages_profile.png';

import styles from './styles'
import { TabView, SceneMap } from 'react-native-tab-view';
import MediaProfile from '../mediaProfile';
import PagesProfile from '../pagesProfile';

class TabProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      currentRoute: 'camera',
      routes: [
        { key: 'camera', title: 'Camera', icon: CAMERA_PROFILE},
        { key: 'pages', title: 'Pages', icon: PAGES_PROFILE },
      ],
    };
  }

  _renderTabar = ({navigationState}) => {
     
    return (
      <View style = {styles.tab}>
        {this._renderIcon(navigationState, 0)}
        {this._renderIcon(navigationState, 1)}
      </View>
    )
  }
      
  _onChangeIndex = index => {
    const currentRoute = this.state.routes[index].key;
    this.setState({ index, currentRoute })
  }

  _renderScene = SceneMap({
    camera: MediaProfile,
    pages: PagesProfile,
  })

  _renderIcon = ({currentRoute}, kind) => {
    const {routes} = this.state;
    const backgroundColor = (routes[kind].key == currentRoute) ? '#000' : '#fff';  
    const colorIcon = (this.state.routes[kind].key == currentRoute) ? '#fff' : '#000';  
    const onPress = () => this._onChangeIndex(kind);
    return (
      <TouchableOpacity
      onPress = {onPress}
      style = {[styles.button, {backgroundColor}]}>
        <Image 
        style={[styles.iconStyle, {tintColor: colorIcon}]}
        resizeMode='contain' source={routes[kind].icon}/>
        <Text style = {[styles.text, {color: colorIcon}]}>{routes[kind].title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <TabView
        renderTabBar={this._renderTabar}
        navigationState={this.state}
        renderScene={this._renderScene}
        onIndexChange={this._onChangeIndex}
      />
    );
  }
}

export default TabProfile;