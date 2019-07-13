import React from 'react';
import {View, TextInput, Text, TouchableOpacity, Image, ActivityIndicator, Keyboard} from 'react-native';
import ButtonBorder from '../../buttonBorder'
import styles from './styles'
import {ChooseAvatarButton} from '@components/avatar';
import colors from '@constants/colors';
import SELECT_ICON from '../../../thumbnails/select_icon.png';
import Picker from 'react-native-picker';
import ImageCropPicker, {default as ImagePickerCrop} from 'react-native-image-crop-picker';
import { apiUploadImage } from '../../../services/auth-api';
import { TextField } from '@components/react-native-material-textfield';
import {TYPE_CAMERA, TYPE_PHOTO} from '@constants/permissions';
import {checkPermissionRequest} from '@sagas/permissionsSaga';
import ActionSheet from 'react-native-actionsheet'
import capitalize from '@utils/capitalize';
import {checkTextIsNumber, checkIncludeSpecialChar, includeEmojis} from '@utils/validate';
import { NavigationActions } from '@actions/navigate';
import CAMERAICON from '../../../thumbnails/camera_dark.png';
import CAMERAICONWHITE from '../../../thumbnails/camera_profile.png';
import CoverPage from '../../coverPage';
import LinearGradient from 'react-native-linear-gradient';
import {getWidthAndHeight} from '@utils/dimensions'
const {width, height} = getWidthAndHeight();
const options = {
  title: 'Select Avatar',
  mediaType: 'photo',
  allowsEditing: true,
  quality: 0.5,
  width: width,
  height: width/2,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  }
};
const s3 = {
  bucket: "testimagethong",
  accessKeyId: 'AKIAJBIPFGEIEOR6CTVA',
  secretAccessKey: '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',
  region: "us-east-1",
  successActionStatus: 201
};
class CreateProfileFormStudent extends React.Component {
  constructor(props) {
    super(props);
    this.data = ['male', 'female'];
    this.previousGender = '';
    this.userNameRef = this.updateRef.bind(this, 'username');
    this.nameRef = this.updateRef.bind(this, 'name');
    this.schoolRef = this.updateRef.bind(this, 'school');
    this.classYearRef = this.updateRef.bind(this, 'classYear');
    this.short_bioRef = this.updateRef.bind(this, 'short_bio');
    this.majorRef = this.updateRef.bind(this, 'major');
    this.organizationsRef = this.updateRef.bind(this, 'organizations');
    this.hobbiesRef = this.updateRef.bind(this, 'hobbies');
    this.whatelseRef = this.updateRef.bind(this, 'whatelse');
    this.genderRef = this.updateRef.bind(this, 'gender');
    this.isSelectCover = false;
    const {detail = null, isEdit = false} = props;
    if (isEdit) {
      this.state = {
        isDisplay: false,
        isShowPicker: false,
        gender: detail.gender,
        username: detail.username,
        name: detail.last_name != '' ? `${detail.first_name} ${detail.last_name}` : `${detail.first_name}`,
        school: detail.custom_school ? detail.custom_school : detail.school,
        classYear: detail.class_year,
        avatar: detail.avatar ? {uri: detail.avatar} : null,
        cover_image: detail.cover_image ? {uri: detail.cover_image} : null,
        short_bio: detail.short_bio ? detail.short_bio : '',
        major: detail.major ? detail.major : '',
        organizations: '',
        hobbies: detail.hobbies ? detail.hobbies : '',
        whatelse: detail.whatelse ? detail.whatelse : ''
      }
    } else {
      this.state = {
        isShowPicker: false,
        gender: '',
        username: '',
        name: '',
        isDisplay: true,
        school: (props.userReducer.custom_school ? props.userReducer.custom_school : ''),
        classYear: '',
        avatar: null,
        cover_image: null
      }
    }
  };
  componentWillMount() {
    setTimeout(() => {
      this.setState({isDisplay: true});
    },30)
  }
  onChangeText = (text) => {
    const {isEdit = false} = this.props;
    (isEdit ? ['username', 'name','school','classYear','short_bio','major','organizations','hobbies'] : ['username', 'name','school','classYear'])
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.state.focused) {
          this.setState({ [name]: text });
        }
    });
  }
  onSubmitName = () => {this.username.focus()};
  onSubmitUsername = () => {this.school.focus()};
  onSubmitSchool = () => {this.classYear.focus()};
  onSubmitClassYear = () => {
    if (this.props.isEdit) {
      this.short_bio.focus()
    } else {
      this.classYear.blur();
    }
  };
  onSubmitShortBio = () => {this.major.focus()};
  onSubmitMajor = () => {this.organizations.focus()};
  onSubmitOrganizations = () => {this.hobbies.focus()};
  onSubmitHobbies = () => {this.hobbies.blur()};
  onSubmitWhatelse = () => {this.whatelse.blur()};

  setPictureAvatar = (response) => {
    let fileName = response.fileName;
    if (!fileName)
    fileName = response.uri.substr(response.uri.lastIndexOf('/') + 1);
    let source = {
      uri: response.uri,
      name: fileName,
      type: response.mime ? response.mime : `image/${fileName.substr(fileName.lastIndexOf('.') + 1)}`
    };
    this.props.changeStateLoading({isLoading: true});
    apiUploadImage([{file: response.uri, type: source.type, name: fileName}],
      {Authorization: `Bearer ${this.props.userReducer.access_token}`}).then((response) => {
      this.props.changeStateLoading({isLoading: false});
      if (this.isSelectCover) {
        this.setState({cover_image:{uri: response.data[0].media_url}});
      } else {
        this.setState({avatar:{uri: response.data[0].media_url}});
      }
    }).catch((error) => {
      NavigationActions.showWarningBox('Upload failed')
      this.props.changeStateLoading({isLoading: false});
    })
  }
  
  selectFromCamera = async () => {
    const response = await checkPermissionRequest({type: TYPE_CAMERA});
     
    if (response) {
      ImagePickerCrop.openCamera({
        width: 300,
        height: 300,
        quality: 0.8,
        cropping: true
      }).then(response => {
        this.setPictureAvatar({uri: response.path, fileName: response.filename, mime: response.mime});
      });
      // ImagePicker.launchCamera({...options, allowsEditing: true}, (response) => {
      //   if (response.didCancel) {} else if (response.error) {
      //     alert(response.error)
      //   } else if (response.customButton) {} else {
      //     ImagePickerCrop.openCropper({
      //       path: response.uri,
      //       width: 300,
      //       height: 300
      //     }).then(response => {
      //       NavigationActions.toggleTabs(false);
      //       this.setPictureAvatar({uri: response.path, fileName: response.filename, mime: response.mime});
      //     });
      //     // this.setPictureAvatar(response);
      //   }
      // });
    }
  }
  selectFromLibrary = async () => {
    const response = await checkPermissionRequest({type: TYPE_PHOTO});
    if (response) {
      const width = this.isSelectCover ? 600 : 300;
      ImageCropPicker.openPicker({
        multiple: false,
        width: width,
        cropping: true,
        height: 300,
        quality: 0.8,
        mediaType: "photo",
        forceJpg: true,
      }).then((response) => {
          this.setPictureAvatar({...response, uri: response.path});
      });
    }
  }
  onChooseActionSheet = (index) => {
    switch(index) {
      case 0: return this.selectFromCamera();
      case 1: return this.selectFromLibrary();
    }
  }
  chooseAvatar = (isSelectCover) => {
    const {loadingReducer} = this.props;
    if(loadingReducer.isLoading){
      alert('Can not update profile-entities while image is uploading!');
      return;
    }
    this.isSelectCover = isSelectCover
    this.hidePicker();
    this.ActionSheet.show();
    
  }
  // Hide Picker Gender
  hidePicker = () => {
    if (this.state.isShowPicker) {
      Picker.hide();
      this.setState({isShowPicker: false, gender: this.previousGender});
    }
  }
  updateRef(name, ref) {
    this[name] = ref;
  }
  onFocus = () => {
    this.hidePicker();
    let { errors = {} } = this.state;
    for (let name in errors) {
      let ref = this[name];
      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({ errors });
  }
  onFocusPicker = () => {
    this.gender.blur();
    let { errors = {} } = this.state;
    for (let name in errors) {
      let ref = this[name];
      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({ errors });
  }
  showPickerGender = () => {
    let { errors = {} } = this.state;
    for (let name in errors) {
      let ref = this[name];
      if (name == 'gender') {
        delete errors[name];
      }
    }
    this.setState({ errors });
    this.previousGender = this.state.gender;
    this.setState({isShowPicker: true, gender: this.state.gender});
    Picker.init({
      pickerToolBarBg: [232, 232, 232, 1],
      pickerBg: [255,255,255, 1],
      pickerTitleText: 'Gender',
      selectedValue: [`${this.state.gender}`],  
      pickerConfirmBtnText: 'OK',
      pickerCancelBtnText: 'Cancel',
      pickerData: this.data,
      onPickerConfirm: data => this.setState({isShowPicker: false}),
      onPickerCancel: data => this.setState({gender: this.previousGender, isShowPicker: false}),
      onPickerSelect: data => {
         
        this.setState({
          gender: data[0],
        })
      }
    });
    debugger
    Picker.show();
  }
  componentWillUnmount = () => {
    this.hidePicker();
  }
  onSend = () => {
    let errors = {};
    Keyboard.dismiss();
    const {isEdit = false} = this.props;
    (isEdit ? ['username', 'name','school','classYear','short_bio','major','organizations','hobbies','gender'] : ['username', 'name','school','classYear','gender'])
      .forEach((data) => {
        let value = this[data].value().trim();
        if (!value && (data == 'username' || data == 'name' || data =='school' || data=='classYear' || data=='gender')) {
          errors[data] = 'Please input this field';
        } else {
          // if ('short_bio' === data && value.length >255) {
          //   errors[data] = 'Short bio more than 255 characters';
          // }
          // if ('major' === data && value.length < 4) {
          //   errors[data] = 'Too short';
          // }
          // if ('organizations' === data && value.length < 4) {
          //   errors[data] = 'Too short';
          // }
          // if ('hobbies' === data && value.length < 4) {
          //   errors[data] = 'Too short';
          // }
          // if ('whatelse' === data && value.length < 4) {
          //   errors[data] = 'Too short';
          // }
        }
      });
    this.setState({ errors });
    if (!(Object.keys(errors).length === 0 && errors.constructor === Object)) {
      return;
    }

    const {cover_image, name, username, avatar, gender, classYear, school, short_bio, major, hobbies, whatelse} = this.state;
    const {loadingReducer} = this.props;
    if (loadingReducer.isLoading) {
      alert('Can not update profile-entities while image is uploading!');
      return;
    }
    
    if (name.length > 30) {
      NavigationActions.showWarningBox('Name field has no more than 30 characters');
     return;
    }
    if (includeEmojis(username)) {
      NavigationActions.showWarningBox('Username can not contain spaces or special characters');
     return;
    }
    if (checkIncludeSpecialChar(username)) {
      NavigationActions.showWarningBox('Username can not contain spaces or special characters');
     return;
    }
    if (checkTextIsNumber(username)) {
      NavigationActions.showWarningBox('Username must contain letters');
      return;
    }
    if (username.trim().length < 3) {
      NavigationActions.showWarningBox('Username must be at least 3 characters');
      return;
    }
    if (classYear.length < 4) {
      NavigationActions.showWarningBox('Class year must be at least 4 characters');
      return;
    }
    if (checkTextIsNumber(name)) {
      NavigationActions.showWarningBox('Name must contain letters');
      return;
    }
    if (name.trim().length < 3) {
      NavigationActions.showWarningBox('Name must be at least 3 characters');
      return;
    }
    if (!/^\d+$/.test(classYear)) {
      NavigationActions.showWarningBox('Class year must be a number');
      return;
    }
    let params = {};
    if (isEdit) {
      params = {
        name: name.trim(),
        username: username.trim(),
        avatar,
        cover_image,
        gender,
        classYear,
        school: school.trim(),
        short_bio,
        major,
        hobbies,
        whatelse,
        isHideToggleTab: this.props.isHideToggleTab
      }
    } else {
      params = {
        name: name.trim(),
        username: username.trim(),
        avatar,
        gender,
        cover_image,
        classYear,
        school: school.trim(),
        isHideToggleTab: this.props.isHideToggleTab
      }
    }
    this.props.onSubmit(params)
  }

  render() {
    const {gender, isShowPicker, name, username, school, classYear, avatar,  errors = {}} = this.state;
    const {short_bio, major, organizations, hobbies, whatelse, isDisplay, cover_image} = this.state;
    const {isEdit = false, loadingReducer, userReducer} = this.props;
    return (
      <View style = {[styles.subContainer]}>
        <CoverPage source={cover_image} onPress={this.chooseAvatar.bind(this, true)}/>  
        
        {cover_image ? <LinearGradient style={styles.linearGradient} colors={['rgba(0,0,0,0.35)','transparent']}>
          <TouchableOpacity style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}} onPress={this.chooseAvatar}>
            <Image resizeMode='contain' style = {styles.styleImageCamera} source={CAMERAICONWHITE}/>
            <Text style = {styles.textHeader}>Edit Header Photo</Text>
          </TouchableOpacity>
        </LinearGradient> : null}

        {/* <Text allowFontScaling={false} style = {styles.title}>{isEdit ? 'Edit Profile' : 'Create Profile'}</Text> */}
        <ChooseAvatarButton source={avatar} onPress={this.chooseAvatar.bind(this, false)} styles={styles.avatar}/>
        {avatar ? <View style = {styles.viewChangePhoto}>
          <TouchableOpacity style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}} onPress={this.chooseAvatar.bind(this,false)}>
            <Image resizeMode='contain' style = {styles.styleImageCamera} source={CAMERAICON}/>
            <Text allowFontScaling={false} style={styles.textChangePhoto}>Edit User Photo</Text>
          </TouchableOpacity>
        </View> : null}
        {loadingReducer.isLoading ? <ActivityIndicator size="large" color="grey" /> : null}
        {isDisplay ?
        <View style = {styles.textInputForm}>
          <Text allowFontScaling={false} style = {styles.titleInput}>Name</Text>
          <View style = {styles.textInput}>
          <TextField
            tintColor={colors.black}
            baseColor={colors.black}
            errorColor='#ff5252'
            ref={this.nameRef}
            autoCorrect={false}
            onFocus={this.onFocus}
            enablesReturnKeyAutomatically={true}
            textColor = {colors.black}
            returnKeyType='next'
            label='First Last'
            value={name}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitName}
            error={errors.name}
          /></View>
          <Text allowFontScaling={false} style = {styles.titleInput}>Username</Text>
          <View style = {styles.textInput}>
          <TextField
            tintColor={colors.black}
            baseColor={colors.black}
            errorColor='#ff5252'
            ref={this.userNameRef}
            autoCorrect={false}
            onFocus={this.onFocus}
            enablesReturnKeyAutomatically={true}
            textColor = {colors.black}
            returnKeyType='next'
            label='Enter Username'
            value={username}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitUsername}
            error={errors.username}
          /></View>

          <Text allowFontScaling={false} style = {[styles.titleInput]}>Gender</Text>
          <TouchableOpacity onPress = {this.showPickerGender} style = {[styles.genderStyle]}>
            <View pointerEvents='none' style = {[styles.textInput]}>
            <TextField
              tintColor={colors.black}
              baseColor={colors.black}
              errorColor='#ff5252'
              ref={this.genderRef}
              autoCorrect={false}
              onFocus={null}
              enablesReturnKeyAutomatically={true}
              textColor = {colors.black}
              returnKeyType='default'
              numberOfLines={1}
              label='Select Gender'
              value={gender}
              onChangeText={null}
              multiline={true}
              renderAccessory={() => <Image style = {{ right: 0, bottom: -3}} resizeMode='contain' source={SELECT_ICON}/>}
              error={errors.gender}
            /></View>
          </TouchableOpacity>

          <Text allowFontScaling={false} style = {styles.titleInput}>School</Text>
          <View style = {styles.textInput}>
          <TextField
            tintColor={colors.black}
            baseColor={colors.black}
            errorColor='#ff5252'
            ref={this.schoolRef}
            autoCorrect={false}
            onFocus={this.onFocus}
            enablesReturnKeyAutomatically={true}
            textColor = {colors.black}
            returnKeyType='next'
            label='Enter Name of School'
            style={{color: userReducer.school ? 'black' : colors.black}}
            editable = {userReducer.school ? false : true}
            value={school}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitSchool}
            error={errors.school}
          /></View>
          <Text allowFontScaling={false} style = {styles.titleInput}>Class Year</Text>
          <View style = {styles.textInput}>
          <TextField
            tintColor={colors.black}
            baseColor={colors.black}
            errorColor='#ff5252'
            ref={this.classYearRef}
            autoCorrect={false}
            onFocus={this.onFocus}
            enablesReturnKeyAutomatically={true}
            textColor = {colors.black}
            returnKeyType='next'
            maxLength={4}
            label='Enter Class Year'
            keyboardType={'numeric'}
            value={classYear ? classYear : ''}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitClassYear}
            error={errors.classYear}
          /></View>
         {isEdit ?
          <View>
          <Text allowFontScaling={false} style = {styles.titleInput}>Short Bio (limit 255 characters)</Text>
          <View style = {styles.textInput}>
          <TextField
            tintColor={colors.black}
            baseColor={colors.black}
            errorColor='#ff5252'
            ref={this.short_bioRef}
            autoCorrect={false}
            onFocus={this.onFocus}
            enablesReturnKeyAutomatically={true}
            textColor = {colors.black}
            returnKeyType='next'
            numberOfLines={1}
            multiline={true}
            label='Enter Short Bio'
            value={short_bio}
            onChangeText={this.onChangeText}
            error={errors.short_bio}
          /></View>
          <Text allowFontScaling={false} style = {styles.titleInput}>Major(s) / Minor(s)</Text>
          <View style = {styles.textInput}>
          <TextField
            tintColor={colors.black}
            baseColor={colors.black}
            errorColor='#ff5252'
            ref={this.majorRef}
            autoCorrect={false}
            onFocus={this.onFocus}
            enablesReturnKeyAutomatically={true}
            textColor = {colors.black}
            label='List Your Major(s) / Minor(s)'
            value={major}
            onChangeText={this.onChangeText}
            returnKeyType='next'
            numberOfLines={1}
            multiline={true}
            error={errors.major}
          /></View>
          <Text allowFontScaling={false} style = {styles.titleInput}>Organizations / Clubs</Text>
          <View style = {styles.textInput}>
          <TextField
            tintColor={colors.black}
            baseColor={colors.black}
            errorColor='#ff5252'
            ref={this.organizationsRef}
            autoCorrect={false}
            onFocus={this.onFocus}
            enablesReturnKeyAutomatically={true}
            textColor = {colors.black}
            returnKeyType='next'
            numberOfLines={1}
            multiline={true}
            label='List Organizations / Clubs (@user tags work)'
            value={organizations}
            onChangeText={this.onChangeText}
            error={errors.organizations}
          /></View>
          <Text allowFontScaling={false} style = {styles.titleInput}>Hobbies / Interests</Text>
          <View style = {styles.textInput}>
          <TextField
            tintColor={colors.black}
            baseColor={colors.black}
            errorColor='#ff5252'
            ref={this.hobbiesRef}
            autoCorrect={false}
            onFocus={this.onFocus}
            enablesReturnKeyAutomatically={true}
            textColor = {colors.black}
            returnKeyType='next'
            numberOfLines={1}
            multiline={true}
            title='Hobbies / Interests'
            label='List Hobbies / Interests'
            value={hobbies}
            onChangeText={this.onChangeText}
            error={errors.hobbies}
          /></View>
          </View>: null}
            
          <View style = {{top: 20}}>
          <ButtonBorder onPress={this.onSend} colorText={colors.white} title='Save Profile & Continue' styles={styles.buttonSubmit}/>
          </View>
        </View> : null}
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Select Photo'}
          options={['Take Photo...', 'Choose from Library...', 'Cancel']}
          cancelButtonIndex={2}
          onPress={this.onChooseActionSheet}
        />
      </View>
    );
  }
}


export default CreateProfileFormStudent;
