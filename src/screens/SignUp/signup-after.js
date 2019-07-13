import React from 'react';
import {View, Image} from 'react-native';

import Container from '@components/container';
import Icon from '@components/icon';
import ButtonBorder from '@components/buttonBorder';
import LOGOKICKBACK from '../../thumbnails/logo_kickback.png';
import styles from './styles';
import {getWidthAndHeight} from '@utils/dimensions'
import { NavigationActions } from '@actions/navigate';

const {width} = getWidthAndHeight();

class SignUpAfterScreen extends React.Component {
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
    NavigationActions.pop();
  }
  render() {
    const mainText = `An email has been sent to ${this.props.email}`;
    const subText = 'Please click the verification link to login to Kickback.';
    const styleButton = {borderWidth: 2,top: 30,borderRadius: 10};
    const stylesSubText = {width: width * 0.9};
    return (
      <Container>
        <View style = {styles.halfViewTop}>
          <Image resizeMode='contain' style={styles.imageLogo} source={LOGOKICKBACK}/>
        </View>
        <View style = {styles.halfViewEnd}>
          <Icon typeIcon={'letter'} mainText={mainText} subText={subText} stylesSubText={stylesSubText}>
          <ButtonBorder onPress={this.backToLogin} title={'Back to Login'} styles={styleButton} />
          </Icon>
        </View>
      </Container>
    );
  }
};

export default SignUpAfterScreen;