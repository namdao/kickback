import React from 'react';
import {View, Image, TextInput, Keyboard, Text} from 'react-native';

import Container from '@components/container';
import BACK_BLACK from '../../thumbnails/back_black.png';
import Header from '@components/header';

import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from '@actions/navigate';
import ButtonBorder from '@components/buttonBorder';
import colors from '@constants/colors';
class EditCommentScreen extends React.Component {
  constructor(props) {
    super(props); 
    
    this.state={
      content : this.props.item.content,
      isChange: false,
    };
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

  back = () => {
    NavigationActions.pop();
  }
  

  onUpdateComment = () =>{
    const {item:{parent,post,comment_id}} = this.props;
    
    const payload = {
      parent,
      post,
      content: this.state.content,
      comment_id
    }
    const contentSplit = this.state.content.trim();
    if(contentSplit != ''){
      this.props.requestEditComment(payload);
      this.setState({content:''});
      NavigationActions.pop();
    }
  }
  onChangeText = (text) => {
    this.setState({content: text.substring(),isChange:true})
  }
  render() {
    // const {entity:{user}, userReducer,commentReducer,followerReducer} = this.props;
    
    return (
      <Container>
        <Header mainText='Edit Comment' leftAction={this.back} imageLeft={BACK_BLACK} noShadow={true} stylesHeader={styles.header} />
        <TextInput
        allowFontScaling={false}
        onChangeText={this.onChangeText}
        autoCorrect={false} allowFontScaling={false} 
        style = {styles.inputEditComment}
        onFocus={this.onFocus}
        autoFocus={true}
        enablesReturnKeyAutomatically={true}
        numberOfLines={10}
        multiline={true}
        value={this.state.content} >
        </TextInput>
        <KeyboardAwareScrollView
        bounces={true}
        scrollEnabled={false}
        keyboardShouldPersistTaps={'handled'}
        style = {styles.container}
        ref={ref => this.scrollView = ref}
        contentContainerStyle={styles.containerScrollView}
        keyboardShouldPersistTaps="handled">
        </KeyboardAwareScrollView>
        <View style = {styles.line}/>
        <View style = {{top: -20}}>
          <ButtonBorder onPress={this.onUpdateComment} colorText={colors.white} title='Save Comment' styles={styles.buttonSubmit}/>
          </View>
      </Container>
    );
  }
};

export default EditCommentScreen;