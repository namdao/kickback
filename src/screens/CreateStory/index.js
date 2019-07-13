import React from 'react';
import {View, Image, SafeAreaView} from 'react-native';

import Container from '@components/container';
import BACK_BLACK from '../../thumbnails/back_black.png';
import Header from '@components/header';

import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from '@actions/navigate';
import {k_USER_INFO} from '@constants/storage-constants';

class CreateStory extends React.Component {
  constructor(props) {
    super(props);
  }
  back = () => NavigationActions.pop();
  render() {
    const { userData, loadingReducer} = this.props;
    return (
      <Container>
        <Header mainText='Create Story' leftAction={this.back} imageLeft={BACK_BLACK} noShadow={true} stylesHeader={styles.header}>
        </Header>
      </Container>
    );
  }
};

export default CreateStory;
