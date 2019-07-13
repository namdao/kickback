import React from 'react';
import {View, Image, Text,TouchableOpacity} from 'react-native';
import Container from '@components/container';
import FormLogin from '@components/formLogin';
import LOGOKICKBACK from '../../thumbnails/logo_kickback.png';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from '@actions/navigate';
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    switch(event.id) {
      case 'willAppear':
      NavigationActions.setNavigator(this.props.navigator);
       break;
      case 'didAppear':
        break;
      case 'willDisappear':
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }
  render() {
    const {login, signup} = this.props;
     
    return (
      <Container>
        <KeyboardAwareScrollView
        bounces={false}
        scrollEnabled={false}
        extraScrollHeight={100}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style = {[styles.halfViewTop]}>
          <Image resizeMode='contain' style={styles.imageLogo} source={LOGOKICKBACK}/>
        </View>
        <View style = {styles.halfViewEnd}>
          <FormLogin signup={signup} login={login}/>
        </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
};

export default LoginScreen;