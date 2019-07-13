import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import styles from './styles';
import tinycolor from 'tinycolor2';
import Gestures from 'react-native-easy-gestures';

const contentSwiperView = (props) => {
  const {
    uri,
    isCrop,
    onEnd,
    onEndDragText,
    onStart,
    onPressText
  } = props;
  return uri.map((value, index) => (
    <View
      style = {styles.image}
      key={`${index}`}>
      <View style = {styles.imageBackground}>
        <View pointerEvents={isCrop ? 'auto' : 'none'}>
          <Gestures
            styles = {value.styles ? value.styles : {}}
            onEnd={onEnd}
            scalable={isCrop ? {min: 0.1, max: 7} : false}
            rotatable={isCrop}
            draggable={isCrop}
          >
            <Image
              resizeMode='cover'
              style = {styles.imageBackground}
              source= {{uri: value.originalUri}}
            />
          </Gestures>
        </View>
        {value.uriDrawArray.length > 0 && value.uriDrawArray.map((value, index) => {
          return <Image
            key = {`${index}`}
            pointerEvents='none'
            resizeMode='cover'
            style = {styles.image}
            source= {{uri: value}}
          />
        })}
        {
          value.text.map((text, index) => {
            return (
              <Gestures
                onStart={onStart}
                onEnd={onEndDragText(index)}
                styles = {{...text.styles, position: 'absolute'}}
                key = {`${index}`}
                scalable={{min: 0.1, max: 7}}
                rotatable={true}
              >
                <Text
                  onPress={onPressText(text, index)}
                  style = {[styles.editText, {color: tinycolor(text.color).toHslString()}]}
                >
                  {text.value}
                </Text>
              </Gestures>
            )
          })
        }
      </View>
    </View>
  ));
};

export default contentSwiperView;