import React from 'react';
import {
  View, TextInput, Keyboard,
  Text, InteractionManager
} from 'react-native';

import styles from './styles'
import { Avatar } from '@components/avatar';
import ButtonBorder from '@components/buttonBorder';
import fontSizes from '@constants/font-sizes';

class InputMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marginBottom: 0,
      messages: '',
      tag: '',
      isDisplay: false,
      parent: null,
      positionY: 0
    }
  }


  enableKeyboard = () => {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
  }

  disableKeyboard = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  componentWillMount() {
    const { entity: { post_id }, requestEntityDetail } = this.props;
    requestEntityDetail({ post_id, isLoading: true });
  }
  _keyboardDidShow = (e) => {
    this.setState({ marginBottom: e.endCoordinates.height })
  }

  _keyboardDidHide = () => {
    this.setState({ marginBottom: 0 })
  }

  onPressReply = (item, parent) => {
    if (parent) {
      this.setState({ parent });
    }
    this.setState({ tag: `@${item.user.username} ` })
    this.refs.addComment.focus();
  }
  
  onAddComent = () => {
    const { requestAddComment, entity: { post_id } } = this.props;
    const payload = {
      parent: this.state.parent,
      post: post_id,
      content: this.state.messages
    }
    if (this.state.messages.trim() != '') {
      this.setState({ messages: '', tag: '', parent: null });
      Keyboard.dismiss();
      InteractionManager.runAfterInteractions(() => {
        requestAddComment(payload);
      })
    }
  }

  onChangeText = (text) => {
    if (this.state.tag.trim().includes(text)) {
      this.debounceCheck = false;
      this.setState({ tag: '', parent: null, messages: '' });
    } else {
      if (!text.includes(this.state.tag)) {
        this.setState({ tag: '', parent: null, messages: text.substring(text.indexOf(this.state.tag) + this.state.tag.length) })
        return;
      }
      this.setState({ messages: text.substring(text.indexOf(this.state.tag) + this.state.tag.length) })
    }
  }

  render() {
    const { userReducer} = this.props;
    const { marginBottom, messages, tag, isDisplay } = this.state;
    return (
      <View style={styles.commentBar}>
        <Avatar styles={{ width: 50, height: 50 }} source={userReducer.thumbnail ? { uri: userReducer.thumbnail } : null} />
        <TextInput
          ref={'addComment'}
          onChangeText={this.onChangeText}
          multiline={true}
          autoCorrect={false} allowFontScaling={false} style={styles.inputComment} placeholder='Type your comment…'>
          <Text allowFontScaling={false} style={{ color: '#232323' }}>{tag}</Text>
          <Text allowFontScaling={false}>{messages}</Text>
        </TextInput>
        <ButtonBorder onPress={this.onAddComent} titleSize={fontSizes.smallRegular} title='Post' styles={styles.buttonComment} />
      </View>
    );
  }
};

export default InputMessage;
