import React from 'react';
import {View, Text, FlatList, TouchableOpacity,Image} from 'react-native';
import styles from './styles';
import { NavigationActions } from '@actions/navigate';
import ICONCHECKED from '../../../thumbnails/icon-checked.png';
class ListSelectBox extends React.Component {
  constructor(props) {
    super(props)
  };
  onPress = () => NavigationActions.dismissLightBox();
  keyExtractor = (item, index) => index.toString();

  onPressItem = (item) => {
    NavigationActions.dismissLightBox();
    item.onPress();
  }
  _itemSeparator = () => <View style = {styles.separateLine}></View>
  _renderListData = ({item}) => {
    
    return(
    <TouchableOpacity style = {[styles.item, this.props.isLeft ? {alignItems: 'center',flexDirection:'row',justifyContent:'space-between'} : {}]} onPress={this.onPressItem.bind(this,item)}>
      <Text allowFontScaling={false} style = {styles.text}>{item.title}</Text>
      {item.isCheck ? <Image source={ICONCHECKED} resizeMode='cover' /> : null}
    </TouchableOpacity>
    );
  }
  render() {
    return(
      <View style = {styles.container}>
        <View style = {styles.subModal}>
          <FlatList
            scrollEnabled={false}
            ItemSeparatorComponent = {this._itemSeparator}
            style={{flex: 1}}
            keyExtractor={this.keyExtractor}
            data={this.props.dataListSelectBox}
            renderItem={this._renderListData}/>
        </View>
      </View>
    );
  }
}
export default ListSelectBox;