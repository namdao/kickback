import React from 'react';
import {View, TextInput, Keyboard,Text} from 'react-native';
import ButtonBorder from '../buttonBorder'
import styles from './styles'
import colors from '@constants/colors';
import { NavigationActions } from '@actions/navigate';
import { TextField } from '@components/react-native-material-textfield';

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
    this.emailRef = this.updateRef.bind(this, 'email');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onFocus = () => {
    let { errors = {} } = this.state;
    for (let name in errors) {
      let ref = this[name];
      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({ errors });
  }
  submitRecoveryPassword = () => {
    const {email} = this.state;
    this.props.recoveryPassword({email});
  }
  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
      return false;
    }else {
      return true;
    }
  }
  onChangeText = (text) => {
    ['email']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.state.focused) {
          this.setState({ [name]: text });
        }
    });
  }
  onSend = () => {
    Keyboard.dismiss();
    let errors = {};
    ['email']
      .forEach((data) => {       
        let value = this[data].value();
        if (!value.trim() && data == 'email') {
          errors[data] = 'Please input this field';
        }
      });
    this.setState({ errors });
    if (!(Object.keys(errors).length === 0 && errors.constructor === Object)) {
      return;
    }
    const {email} = this.state;
    if (!this.validate(email)) {
      NavigationActions.showWarningBox('The email format is invalid');
      return;
    }
    this.submitRecoveryPassword();
    this.setState({email : ''});
  }
  onBack = () => {
        NavigationActions.pop();
  }
  render() {
    const {email, password, errors = {}} = this.state;
    return (
      <View style = {styles.container}>
        <View style = {styles.textInput}>
          <TextField
            tintColor={colors.black}
            baseColor={colors.black}
            errorColor='#ff5252'
            ref={this.emailRef}
            autoCorrect={false}
            onFocus={this.onFocus}
            enablesReturnKeyAutomatically={true}
            textColor = {colors.black}
            returnKeyType='done'
            label='Email (.EDU)'
            value={email}
            onChangeText={this.onChangeText}
            error={errors.email}
        /></View>
        <View style = {styles.frameContent}>
          <View style = {styles.frameButton}>
            <ButtonBorder onPress={this.onSend} title = 'Send Password' styles={styles.styleButtonSendPassword} colorText={colors.white}/>
            <ButtonBorder onPress={this.onBack} title = 'Back to Login' styles={styles.styleButtonBackLogin}/>
          </View>
        </View>
      </View>
    );
  }
}


export default RecoverPassword;