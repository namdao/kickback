import React from 'react';
import { Image as ImageRn, TouchableOpacity,View, ImageStore } from 'react-native';
import styles from './styles';
import * as Progress from 'react-native-progress';
let ImageProgress= null;
class ListPhoto extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isUnmount = false;
    if(ImageProgress == null){
      ImageProgress = require('@components/imageProgress').default;
    }
  }
  componentWillUnmount(){
    this.isUnmount = true;
    ImageStore.removeImageForTag(this.props.uriPhoto);
  }
  _finishLoading = () => {
    if(!this.isUnmount){
      this.props.onFinishLoading({loaded: true})
    }
  }
  render() {
    const { screenDetail, uriPhoto, photoFullScreen } = this.props;
    if (screenDetail) {
      return (
        <View style = {{flex: 1}}>
          <ImageProgress
            resizeMode={'cover'}
            indicator={Progress.Circle}
            indicatorProps={{
              size: 80,
              borderWidth: 0,
              color: 'rgba(150, 150, 150, 1)',
              unfilledColor: 'rgba(200, 200, 200, 0.2)'
            }}
            style={styles.imgContainer}
            source={{ uri: uriPhoto}}
          />
        </View>
      );
    } else {
      return (
        <TouchableOpacity activeOpacity={1} onPress={photoFullScreen}>
          <ImageProgress
            onLoadEnd={this._finishLoading}
            resizeMode={'cover'}
            indicator={Progress.Circle}
            indicatorProps={{
              size: 80,
              borderWidth: 0,
              color: 'rgba(150, 150, 150, 1)',
              unfilledColor: 'rgba(200, 200, 200, 0.2)'
            }}
            style={styles.imgContainer}
            source={{ uri: uriPhoto }}
          />
        </TouchableOpacity>
      );
    }
  }
}
export default ListPhoto