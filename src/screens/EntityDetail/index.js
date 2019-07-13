import React from 'react';
import { View, Image} from 'react-native';
import Container from '@components/container';
import HEADERKICKBACK from '../../thumbnails/header_kickback.png';
import Header from '@components/header';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from '@actions/navigate';
import FeedEntity from '@components/feedEntity';
import CommentList from '@components/commentList';
import feedLine from '../../thumbnails/feed-line.png'
import flight from '../../thumbnails/flight.png';
import InputMessage from './inputMessage';
import {getWidthAndHeight} from '@utils/dimensions';
const {height} = getWidthAndHeight();
class EntityDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      marginBottom: 0,
      messages: '',
      tag: '',
      isDisplay: false,
      parent: null,
      positionY: 0,
      isShow: true
    }
    this.refInput = null;
    this.debounceCheck = true;
    this.renderHeader = this.renderHeader.bind(this);
    setTimeout(() => { this.setState({ isDisplay: true }) }, 200);
    this.isCheckPost = false;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  
  componentWillUpdate = (nextProps, nextState) => {
  }
  
  componentDidUpdate(prevProps) {
    const { reportReducer } = this.props;
    if (reportReducer && reportReducer.response && prevProps.reportReducer !== reportReducer) {
      this.back();
    }
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        NavigationActions.setNavigator(this.props.navigator);
        break;
      case 'didAppear':
        NavigationActions.toggleTabs(false);
        break;
      case 'willDisappear':
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }
  
  componentWillMount() {
    const { entity: { post_id }, requestEntityDetail } = this.props;
    requestEntityDetail({ post_id, isLoading: true });
  }

  

  back = () => {
    this.props.clearEntity();
    NavigationActions.pop();
    NavigationActions.toggleTabs(true);
  }

  onDeleteComment = (payload) => {
    const { entity: { post_id }, requestDeleteComment } = this.props;
    payload.post_id = post_id;
    requestDeleteComment(payload);
  }

  onChangeText = (text) => {
    if (this.state.tag.trim().includes(text)) {
      this.debounceCheck = false;
      this.setState({ tag: '', parent: null, messages: '' });
    } else {
      if (!text.includes(this.state.tag)) {
        this.setState({ tag: '', parent: null, messages: text.substring(text.indexOf(this.state.tag) + this.state.tag.length) })
        return;
      }
      this.setState({ messages: text.substring(text.indexOf(this.state.tag) + this.state.tag.length) })
    }
  }
  onPressReply = (item, parent) => {
    this.refInput.onPressReply(item,parent);
  }
  commingSoon = () => {
    NavigationActions.showCommingSoonBox('COMING SOON');
  }

  renderHeader = ({ index }) => {
    const { entityReducer, userReducer } = this.props;
    if (entityReducer.entity) {
        return <View>
          <FeedEntity
            screen={'commentPage'}
            entities={entityReducer.entity}
            currentUser={userReducer}
            index={index ? index : 0}
            isManual={true}
            screenDetail={true}
            isFromComment={true}
            goBack={this.back}
          />
          <Image style={styles.line} source={feedLine} />
        </View>
    } else {
      return (
      <View style={{flex:1,height}}>
        
      </View>);
    }
  }
  handleScroll(event) {
    this.setState({ positionY: event.nativeEvent.contentOffset.y });
  }
  render() {
    const { entity, userReducer,
    commentReducer, requestEntityDetail, fetchCommentMore, fetchSubCommentMore,entityReducer } = this.props;
    const { isDisplay } = this.state;

    return (
      <Container>
        <Header noShadow={true} stylesHeader={styles.header}
          actionRight={[{
            icon: flight,
            action: this.commingSoon
          }]}
        >
          <Image resizeMode='contain' style={styles.imageLogo} source={HEADERKICKBACK} />
        </Header>
        {entityReducer.entity && !entityReducer.entity.medias ?
          NavigationActions.pop() :
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='handled'
          style={[{ flex: 1 }]}
          resetScrollToCoords={{ x: 0, y: this.handleScroll }}
        >
          {isDisplay ? (
            <View style={{ flex: 1 }}>
              <View>
                <CommentList
                  screen={'commentList'}
                  requestFollowing={this.props.requestFollowing}
                  dataListSelectBox={commentReducer.comments}
                  onDeleteComment={this.onDeleteComment}
                  currentUser={userReducer}
                  onPressReply={this.onPressReply}
                  requestEntityDetail={requestEntityDetail}
                  entity={entity}
                  FeedEntity={this.renderHeader}
                  fetchCommentMore={fetchCommentMore}
                  fetchSubCommentMore={fetchSubCommentMore}
                  commentReducer={commentReducer}
                  createReportComment={this.props.createReportComment}
                  requestBlockedUsers={this.props.requestBlockedUsers}
                />
              </View>
              <InputMessage 
              ref= {(input) => this.refInput = input}
              requestAddComment={this.props.requestAddComment}
              entity={entity}
              requestEntityDetail={this.props.requestEntityDetail}
              userReducer={userReducer}
              onPressReply={this.onPressReply}
              />
            </View>
          ) : null}
        </KeyboardAwareScrollView>}
      </Container>
    );
  }
};

export default EntityDetail;
