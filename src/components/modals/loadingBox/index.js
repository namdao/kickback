import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import styles from './styles';
import { NavigationActions } from '@actions/navigate';

const LoadingBox = (props) => {
  return (
    <View style = {styles.container}>
      <View style = {styles.subModal}>
        <ActivityIndicator
            animating={true} />
      </View>
    </View>
  );
}
export default LoadingBox;