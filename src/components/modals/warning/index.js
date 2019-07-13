import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import ButtonBorder from '@components/buttonBorder';
import { NavigationActions } from '@actions/navigate';
import ERROR  from '../../../thumbnails/error.png';

const WarningBox = (props) => {
  const onPress = () => NavigationActions.dismissLightBox();
  const comming = props.type == 'comming' ? true : false;
  return (
    <View style = {styles.container}>
      <View style = {styles.subModal}>
        {/* <Image source={ERROR} style = {styles.iconError}/> */}
        <View style = {styles.halfViewTop}>
          <Text allowFontScaling={false} style = {styles.subMessage}>{props.subMessage}</Text>
          <Text allowFontScaling={false} style = {styles.subTitle}>{props.msg}</Text>
        </View>
          <ButtonBorder onPress = {onPress} title = 'Ok'/>
        {/* <View style = {styles.halfViewBottom}>
        </View> */}
      </View>
    </View>
  );
}
export default WarningBox;