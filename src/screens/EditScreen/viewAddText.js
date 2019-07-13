import React from 'react';
import {
  View,
  TextInput,
  ImageBackground,
  Text
} from 'react-native';
import ColorPicker from '../../components/colorPicker';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Gestures from 'react-native-easy-gestures';
import {getWidthAndHeight} from '@utils/dimensions';
const {width, height} = getWidthAndHeight();

export default class ViewAddText extends React.PureComponent {
  render() {
    const {
      updateViewRef,
      uri,
      isEditing,
      updateScrollViewRef,
      text,
      overLayColor,
      color,
      editTextData,
      onKeyboardWillHide,
      onChangeText,
      onEnd,
      onChangeColor,
      tempText,
    } = this.props;
    return(
      <View style={styles.canvas}>
        <ImageBackground
          resizeMode='cover'
          ref={updateViewRef}
          style = {{flex: 1}}
          source={{uri: uri}}
        >
        <View style = {[styles.containEditText]}>
          {!isEditing ?
            <Gestures
              styles = {{marginTop: height / 2}}
              scalable={{min: 0.1, max: 7}}
              rotatable={true}
              onEnd={onEnd}>
              <Text
                onPress = {editTextData}
                allowFontScaling={false}
                style = {[styles.editText, {color: overLayColor}]}
              >
                {text}
              </Text>
            </Gestures> : 
            <KeyboardAwareScrollView
              bounces={true}
              scrollEnabled={false}
              onKeyboardWillHide={onKeyboardWillHide}
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
                  value={tempText}
                  style = {[styles.textInput, {color: overLayColor}, styles.sizeEditText]}
                />
              </View>
            </KeyboardAwareScrollView>
          }
        </View>
        </ImageBackground>
        <View style = {[styles.colorPicker]}>
          <ColorPicker color={color} onChangeColor = {onChangeColor}/>
        </View>
      </View>
    )
  }
}