import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default class ProgressBarVideo extends Component {
  
  componentWillMount() {
    this.animation = new Animated.Value(this.props.progress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration
      }).start();
    }
  }
  
  render() {
    const {
      height,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      fillColor,
      row,
      customStyle,
    } = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    })

    return (
      <View style={[{flexDirection: "row", height }, row ? { flex: 1} : undefined ,customStyle]}>
        <View style={[{ flex: 1, borderColor, borderWidth, borderRadius},]}>
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: fillColor }]}
          />
          <Animated.View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: widthInterpolated,
              backgroundColor: barColor
            }}
          />
        </View>
      </View>
    )
  }
}

ProgressBarVideo.defaultProps = {
  height: 7,
  borderColor: "rgba(255,255,255,0.8)",
  borderWidth: 1,
  borderRadius: 10,
  barColor: "rgba(255,255,255,0.6)",
  fillColor: 'rgba(255,255,255,0.3)',
  duration: 500
} 