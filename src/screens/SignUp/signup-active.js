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

class SignUpActiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
     
  }
  componentDidMount() {
    if (this.props.typeAccount) {
      setTimeout(() => {
        const {typeAccount, email, isActive = true, access_token} = this.props;
        if (typeAccount && typeAccount != '') NavigationActions.navigateToCreateProfile({typeAccount, email, isActive, access_token})
      }, 200)
    }
  }
  componentWillUpdate = (nextProps) => {
    if (nextProps.userReducer.email != this.props.userReducer.email) {
      if (this.props.navigator !== NavigationActions.navigator)
      NavigationActions.resetToSignUpActive()
    }
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
  navigateToProfile = (typeAccount) => {
    const {email, isActive = true, access_token} = this.props.userReducer;
    
    if(typeAccount == 'organizations'){
      return NavigationActions.showCommingSoonBox('COMING SOON');
    }
    this.props.signupActiveSuccess({typeAccount, email, isActive, access_token});
  }
  render() {
    const {email} = this.props.userReducer;
    const mainText = `${email} has been activated!`;
    const subText = 'Please choose your account type:';
    const stylesSubText = {width: width};
    return (
      <Container>
        <View style={styles.halfViewTop}>
          <Image resizeMode='contain' style={styles.imageLogo} source={LOGOKICKBACK}/>
        </View>
        <View style={styles.halfViewEnd}>
          <Icon typeIcon={'check'} mainText={mainText} subText={subText} stylesSubText={stylesSubText}>
          <View style={styles.containerButton}>
          <ButtonBorder title={'Student'} styles={styles.button} onPress={() => {
            this.navigateToProfile('student');
          }} />
          <ButtonBorder title={'Alumni'} styles={styles.button} onPress={() => {
            this.navigateToProfile('alumi');
          }} />
          </View>
          <View style={styles.containerButtonRow}>
            <ButtonBorder title={'Organization / Club'} styles={[styles.button,styles.styleOrgButton]} onPress={ () => {this.navigateToProfile('organizations')}} />
          </View>
          </Icon>
        </View>
      </Container>
    );
  }
};

export default SignUpActiveScreen;