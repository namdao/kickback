import React from 'react';
import {View, TextInput, Text} from 'react-native';
import ButtonBorder from '../../buttonBorder'
import styles from './styles'
import {ChooseAvatarButton} from '@components/avatar';
import colors from '@constants/colors';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  mediaType: 'photo',
  allowsEditing: true,
  quality: 0.5,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class CreateProfileFormOrganizations extends React.Component {
  constructor(props) {
    super(props);
     
    const {detail = null, isEdit = false} = props;
    if (isEdit) {
      this.state = {
        name: detail.last_name != '' ? `${detail.first_name} ${detail.last_name}`: `${detail.first_name}`,
        avatar: {uri: detail.avatar},
        username: detail.username,
      }
    } else {
      this.state = {
        name: '',
        avatar: null,
        username: '',
      }
    }
  };
  onChangeTextName = (text) => this.setState({name: text});
  onChangeTextUsername = (text) => this.setState({username: text});
  chooseAvatar = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const fileName = response.uri.substr(response.uri.lastIndexOf('/') + 1);
        let source = {
          uri: response.uri,
          name: fileName,
          type: `image/${fileName.substr(fileName.lastIndexOf('.') + 1)}`
        };
         
        this.setState({avatar: source});
      }
    });
  }
  onSend = () => {
    const {name, username, avatar} = this.state;
    const {isLoading} = this.props;
    if (isLoading) {
      alert('Cannot update profile while image is uploading!');
      return;
    }
    if (name == '' || username == '') {
      alert('Please Press Full Information Before Update Profile');
      return;
    }
    const params = {
      name,
      username,
      avatar
    }
    this.props.onSubmit(params)
  }
  render() {
    const {name, username, avatar} = this.state;
    const {isEdit = false} = this.props;
    return (
      <View style = {[styles.subContainer]}>
          <Text style = {styles.title}>IS COMING SOON</Text>
        {/* <Text style = {styles.title}>{isEdit ? 'Edit Profile' : 'Create Profile'}</Text>
        <ChooseAvatarButton onPress={this.chooseAvatar} source={avatar} styles={styles.avatar}/>
        <View style = {styles.content}>
          <View style = {styles.textInputForm}>
            <Text style = {styles.titleInput}>Name</Text>
            <TextInput
            autoCorrect={false}
            value={name}
            onChangeText={this.onChangeTextName}
            placeholderTextColor={colors.holderColor}
            placeholder={'Name of Organization / Club'} style = {styles.textInput}/>
            <Text style = {styles.titleInput}>First Last</Text>
            <TextInput
            autoCorrect={false}
            value={username}
            onChangeText={this.onChangeTextUsername}
            placeholderTextColor={colors.holderColor}
            placeholder={'Enter Username'} style = {styles.textInput}/>
            {isEdit ? <View>
              <Text style = {styles.titleInput}>First Last</Text>
              <TextInput
              autoCorrect={false}
              value={username}
              onChangeText={this.onChangeTextUsername}
              placeholderTextColor={colors.holderColor}
              placeholder={'Enter Username'} style = {styles.textInput}/>
              <Text style = {styles.titleInput}>First Last</Text>
              <TextInput
              autoCorrect={false}
              value={username}
              onChangeText={this.onChangeTextUsername}
              placeholderTextColor={colors.holderColor}
              placeholder={'Enter Username'} style = {styles.textInput}/>
              <Text style = {styles.titleInput}>First Last</Text>
              <TextInput
              autoCorrect={false}
              value={username}
              onChangeText={this.onChangeTextUsername}
              placeholderTextColor={colors.holderColor}
              placeholder={'Enter Username'} style = {styles.textInput}/>
            </View>: null}
          </View>
          <ButtonBorder onPress={this.onSend} colorText={colors.white} title='Save Profile & Continue' styles={styles.buttonSubmit}/>
        </View> */}
      </View>
    );
  }
}


export default CreateProfileFormOrganizations;