import React from 'react';
import {View, StyleSheet, PixelRatio, Animated, Dimensions} from 'react-native';


type Props = {
  steps: number,
  current: number,
  activeColor?: string,
  inActiveColor?: string,
  borderColor?: string,
  width?: number,
  height?: number
}
export default class CustomProgressBar extends React.Component {
  static defaultProps = {
    inActiveColor: "rgba(255,255,255,0.3)",
    activeColor: 'rgba(255,255,255,0.6)',
    width: 100,
    height: 7,
    borderColor: "rgba(255,255,255,0.8)",
  };

  valueProcessBar = 0;

  constructor(props) {
    super(props);

    this.activeBarValue = new Animated.Value(0)
    this.progressBar;
    if (this.props.isManual && this.props.index == 0) {
      this.activeBarValue.setValue(100);
    } else {
      this.activeBarValue.setValue(0);
      // const {
      //   pauseVideo,
      //   autoPlaySwiper,
      //   activeNextSlide,
      //   duration,
      //   currentPage,
      //   index,
      //   isLoaded= false,
      //   maxIndex
      // } = this.props;
      // const base_duration = duration;
      // if (isLoaded) {
      //   if (index == currentPage) {
      //     this.activeBarValue.setValue(0);
      //     Animated.timing(
      //       this.activeBarValue, {
      //       toValue: 100,
      //       duration: base_duration,
      //       useNativeDriver: true
      //     }).start();
      //     autoPlaySwiper();
      //   } else if (index < currentPage) {
      //     this.activeBarValue.setValue(100);
      //   } else {
      //     Animated.timing(this.activeBarValue, {
      //       toValue: 100,
      //       duration: base_duration,
      //       useNativeDriver: true
      //     }).stop();
      //     this.activeBarValue.setValue(0);
      //   }
      // } else {
      // }
    }
  }

  resetProgress = () => {
    const {
      duration,
      index,
      isFullScreen = false
    } = this.props;
    if (index == 0 && isFullScreen) {
      this.activeBarValue.setValue(0);
      Animated.timing(
        this.activeBarValue, {
        toValue: 100 ,
        duration: duration,
        useNativeDriver: true
      }).start();
      this.props.autoPlaySwiper();
    }
  };
  
  componentDidMount() {
    const {
      duration,
      index,
      isFullScreen = false
    } = this.props;
    if (index === 0 && isFullScreen) {
      this.activeBarValue.setValue(0);
      Animated.timing(
        this.activeBarValue, {
        toValue: 100 ,
        duration,
        useNativeDriver: true
      }).start();
      this.props.autoPlaySwiper();
    }

    /*this.activeBarValue.addListener(({value}) => {
      this.valueProcessBar = value;
    });*/

  }

  componentWillReceiveProps(nextProps) {
    
  }

  componentDidUpdate(prevProps, prevStates) {
    const {
      isPlay,
      autoPlaySwiper,
      activeNextSlide,
      onValueBar,
      isNext,
      isManual= false,
      duration,
      currentPage,
      index,
      maxIndex
    } = this.props;
    const base_duration = duration;

    if (isPlay !== prevProps.isPlay) {
      if (isPlay) {
        if (index == currentPage) {
          if (index == maxIndex) {
            this.activeBarValue.setValue(100);
            return;
          }
          this.activeBarValue.setValue(0);
          Animated.timing(
            this.activeBarValue, {
            toValue: 100,
            duration: base_duration,
            useNativeDriver: true
          }).start();
          autoPlaySwiper();
        } else if (index < currentPage) {
          this.activeBarValue.setValue(100);
        } else {
          Animated.timing(this.activeBarValue, {
            toValue: 100,
            duration: base_duration,
            useNativeDriver: true
          }).stop();
          this.activeBarValue.setValue(0);
        }
      } else {
        if (index == currentPage) {
          this.activeBarValue.setValue(100);
        } else if (index < currentPage) {
          this.activeBarValue.setValue(100);
        } else {
          this.activeBarValue.setValue(0);
        }
      }
    } else {
      if (isManual) {
        if (isNext) {
          this.activeBarValue.setValue(100);
        } else {
          this.activeBarValue.setValue(0);
        }
      } else {
        if (currentPage !== prevProps.currentPage || isPlay) {
          if (currentPage === index) {
            this.activeBarValue.setValue(0);
            Animated.timing(
              this.activeBarValue, {
              toValue: 100 ,
              duration: base_duration,
              useNativeDriver: true
            }).start();
            autoPlaySwiper();
          } else if (currentPage > index){
            this.activeBarValue.setValue(100);
          } else {
            this.activeBarValue.setValue(0);
          }
        }
      }
    }
  }

  render() {
    const {
      steps, inActiveColor, activeColor, width, height, customStyle
    } = this.props;

    return (
      <View style={[styles.container, { width, height: 7,marginRight:5,borderRadius:10},customStyle]}>
        <View
          style={[styles.inactiveBar, { width, backgroundColor: inActiveColor, height: 7 }]}
        />
        <Animated.View
          style={[
            styles.activeBar,
            { backgroundColor: activeColor, height: 7},
            {
              transform: [
                {
                  translateX: this.activeBarValue.interpolate({ 
                    inputRange: [0, 100],
                    outputRange: [-width, 0]
                  })
                }
              ]
            }
          ]}
        />
      </View>
    )
  }
}
const ratio = PixelRatio.getFontScale()
// const { width: SW } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    overflow: 'hidden',
  },
  inactiveBar: {
    height: 3 * ratio,
  },
  activeBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom:0,
    height: 3 * ratio,
    backgroundColor: '#fff',
  }
})
