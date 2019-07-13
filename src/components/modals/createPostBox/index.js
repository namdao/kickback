import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import ButtonBorder from '@components/buttonBorder';
import { NavigationActions } from '@actions/navigate';
import CAMERAICON  from '../../../thumbnails/tab_1.png';
import PLUS  from '../../../thumbnails/plus_createPost.png';
import PAGES  from '../../../thumbnails/pages_profile.png';

import {TYPE_CAMERA, TYPE_PHOTO} from '@constants/permissions';
import {checkPermissionRequest} from '@sagas/permissionsSaga';

const CreatePostBox = (props) => {
   
  onPressMedia = () => {
    const {checkPermission} = props;
     
    NavigationActions.dismissLightBox();
    const dataListSelectBox = [
      {
        title:'Use Camera',
        onPress: () => {
          // checkPermission({type: TYPE_CAMERA});
          // NavigationActions.navigateToCreateStory();
          NavigationActions.showCommingSoonBox('COMING SOON');
        }
      },
      {
        title: 'Photo Library',
        onPress: () => {
          // checkPermission({type: TYPE_PHOTO});
          // NavigationActions.navigateToCreateStory();
          NavigationActions.showCommingSoonBox('COMING SOON');
        }
      }
    ];
    NavigationActions.showListSelectBox({dataListSelectBox});
  }
  onPress = () => NavigationActions.dismissLightBox();
  return(
    <View style = {styles.container}>
      <View style = {styles.subModal}>
        <Image style = {styles.imagePlus} resizeMode='contain' source={PLUS}/>
        <Text allowFontScaling={false} style = {styles.title}>Create a Post</Text>
        <Text allowFontScaling={false} style = {styles.subTitle}>Choose a type:</Text>
        <View style = {styles.halfViewTop}>
          <TouchableOpacity onPress={this.onPressMedia} style = {styles.boxButton}>
            <Image style = {styles.imageButton} resizeMode='contain' source={CAMERAICON}/>
            <Text allowFontScaling={false} style = {styles.buttonText}>Media</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.boxButton}>
            <Image style = {styles.imageButton} resizeMode='contain' source={PAGES}/>
            <Text allowFontScaling={false} style = {styles.buttonText}>Pages</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.halfViewBottom}>
          <ButtonBorder styles={styles.styleButtonCancel} onPress = {onPress} title = 'Cancel'/>
        </View>
      </View>
    </View>
  );
}
export default CreatePostBox;