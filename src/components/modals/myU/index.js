import React from 'react';
import {View, Text, Image, TouchableOpacity, TouchableWithoutFeedback,ActivityIndicator} from 'react-native';
import styles from './styles';
import ButtonBorder from '@components/buttonBorder';
import { NavigationActions } from '@actions/navigate';
import {TYPE_CAMERA, TYPE_PHOTO} from '@constants/permissions';
import {checkPermissionRequest} from '@sagas/permissionsSaga';
import Video from 'react-native-video';
import TAB_5 from '../../../thumbnails/tab_5.png';
import ICONMYU from '../../../thumbnails/icon-myu.png';
class MyU extends React.Component {
   
  constructor(props) {
    super(props);
    
  }
  
  render() {
    
    return(
      <View style = {styles.container}>
        <Image style = {{marginBottom: 10}} source={this.props.isMyU ? ICONMYU : TAB_5}/>
        <Text allowFontScaling={false} style = {styles.text}>{this.props.isMyU ? 'My U' : 'Open'}</Text>
        <ActivityIndicator
          animating={true}/>
      </View>
    );
  }
}
export default MyU;