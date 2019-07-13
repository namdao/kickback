import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import colors from '@constants/colors';
import fontSizes from '@constants/font-sizes';
import {getWidthAndHeight} from '@utils/dimensions';
import { generateUuid } from '@utils/uuid';


import {
  SlidersColorPicker,
  HueGradient,
  SaturationGradient,
  LightnessGradient,
  HueSlider,
  SaturationSlider,
  LightnessSlider
} from '@components/react-native-color/src';
import tinycolor from 'tinycolor2';

const sizeScreen = getWidthAndHeight();
class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
  }
  updateHue = h => {
    // this.setState({ color: { ...this.state.color, h }});
    this.props.onChangeColor({ ...this.props.color, h });
  };

  onPressItem = (item, index) => {
    this.props.onPress(item);
    this.setState({selectedIndex: index})
  }
  keyExtractor = (item, index) => generateUuid();
  _renderListData = ({item, index}) => {
    const {selectedIndex, arrayColor} = this.state;
    return <TouchableOpacity 
    onPress={this.onPressItem.bind(this,item,index)}
    style = {{
      marginRight: 5,
      borderWidth: selectedIndex == index ? 5 : 1,
      borderColor: 'white',
      backgroundColor: item,width: (sizeScreen.width / arrayColor.length) - 10,
      height: (sizeScreen.width / arrayColor.length) - 10,
      borderRadius: ((sizeScreen.width / arrayColor.length)-10)/2}}>
    </TouchableOpacity>
  }
  render () {
    return (
      <HueSlider
        style={styles.sliderRow}
        gradientSteps={359}
        value={this.props.color.h}
        onValueChange={this.updateHue}/>
      // <FlatList
      //   style={{flex: 1}}
      //   horizontal={true}
      //   keyExtractor={this.keyExtractor}
      //   data={arrayColor}
      //   renderItem={this._renderListData}/>
    );
  }
}


export default ColorPicker;