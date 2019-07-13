import React from 'react';
import {View, Image, SafeAreaView} from 'react-native';

import Container from '@components/container';
import BACK_BLACK from '../../thumbnails/back_black.png';
import HEADERKICKBACK from '../../thumbnails/header_kickback.png';
import Header from '@components/header';

import CreateProfileFormStudent from '@components/createProfileForm/createProfileFormStudent';
import CreateProfileFormOrganizations from '@components/createProfileForm/createProfileFormOrganizations';

import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from '@actions/navigate';
import { mergeKeyAsyncStorage } from '../../utils/async';
import {k_USER_INFO} from '@constants/storage-constants';

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
     
    const {typeAccount, email = null, userData} = props;
    this.userType = 0;
    this.email = email == null ? userData.email : email;
    if (userData && userData.user_type) {
      this.userType = userData.user_type;
    } else {
      if (typeAccount == 'organizations') {this.userType = 3;} else 
      if (typeAccount == 'student') {this.userType = 1;} else {this.userType = 2;}
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  scrollToEnd = () => {
    if (this.scrollView) {
      this.scrollView.scrollToEnd({animated: true});
    }
  } 
  onNavigatorEvent(event) {
    switch(event.id) {
      case 'willAppear':
      NavigationActions.setNavigator(this.props.navigator);
       break;
      case 'didAppear':
        NavigationActions.toggleTabs(false);
        break;
      case 'willDisappear':
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }
  back = () => {
    const {loadingReducer} = this.props;
    if (loadingReducer.isLoading) {
      alert('Cannot back while image is uploading!');
      return;
    }
    const {isEdit = false} = this.props;
    if (!isEdit) {
      mergeKeyAsyncStorage(k_USER_INFO, {typeAccount: ''});
      NavigationActions.pop();
    } else {
      if (this.props.isHideToggleTab) {
        NavigationActions.toggleTabs(false);
      } else {
        NavigationActions.toggleTabs(true);
      }
      NavigationActions.pop();
    }
  }
  onSubmit = (data) => {
    var fullName = data.name.split(' ');
    const firstName = fullName[0];
    const lastName = fullName.length > 1 ? fullName[fullName.length - 1] : '';
    let params = {};
    const {isEdit = false} = this.props;
    if (isEdit) {
      if (this.userType != 3) {
        params = {
          username: data.username,
          email: this.email,
          first_name: firstName,
          last_name: lastName,
          gender: data.gender,
          class_year: data.classYear,
          user_type: this.userType,
          // school: "string",
          custom_school: data.school,
          avatar: data.avatar ? data.avatar.uri : null,
          cover_image: data.cover_image ? data.cover_image.uri : null,
          short_bio: data.short_bio,
          major: data.major,
          isHideToggleTab: data.isHideToggleTab,
          hobbies: data.hobbies,
          whatelse: data.whatelse
        }
      } else {
        params = {
          username: data.username,
          email: this.email,
          first_name: firstName,
          last_name: lastName,
          user_type: this.userType,
          isHideToggleTab: data.isHideToggleTab,
          // school: "string",
          avatar: data.avatar ? data.avatar.uri : null,
          cover_image: data.cover_image ? data.cover_image.uri : null
        }
      }
      this.props.editProfile(params);
    } else {
      if (this.userType != 3) {
        params = {
          username: data.username,
          email: this.email,
          first_name: firstName,
          last_name: lastName,
          gender: data.gender,
          class_year: data.classYear,
          user_type: this.userType,
          // school: "string",
          custom_school: data.school,
          avatar: data.avatar ? data.avatar.uri : null,
          cover_image: data.cover_image ? data.cover_image.uri : null,
        }
      } else {
        params = {
          username: data.username,
          email: this.email,
          first_name: firstName,
          last_name: lastName,
          user_type: this.userType,
          // school: "string",
          avatar: data.avatar ? data.avatar.uri : null,
          cover_image: data.cover_image ? data.cover_image.uri : null,
        }
      }
      this.props.updateProfile(params);
    } 
  }
  render() {
    const {typeAccount, isEdit = false, userData, loadingReducer} = this.props;
    return (
      <Container>
        <Header leftAction={this.back} imageLeft={BACK_BLACK} noShadow={true} stylesHeader={styles.header}>
          <Image resizeMode='contain' style={styles.imageLogo} source={HEADERKICKBACK}/>
        </Header>
        <View style = {{flex: 1}}>
        <KeyboardAwareScrollView
        bounces={true}
        ref={ref => this.scrollView = ref}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        {typeAccount == 'organizations' ? 
        <CreateProfileFormOrganizations
        isHideToggleTab={this.props.isHideToggleTab}
        userReducer={this.props.userReducer}
        loadingReducer={loadingReducer}
        changeStateLoading={this.props.changeStateLoading}
        detail={userData} isEdit={isEdit}
        onSubmit={this.onSubmit}/> : <CreateProfileFormStudent
        userReducer={this.props.userReducer}
        isHideToggleTab={this.props.isHideToggleTab}
        loadingReducer={loadingReducer}
        changeStateLoading={this.props.changeStateLoading}
        detail={userData} isEdit={isEdit}
        onSubmit={this.onSubmit} scrollToEnd={this.scrollToEnd}/> }
        </KeyboardAwareScrollView>
        </View>
      </Container>
    );
  }
};

export default CreateProfile;
