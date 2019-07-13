import React from 'react';
import { ScrollView, View, WebView } from 'react-native';
import { NavigationActions } from '@actions/navigate';
import Container from '@components/container';

import ICONBACK from '../../thumbnails/back_black.png';

import Header from '@components/header';
import styles from './styles'
class TermsAndPrivacy extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  back = () => {
    NavigationActions.pop();
  }
  onNavigatorEvent(event) {
    switch (event.id) {
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
    return (
      <Container>
        <Header leftAction={this.back} imageLeft={ICONBACK} noShadow={true} stylesHeader={styles.header}
          mainText={this.props.title} />
        <WebView
            content
            style = {styles.container}
            scalesPageToFit={true}
            source={{html: this.props.htmlSource}} />
      </Container>
    );
  }
}

export default TermsAndPrivacy;