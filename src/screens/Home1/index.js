import React from 'react';
import { View, Alert, Image, TouchableOpacity, ActivityIndicator,FlatList, NetInfo } from 'react-native';
import { NavigationActions } from '@actions/navigate';
import Container from '@components/container';
import PLUS_BLACK from '../../thumbnails/plus_black.png';
import SEARCH_BLACK from '../../thumbnails/search_black.png';
import HEADERKICKBACK from '../../thumbnails/header_kickback.png';
import Header from '@components/header';
import FeedEntity from '@components/feedEntity';
import styles from './styles';
import { k_USER_FIRST_TIME } from '@constants/storage-constants';
import { checkPermissionRequest } from '@sagas/permissionsSaga';
import { TYPE_PHOTO, TYPE_RECORD } from '@constants/permissions';
import { setKeyAsyncStorage, getKeyAsyncStorage } from "@utils/async";
import MediaMeta from 'react-native-media-meta';

import { getWidthAndHeight } from '@utils/dimensions';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
const { width, height } = getWidthAndHeight();
import { default as ImagePickerCrop } from 'react-native-image-crop-picker';

import _ from 'lodash';
import CommonDataManager from '../../common';
import { validateMedias } from '@utils/validate';
import { FollowerHistory, HOME, USER_PROFILE} from '../../actions/follower.history';
import * as Progress from 'react-native-progress';
import VersionNumber from 'react-native-version-number';
import ListDataSource from './listDataSource';

export default class Home1 extends React.Component {
  _layoutProvider;
  constructor(props) {
    super(props);
    this.debounceOnEndReach = _.debounce(this._onEndReached, 500);
    this.state = { positionY: 0, loadmore: false, isCroping: false,isConnected: true};
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.firstLoad = true;
    this._renderItem = this._renderItem.bind(this);
    // Init notification Service
    this.commonDataManager = new CommonDataManager();
    this.commonDataManager.getNotificationService().setupNotificationService(props);
    this.heightListEntity = height - height / 5;
    const heightProvider = this.heightListEntity + 40;
    this.enableOnViewItem = false;
    this._layoutProvider = new LayoutProvider(
      (index) => index,
      (type, dim) => {
        dim.width = width;
        dim.height = heightProvider
      }
    );
    this.viewabilityConfig = {
      viewAreaCoveragePercentThreshold: 50,
      minimumViewTime: 500,
    };
    this.listFeed = [];
    this.dataSource = new ListDataSource();
  }
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.screensReducer.name != this.props.screensReducer.name) {
      this.commonDataManager.getNotificationService().setupNotificationService(nextProps);
    }
    if (nextProps.entitiesReducer.isNewCreatePost) {
      this.dataSource.resetData();
    }
  }
  onNavigatorEvent(event) {
    switch (event.id) {
      case 'bottomTabReselected':
        // this.scrollToIndex();
        this.scrollToTop(true);
        break;
      case 'willAppear':
        this.props.backHome();
        NavigationActions.setNavigator(this.props.navigator);
        break;
      case 'didAppear':
        this.playItemInFeeds();
        FollowerHistory.setTabActiveName(HOME);
        FollowerHistory.reset(HOME);
        NavigationActions.toggleTabs(true);
        break;
      case 'willDisappear':
        this.pauseItemInFeeds();
        break;
      case 'didDisappear':
        FollowerHistory.toggleIsAtHome();
        break;
      case 'willCommitPreview':
        break;
    }
  }

  playItemInFeeds() {
    let postId = this.dataSource.activePost.postId;
    if (this.listFeed[`${postId}`]) {
      this.listFeed[`${postId}`].play && this.listFeed[`${postId}`].play();
    }
  }

  pauseItemInFeeds() {
    let postId = this.dataSource.activePost.postId;
    if (this.listFeed[`${postId}`]) {
      this.listFeed[`${postId}`].pause && this.listFeed[`${postId}`].pause();
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    //Controll History Navigate between difference screen HOME - FOLLOWER - FOLLOWER_LIST - PROFILE
    FollowerHistory.push(HOME,{
      screen: HOME,
      user_id: null,
      actionArrays: []
    })
    
  }
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.props.fetchEntities();
      this.props.getInfoProfile();
      this.setState({ isConnected:true });
    } else {
      this.setState({ isConnected:false });
    }
  };
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  _checkVersion = async () => {
    const version = VersionNumber.appVersion;
    this.props.checkVersion(version);
  }

  componentWillMount() {
    this._checkVersion();
    getKeyAsyncStorage(k_USER_FIRST_TIME).then((response) => {
      if (!response.isCheckedPermissionSignUp) {
        checkPermissionRequest({ type: TYPE_PHOTO });
        setKeyAsyncStorage(k_USER_FIRST_TIME, { isCheckedPermissionSignUp: true });
      }
    });
  }
  
  componentWillUpdate = (nextProps) => {
    if (nextProps.entitiesReducer.count != this.props.entitiesReducer.count) {
      if (nextProps.entitiesReducer.count == 0) {
        this.setState({ loadmore: false });
      }
      if (this.props.entitiesReducer.dashBoardData[0] != nextProps.entitiesReducer.dashBoardData[0]) {
        if (!this.firstLoad) {
          setTimeout(() => {
            // this.scrollToIndex();
            this.scrollToTop(true);
          }, 300)
        }
        this.firstLoad = false;
      }
    }
  }
 
  _renderItem = ({ item, index }) => {

    return (
      <FeedEntity
        index={index}
        entities={item}
        dataSource={this.dataSource}
        fromScreen={HOME}
        ref={(ref) => this.listFeed = {...this.listFeed, [`${item.post_id}`]: ref}} //Saving Refs Here
      />
    );
  }

  scrollToTop = (animated = false) => {
    if (this.refs.homeList) {
      this.refs.homeList.scrollToOffset({offset: 0, animated: animated});
      // this.refs.homeList.scrollToTop();
    }
  }
  scrollToIndex = () => {
    if (this.refs.homeList){
      this.refs.homeList.scrollToIndex({index:1});
      setTimeout(() => {
        this.refs.homeList.scrollToIndex({index:0});
      },200)
    }
  }
  _onHeader = () => {
    NavigationActions.showToolTopBar({ scrollToTop: this.scrollToTop });
  }

  handleScroll = (event: Object) => {
    this.setState({ positionY: event.nativeEvent.contentOffset.y });
  }

  _onPressSearch = () => {
    NavigationActions.showSearchBox({tabIndex: 0});
  }

  _checkLimitLengthVideo = (uri) => {
    return MediaMeta.get(uri)
  }

  _setPicture = (response) => {
    const arrayMedias = [];
    response.map((media) => {
      let fileName = media.fileName;
      if (!fileName)
        fileName = media.uri.substr(media.uri.lastIndexOf('/') + 1);
      const ext = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
      let source = {
        uri: media.uri,
        fileName: fileName,
        type: media.mime ? media.mime : `image/${fileName.substr(fileName.lastIndexOf('.') + 1)}`,
      };
      const extFormat = ext.toLowerCase();
      if (extFormat == 'mov' || extFormat == 'mp4') {
        const photoPath = source.uri.replace('file://', '');
        this._checkLimitLengthVideo(photoPath).then((metadata) => {
          source.type = 'video/mp4';
          if (metadata.duration > 60000) {
            Alert.alert(
              'Sorry',
              'Video duration must be less than 1 minute',
              [
                { text: 'OK', onPress: () => { } }
              ],
              { cancelable: false }
            );
          } else {
            source.videoTime = Math.floor(metadata.duration / 1000 + 1);
            let durationReal = metadata.duration / 1000;
            arrayMedias.push(source);
            NavigationActions.navigateToEditScreen({arrayMedias, type: response[0].mime, videoTime: source.videoTime,duration:durationReal});
            // NavigationActions.navigateToEditScreen(source);
          }
        }).catch(err => console.error(err));
      } else if (extFormat == 'jpg' || extFormat == 'jpeg' || extFormat == 'png') {
        arrayMedias.push(source);
        // NavigationActions.navigateToEditScreen(source)
      } else {
        Alert.alert(
          'Sorry',
          'This file is not allowed',
          [
            { text: 'OK', onPress: () => { } }
          ],
          { cancelable: false }
        );
        return;
      }
    })
    if (!response[0].mime.includes('video')) {
      NavigationActions.navigateToEditScreen({arrayMedias, type: response[0].mime});
    }
  }
  _onPressCreatePost = () => {
    const dataListSelectBox = [
      {
        title: 'Use Camera',
        onPress: async () => {
          const response = await checkPermissionRequest({ type: TYPE_RECORD });
          if (response) {
            NavigationActions.navigateToCamera();
          }
        }
      },{
        title: 'Photo Library',
        onPress: async () => {
          const response = await checkPermissionRequest({ type: TYPE_PHOTO });
          if (response) {
            ImagePickerCrop.openPicker({
              multiple: true,
              width,
              height,
              maxFiles: 10,
              compressImageQuality: 0.8,
              compressImageMaxWidth: 816,
              compressImageMaxHeight: 1088,
              forceJpg: true,
            }).then(async (data) => {
              const isValid = validateMedias(data);
              if (isValid) {
                if (data[0].mime.includes('video')) {
                  this._setPicture([{ ...data[0], uri: data[0].path }]);
                  return;
                }
                this.setState({isCroping: true})
                NavigationActions.toggleTabs(false);
                data = data.map((media) => ({...media, uri: media.path}))
                const sequenceCropImage = data.map((media, index) => {
                  return (
                    () => {
                      return ImagePickerCrop.openCropper({
                        path: media.path,
                        width,
                        height,
                        compressImageQuality: 0.8,
                        compressImageMaxWidth: 816,
                        compressImageMaxHeight: 1088,
                        cropping: true,
                        forceJpg: true,
                      })
                    }
                  )
                });
                for (let i =0 ; i < sequenceCropImage.length; i++) {
                  try {
                    const response = await sequenceCropImage[i]();
                    data[i].uri = response.path;
                    if (i == sequenceCropImage.length - 1) {
                      this.setState({isCroping: false})
                      this._setPicture(data);
                    }
                  } catch(error) {
                    if (i == sequenceCropImage.length - 1) {
                      this.setState({ isCroping: false });
                      NavigationActions.toggleTabs(true);
                    }
                  }
                }                  
              }
             
            });
          }
        }
      }
    ];
    NavigationActions.showListSelectBox({ dataListSelectBox, checkPermission: this.props.checkPermission });
  }
  renderFooter = () => {
    if (!this.props.loadingReducer.isLoadMoreHome) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  /**
   * @name _onEndReached
   * @summary - render add friends screen
   * @return {undefined}
   */
  _onEndReached = () => {
    if (!this.props.loadingReducer.isLoadMoreHome) {
      const { count, next } = this.props.entitiesReducer;
      const { loadmore } = this.state;
      if (count >= 0 && next && next != null) {
        !loadmore && this.setState({ loadmore: true });
        this.props.fetchEntitiesMore({ next });
      } else {
        loadmore && this.setState({ loadmore: false });
      }
    }
  }
  playItem = (item) => {
    debugger
  }
  onViewItem = (event) => {
    const changed = event.changed;
    const viewableItems = event.viewableItems;
    viewableItems.forEach(item => {
        if (item.isViewable && this.listFeed[`${item.item.post_id}`]) {
          if (this.dataSource.activePost.postId != item.item.post_id) {
            this.listFeed[`${item.item.post_id}`].play &&
            this.listFeed[`${item.item.post_id}`].play();
          }
        }
    });
    changed.forEach(item => {
        if (!item.isViewable && this.listFeed[`${item.item.post_id}`]) {
          if (this.dataSource.activePost.postId != item.item.post_id) {
            this.listFeed[`${item.item.post_id}`].pause &&
            this.listFeed[`${item.item.post_id}`].pause();
          }
        }
    });
  }

  onPullRefresh = () => {
    this.pauseItemInFeeds();
    this.dataSource.resetData();
    this.props.fetchEntitiesPullRefresh();
  }
  render() {
    const { loadingReducer, entitiesReducer, uploadingReducer } = this.props
    const {isCroping} = this.state;
    const dataList = entitiesReducer.dashBoardData;

    return (
      <Container stylesContainer={{ paddingBottom: 50 }}>
        <Header
          imageLeft={SEARCH_BLACK} leftAction={this._onPressSearch}
          actionRight={uploadingReducer.isUploading ? [] : [{
            icon: PLUS_BLACK,
            action: this._onPressCreatePost
          }]}
          noShadow={true} stylesHeader={styles.header}>
          <TouchableOpacity onPress={this._onHeader}>
            <Image resizeMode='contain' style={styles.imageLogo} source={HEADERKICKBACK} />
          </TouchableOpacity>
        </Header>
        
        {uploadingReducer.isUploading && <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: 10, paddingBottom: 10}}>
          <Progress.Bar progress={uploadingReducer.progress} width={width - 40} />
        </View>}
        {!this.state.isConnected ? null :
        <FlatList
          viewabilityConfig={this.viewabilityConfig}
          scrollEventThrottle={16}
          // onScrollEndDrag={this.handleScroll}
          onViewableItemsChanged={this.onViewItem}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.debounceOnEndReach}
          ref={'homeList'}
          onRefresh={this.onPullRefresh}
          refreshing={loadingReducer.isPullRefresh}
          maxToRenderPerBatch={1}
          windowSize={11}
          initialNumToRender={1}
          onEndReachedThreshold={1.5}
          removeClippedSubviews={false}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          data={dataList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.post_id.toString()}
        />}
        {isCroping && <View style = {styles.indicator}>
          <ActivityIndicator
            animating={true}
            color={'gray'}
          />
        </View>}
      </Container>
    );
  }
}
