import {
  FETCH_ENTITY_SUCCESS,FETCH_ENTITY_ERROR,ENTITY_LIKE_SUCCESS,
  ENTITY_UNLIKE_SUCCESS,CLEAR_ENTITY_LOCAL,UPDATE_FOLLOWING_COMMENT,
  RESET_ALL_STATE} from '@constants/action-names';
import _ from 'lodash';
const initialState = {
  entity: null,
};

const entityReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ALL_STATE: {
      return initialState
    }
    case FETCH_ENTITY_SUCCESS:{
      return {
        ...state,
        entity: action.payload
      }
    }
    case ENTITY_LIKE_SUCCESS:{
        
        if(state.entity){
          state.entity.like = action.payload.like;
          state.entity.total_like = action.payload.total_like + 1
        }
        const newState = _.cloneDeep(state.entity);
        return {
          ...state,
          entity:newState,
        }
    }
    case ENTITY_UNLIKE_SUCCESS:{
        if(state.entity){
          state.entity.like = action.payload.like;
          state.entity.total_like = action.payload.total_like - 1
        }
        const newState = _.cloneDeep(state.entity);
        return {
          ...state,
          entity: newState
        }
    }
    case CLEAR_ENTITY_LOCAL:{
      state.entity = null;
      return {
        ...state
      }
    }
    case UPDATE_FOLLOWING_COMMENT: {
      var tmpState = JSON.parse(JSON.stringify(state));
      const {parent,user_id,follow_status} = action.payload;
      if(tmpState.entity.user.user_id == user_id){
        tmpState.entity.user.follow_status = follow_status;
      }
      return {...tmpState}
    }
    default: {
      return state;
    }
  }
};

export default entityReducer;
