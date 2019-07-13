import React from 'react';
import {Image, ImageBackground, StatusBar} from 'react-native';
import BACKGROUND from '../../thumbnails/bg-landing.png'; 
import LOGOKICKBACK from '../../thumbnails/logo-kickback-white.png';
import styles from './styles';
import Container from '@components/container';
import {NavigationActions} from '@actions/navigate';

class LandingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    setTimeout(() => {
      StatusBar.setHidden(false);
      props.goToHome();
    }, 3000)
  }
  onNavigatorEvent(event) {
    switch(event.id) {
      case 'willAppear':
        NavigationActions.setNavigator(this.props.navigator);
        StatusBar.setHidden(true);
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
    return (
      <Container>
        <ImageBackground source={BACKGROUND} style = {styles.container}>
          <Image source={LOGOKICKBACK}/>
        </ImageBackground>
      </Container>
    );
  }
}

export default LandingScreen;