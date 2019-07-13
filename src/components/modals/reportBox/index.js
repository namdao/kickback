import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import colors from '@constants/colors';
import { NavigationActions } from '@actions/navigate';
import ButtonBorder from '@components/buttonBorder';

class ReportBox extends React.Component {
  onPress = () => NavigationActions.dismissLightBox();
  keyExtractor = (item, index) => index.toString();

  onPressItem = (item) => {
    NavigationActions.dismissLightBox();
    item.onPress();
  }
  onCancelModal = () => {
    NavigationActions.dismissLightBox();
  }
  _itemSeparator = () => (<View style={styles.separateLine}></View>)

  _renderListData = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.item, item.styleTouchable]}
        onPress={this.onPressItem.bind(this, item)}>
        <Text allowFontScaling={false} style={[styles.text, item.styleText]}>{item.title}</Text>
      </TouchableOpacity>
    );
  }
  render() {
    const { subTitle, title, dataListReport } = this.props;
    const titleButton = this.props.titleButton || 'Cancel';
    return (
      <View style={styles.container}>
        <View style={styles.subModal}>
          {title && <Text allowFontScaling={false}  style={styles.title}>{title}</Text>}
          {subTitle && <Text allowFontScaling={false}  style={styles.subTitle}>{subTitle}</Text>}
          {dataListReport && <FlatList
            scrollEnabled={false}
            ItemSeparatorComponent={this._itemSeparator}
            style={styles.listStyle}
            keyExtractor={this.keyExtractor}
            data={this.props.dataListReport}
            renderItem={this._renderListData} />}
          <ButtonBorder onPress={this.onCancelModal} colorText={colors.black}
            title={titleButton} styles={styles.btnCancel} />
        </View>
      </View>
    );
  }
}
export default ReportBox;