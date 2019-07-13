import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import ButtonBorder from '@components/buttonBorder';
import { NavigationActions } from '@actions/navigate';
import HEART from '../../../thumbnails/heart_white.png';
import CLOCK from '../../../thumbnails/clock_white.png';

import { TYPE_CAMERA, TYPE_PHOTO } from '@constants/permissions';
import { checkPermissionRequest } from '@sagas/permissionsSaga';

const ToolTopBar = (props) => {
  const { sort } = props.entitiesReducer;
  const heartSelected = sort == 'like' ? true : false;
  const timeSelected = sort == 'date' ? true : false;
  const autoLikeSelected = false;

  onPress = () => NavigationActions.dismissLightBox();
  dissmissToolBar = () => NavigationActions.dismissToolTopBar();
  onPressHeart = () => {
    // NavigationActions.showCommingSoonBox('COMING SOON');
    if (sort != 'like') props.sortDashBoard({ sort: 'like', scrollToTop: props.scrollToTop });
    NavigationActions.dismissToolTopBar();
  }
  onPressClock = () => {
    // NavigationActions.showCommingSoonBox('COMING SOON');
    if (sort != 'date') props.sortDashBoard({ sort: 'date', scrollToTop: props.scrollToTop });
    NavigationActions.dismissToolTopBar();
  }
  onPressAutoLike = () => NavigationActions.showCommingSoonBox('COMING SOON', "View top posts of users you don't follow yet.");
  return (
    <TouchableOpacity onPress={dissmissToolBar} style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.subRight}>
          <TouchableOpacity onPress={this.onPressHeart} style={styles.sub}>
            <Image source={HEART} />
            <Text allowFontScaling={false} style={[styles.textDot, !heartSelected ? { color: 'transparent' } : {}]}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressClock} style={styles.sub}>
            <Image source={CLOCK} />
            <Text allowFontScaling={false} style={[styles.textDot, !timeSelected ? { color: 'transparent' } : {}]}>.</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.onPressAutoLike} style={[styles.sub, { top: 3 }]}>
          <Text allowFontScaling={false} style={styles.textAutoLike}>BROWSE</Text>
          {/* <Text allowFontScaling={false} style = {[styles.textAutoLike,{top: -3}]}>LIKE</Text> */}
          <Text allowFontScaling={false} style={[styles.textDot, !autoLikeSelected ? { color: 'transparent' } : {}]}>.</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
export default ToolTopBar;