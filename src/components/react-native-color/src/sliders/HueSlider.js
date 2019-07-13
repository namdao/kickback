import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import GradientSlider from './GradientSlider';
import HueGradient from '../gradients/HueGradient';
import tinycolor from 'tinycolor2';
import {getWidthAndHeight} from '@utils/dimensions';
const {width, height} = getWidthAndHeight();
const HueSlider = ({ style, value, onValueChange, gradientSteps }) => {
  return (
    <GradientSlider
      gradient={<HueGradient gradientSteps={gradientSteps} />}
      style={{width: height/2.5}}
      step={1}
      maximumValue={359}
      value={value}
      thumbTintColor={tinycolor({ s: 1, l: 0.5, h: value }).toHslString()}
      onValueChange={onValueChange}
    />
  );
};

export default HueSlider;

HueSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  gradientSteps: PropTypes.number.isRequired
};
