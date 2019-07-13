import React from 'react';
import {View, TextInput, Keyboard} from 'react-native';
import ButtonBorder from '../buttonBorder'
import styles from './styles'
import colors from '@constants/colors';
import { NavigationActions } from '@actions/navigate';
import { TextField } from '@components/react-native-material-textfield';
import { checkIncludeLetterAndNumber } from '@utils/validate';

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
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

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
      return false;
    }else {
      return true;
    }
  }

  validateEmail = (email) => {
    let re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.edu$");
    return re.test(String(email).toLowerCase());
  }

  submitLogin = () => {
    const {email, password} = this.state;
    this.props.login({email,password});
  }
  submitSignUp = () => {
    const {email, password} = this.state;
    this.props.signup({email,password});
  }
  onChangeText = (text) => {
    ['email', 'password']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.state.focused) {
          this.setState({ [name]: text });
        }
    });
  }

  onSend = (isLogin) => {
    Keyboard.dismiss();
    let errors = {};
    ['email', 'password']
      .forEach((data) => {
         
        let value = this[data].value();
        if (!value.trim() && data == 'email') {
          errors[data] = 'Please input this field';
        }
        if (!value && (data == 'email' || data == 'password')) {
          errors[data] = 'Please input this field';
        }
      });
    this.setState({ errors });
    if (!(Object.keys(errors).length === 0 && errors.constructor === Object)) {
      return;
    }
    const {email, password} = this.state;
    // if (password.length < 8) {
    //   NavigationActions.showWarningBox('Password must have at least 8 characters');
    //   return;
    // }
    if (!this.validate(email) 
    // || !this.validateEmail(email)
    ) {
      NavigationActions.showWarningBox('The email format is invalid');
      return;
    }
    if (isLogin) {
      this.submitLogin();
    } else {
      this.submitSignUp();
    }
  }
  onSubmitEmail = () => {this.password.focus()};
  onSubmitPassword = () => {this.password.blur()};
  commingSoon = () => NavigationActions.showCommingSoonBox('COMING SOON');
  navigateToRecoverPasswordScreen = () => NavigationActions.navigateToRecoverPasswordScreen();
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
            returnKeyType='next'
            label='Email (.EDU)'
            value={email}
            onChangeText={this.onChangeText}
            error={errors.email}
        /></View>
        <View style = {[styles.textInput, {top: -30}]}>
          <TextField
            tintColor={colors.black}
            baseColor={colors.black}
            errorColor='#ff5252'
            ref={this.passwordRef}
            autoCorrect={false}
            onFocus={this.onFocus}
            enablesReturnKeyAutomatically={true}
            textColor = {colors.black}
            secureTextEntry= {true}
            returnKeyType='done'
            label='Password'
            value={password}
            onChangeText={this.onChangeText}
            error={errors.password}
        /></View>
        
        <View style = {styles.frameContent}>
          <View style = {styles.frameButton}>
            <ButtonBorder onPress={() => this.onSend(false)} title = 'Signup' styles={styles.styleButtonSignUp}/>
            <ButtonBorder onPress={() => this.onSend(true)} colorText={colors.white} title = 'Login' styles={styles.styleButtonLogin}/>
          </View>
          <ButtonBorder title = 'Recover Password' styles={styles.textRecover} onPress={this.navigateToRecoverPasswordScreen}/>
        </View>
      </View>
    );
  }
}


export default FormLogin;
