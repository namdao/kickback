import React from 'react';
import {
  View,
  ImageBackground
} from 'react-native';
import ColorPicker from '../../components/colorPicker';
import styles from './styles';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

export default class ViewDrawing extends React.PureComponent {
  render() {
    const {
      uri,
      overLayColor,
      onSketchSaved,
      onChangeColor,
      color,
      updateViewRef,
      updateDrawingRef
    } = this.props;
    return(
      <View style = {styles.canvas}>
        <ImageBackground
          resizeMode='cover'
          ref={(ref)=> updateViewRef(ref)}
          style = {{flex: 1}}
          source={{uri: uri}}>
          <SketchCanvas
            ref={(ref)=>updateDrawingRef(ref)}
            style={{ flex: 1, backgroundColor: 'transparent' }}
            strokeColor={overLayColor}
            strokeWidth={7}
            onSketchSaved={onSketchSaved}
            // localSourceImage={{ filename: photoPath, directory: null, mode: 'AspectFill' }}
          />
        </ImageBackground>
        <View style = {styles.colorPicker}>
          <ColorPicker color={color} onChangeColor = {onChangeColor}/>
        </View>
      </View>
    )
  }
}