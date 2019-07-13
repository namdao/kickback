import {
  FETCH_COMMENT_SUCCESS, FETCH_COMMENT_ERROR,
  ADD_COMMENT_SUCCESS, EDIT_COMMENT_SUCCESS,
  UPDATE_FOLLOWING_COMMENT,
  RESET_ALL_STATE, FETCH_COMMENTMORE_SUCCESS, FETCH_SUBCOMMENT_MORE_SUCCESS,
  CREATE_REPORT_COMMENT_SUCCESS,CLEAR_ENTITY_LOCAL,
} from '@constants/action-names';
import _ from 'lodash';
const initialState = {
  comments: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ALL_STATE: {
      return initialState
    }
    case FETCH_COMMENT_SUCCESS: {
      const { results } = action.payload;
      return {
        ...state,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        comments: results
      };
    }
    case FETCH_COMMENTMORE_SUCCESS: {
      const { results } = action.payload;
      let resultFull = [...state.comments, ...results];
      resultFull = _.uniqBy(resultFull, 'comment_id');
      return {
        ...state,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        comments: resultFull
      }
    }
    case FETCH_SUBCOMMENT_MORE_SUCCESS: {
      var tmpState = JSON.parse(JSON.stringify(state));
      const {
        results,
        comment_id,
        count,
        next,
        previous
      } = action.payload;
      // FIND NODE PARENT COMMENT WITH COMMENT_ID(PARENT)
      const parentComment = tmpState.comments.find((value) => value.comment_id == comment_id);
      // UPDATE MAX NUMBER SUBCOMMENT, NEXT, PREVIOUS
      parentComment.total_sub_comment = count;
      parentComment.next = next;
      parentComment.previous = previous;
      // UNIQUE SUBCOMMENTS
      parentComment.subComments = _.uniqBy(
        [...parentComment.subComments, ...results],
        'comment_id'
      );
      return {
        ...tmpState,
      }
    }
    case ADD_COMMENT_SUCCESS: {
      const { parent, comment_id, content } = action.payload;
      if (parent == null) {
        action.payload.subComments = [];
        state.comments.push(action.payload);
      }
      else {

        let data = state.comments.find(com => com.comment_id == parent);
        data.subComments.push(action.payload)
      }

      return { ...state }
    }
    case EDIT_COMMENT_SUCCESS: {
      var tmpState = JSON.parse(JSON.stringify(state));
      const { parent, comment_id, content } = action.payload;
      if (parent == null) {
        let data = tmpState.comments.find(com => com.comment_id == comment_id);
        data.content = content;
      }
      else {
        let data = tmpState.comments.find(parenCom => parenCom.subComments.length > 0 ?
          parenCom.subComments.find(sub => sub.comment_id == comment_id) : null);
        if (data) {
          let subData = data.subComments.find(s => s.comment_id == comment_id);
          subData.content = content;
        }
      }
      return { ...tmpState }
    }
    case UPDATE_FOLLOWING_COMMENT: {
      var tmpState = JSON.parse(JSON.stringify(state));
      const { parent, user_id, follow_status } = action.payload;

      tmpState.comments.map((value) => {
        if (value.user.user_id == user_id) value.user.follow_status = follow_status;
        if (value.subComments.length > 0) {
          let subCom = value.subComments.filter(com => com.user.user_id == user_id);
          subCom.map((com) => com.user.follow_status = follow_status);
        }
      });
      return { ...tmpState }
    }
    case CLEAR_ENTITY_LOCAL: {
      return {
        ...state,
        comments: []
      }
    }
    case CREATE_REPORT_COMMENT_SUCCESS: {
      if (action && action.payload) {
        var tmpState = JSON.parse(JSON.stringify(state));
        const { comment_id,parent } = action.payload;
        let comments;
        if (Array.isArray(state.comments)) {
          if(parent){
            comments = tmpState.comments.find(com => com.comment_id == parent);
            if(comments.subComments.length > 0){
              comments.total_sub_comment = comments.total_sub_comment - 1;
              comments.subComments = comments.subComments.filter(f => f.comment_id != comment_id);
            }
          }
          else{
            tmpState.comments = tmpState.comments.filter(com => com.comment_id !== comment_id);
            tmpState.count = tmpState.count - 1;
          }
        }
        return {
          ...tmpState,
        };
      }
      return state;
    }
    
    default: {
      return state;
    }
  }
};

export default commentReducer;
