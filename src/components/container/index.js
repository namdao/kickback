import React from 'react';
import {SafeAreaView, View} from 'react-native';
import colors from '@constants/colors';
import styles from './styles'
class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {backgroundColor = colors.white, stylesContainer = {}} = this.props;
    return (
      <View style = {[
        styles.container,{backgroundColor, ...stylesContainer}]}>
        {this.props.children}
      </View>
    );
  }
}


export default Container;