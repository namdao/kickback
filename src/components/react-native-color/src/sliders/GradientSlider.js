import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
// import Slider from 'react-native-slider';
import Gradient from '../gradients/Gradient';
import { Slider } from '@components/slider'
import {getWidthAndHeight} from '@utils/dimensions';
const sizeScreen = getWidthAndHeight();
const GradientSlider = ({
  style,
  value,
  step,
  maximumValue,
  gradient,
  onValueChange,
  thumbTintColor
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.gradient, {transform: [{ rotate: '90deg'}]},
      {borderWidth: 2, height: sizeScreen.width * 0.03, borderColor: 'white', overflow: 'hidden'}]}>{gradient}</View>
      <Slider
        value={value}
        style={{borderRadius: 10}}
        step={step}
        animateTransitions
        orientation="vertical"
        animationType="spring"
        thumbTouchSize={{ width: 48, height: 48 }}
        maximumValue={maximumValue}
        onValueChange={onValueChange}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbStyle={[styles.thumb, { backgroundColor: thumbTintColor }]}
      />
    </View>
  );
};

export default GradientSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 10,
  },
});

GradientSlider.propTypes = {
  value: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  maximumValue: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  thumbTintColor: PropTypes.string.isRequired
};
