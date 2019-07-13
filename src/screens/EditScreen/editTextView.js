import React from 'react';
import {
  View,
  TextInput
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import tinycolor from 'tinycolor2';
import ColorPicker from '../../components/colorPicker';
import styles from './styles';


export default class EditTextView extends React.PureComponent {
  render() {
    const {
      updateScrollViewRef,
      text,
      color,
      onChangeColor,
      onChangeText,
      onDone
    } = this.props;

    return(
      <KeyboardAwareScrollView
        bounces={true}
        scrollEnabled={false}
        onKeyboardWillHide={(frames: Object) => {
          onDone();
        }}
        style = {styles.containerEditText}
        ref={updateScrollViewRef}
        contentContainerStyle={styles.containerEditText}
        keyboardShouldPersistTaps="handled"
      >
        <View style = {{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' ,alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            onChangeText = {onChangeText}
            autoCorrect={false}
            allowFontScaling={false}
            autoCapitalize={'none'} autoFocus={true}
            multiline={true}
            value={text}
            style = {[styles.textInput, {color: tinycolor(color).toHslString()}, styles.sizeEditText]}
          />
        </View>
        <View style = {[styles.colorPicker]}>
          <ColorPicker color={color} onChangeColor = {onChangeColor}/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}