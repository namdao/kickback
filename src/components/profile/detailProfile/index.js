import React from 'react';
import {Text, View, Image as ImageRN, ScrollView,Dimensions} from 'react-native';
import styles from './styles'
import Header from '@components/header';
import ICONBACK from '../../../thumbnails/ico-arrow-white.png';
import ICONEDIT from '../../../thumbnails/ico-edit.png';
import { NavigationActions } from '@actions/navigate';
import LOGODEFAULT from '../../../thumbnails/logo-default.png';
import Image from '@components/imageProgress';
import * as Progress from 'react-native-progress';
import ImageZoom from 'react-native-image-pan-zoom';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class DetailProfile extends React.Component {
  constructor(props) {
    super(props);
    const {data,currentUser, userReducer} = props;
    this.state = {
      isCurrent: data.user_id == userReducer.user_id ? true : false
    }
  }
  backDetail = () => {
    NavigationActions.toggleTabs(true);
    NavigationActions.dismissLightBox();
  }
  editProfile = () => {
    const {isCurrent} = this.state;
    const {userReducer} = this.props;
    if (isCurrent) {
      NavigationActions.dismissLightBox();
      NavigationActions.navigateToCreateProfile({isEdit: true, userData: userReducer});
    } else {
      NavigationActions.dismissLightBox();
      NavigationActions.navigateToCreateProfile({isEdit: true, userData: data});
    }
  }
  render () {
    const {isCurrent} = this.state;
    const {userReducer, data} = this.props;
    return (
      <View style={styles.scrollView}>
        <View style = {[styles.container]}>
        <Header 
          mainText={isCurrent ? userReducer.username : data.username} 
          leftAction={this.backDetail}
          imageLeft={ICONBACK} 
          actionRight={[{
            icon:isCurrent ?ICONEDIT : null,
            action:isCurrent ? this.editProfile : null
          }]}
          noShadow={true} 
          stylesHeaderText={styles.headerText} 
          stylesHeader={styles.header}/>
          <View style={styles.linewhite}>
          </View>
        <ScrollView style = {styles.scrollStyle}>
          <View style={{paddingBottom: 30}}>
          <ImageZoom 
          doubleClickInterval={300}
          cropWidth={width}
          cropHeight={height * 0.5}
          imageWidth={width}
          imageHeight={height * 0.5}>
          {!isCurrent ? 
            <ImageRN 
            source={data.avatar ? {uri: data.avatar} : LOGODEFAULT}
            resizeMode='contain'
            // indicator={Progress.Circle}
            // indicatorProps={{
            //   size: 40,
            //   borderWidth: 0,
            //   color: 'rgba(150, 150, 150, 1)',
            //   unfilledColor: 'rgba(200, 200, 200, 0.2)'
            // }}
            style={styles.avatar}
            />
          : 
          <ImageRN
          resizeMode='contain'
          source={userReducer.avatar ? {uri: userReducer.avatar} : LOGODEFAULT}
          // indicator={Progress.Circle}
          // indicatorProps={{
          //   size: 40,
          //   borderWidth: 0,
          //   color: 'rgba(150, 150, 150, 1)',
          //   unfilledColor: 'rgba(200, 200, 200, 0.2)'
          // }}
          style={styles.avatar}/>
          }
          </ImageZoom>
          {/* {!isCurrent ? <Image style={styles.avatar} source={data.avatar ? {uri: data.avatar} : LOGODEFAULT} resizeMode='contain' />
             : <Image style={styles.avatar} source={userReducer.avatar ? {uri: userReducer.avatar} : LOGODEFAULT} resizeMode='contain' />} */}
            <View style={[styles.textContainer,{alignItems:'center'}]}>
              {/* <Text allowFontScaling={false} style={styles.titleText}>Frist Last name</Text> */}
              <Text allowFontScaling={false} style={styles.titleDataName}>{isCurrent ? userReducer.name : data.name}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.titleText}>School</Text>
              <Text allowFontScaling={false} style={styles.titleData}>{isCurrent ? userReducer.custom_school : data.custom_school}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.titleText}>Class Year</Text>
              <Text allowFontScaling={false} style={styles.titleData}>{isCurrent ? userReducer.class_year :  data.class_year}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.titleText}>Major(s) / Minors(s)</Text>
              <Text allowFontScaling={false} style={styles.titleData}>{isCurrent ? userReducer.major : data.major}</Text>
            </View>

            <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.titleText}>Organizations / Clubs</Text>
              <Text allowFontScaling={false} style={styles.titleData}>Coming Soon...</Text>
            </View>
            <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.titleText}>Hobbies / Interests</Text>
              <Text allowFontScaling={false} style={styles.titleData}>{isCurrent ? userReducer.hobbies : data.hobbies}</Text>
            </View>
            {/* <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.titleText}>What else?</Text>
              <Text allowFontScaling={false} style={styles.titleData}>{isCurrent ? userReducer.whatelse : data.whatelse}</Text>
            </View> */}
            </View>
        </ScrollView>
        </View>
      </View>
    );
  }
}

export default DetailProfile;