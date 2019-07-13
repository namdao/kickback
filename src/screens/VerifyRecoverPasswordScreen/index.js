import React from 'react';
import {View, Image} from 'react-native';

import Container from '@components/container';
import Icon from '@components/icon';
import ButtonBorder from '@components/buttonBorder';
import LOGOKICKBACK from '../../thumbnails/logo_kickback.png';
import styles from './styles';
import { NavigationActions } from '@actions/navigate';


class VerifyRecoverPasswordScreen extends React.Component {
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
  backToLogin = () => {
    NavigationActions.resetToLogin();
  }
  render() {
    const mainText = `Your password has been sent to ${this.props.email}`;
    return (
      <Container>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style = {styles.halfViewTop}>
          <Image resizeMode='contain' style={styles.imageLogo} source={LOGOKICKBACK}/>
        </View>
        <View style = {styles.halfViewEnd}>
          <Icon typeIcon={'letter'} mainText={mainText} style={styles.stylesSubText}>
          <ButtonBorder onPress={this.backToLogin} title={'Back to Login'} styles={styles.styleButtonBackLogin} />
          </Icon>
        </View>
        </View>
      </Container>
    );
  }
};

export default VerifyRecoverPasswordScreen;