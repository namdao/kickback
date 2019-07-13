import {
  CREATE_REPORT,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAILED,
  CREATE_REPORT_COMMENT,
  CREATE_REPORT_COMMENT_SUCCESS,
  CREATE_REPORT_COMMENT_FAILED,
} from '@constants/action-names';

const initialState = {
  response: undefined,
  responseReportComment: undefined,
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REPORT: // create report post
      return {
        ...state,
        response: undefined,
      };
    case CREATE_REPORT_SUCCESS: {
      return {
        ...state,
        response: action.data,
      }
    }
    case CREATE_REPORT_FAILED:
      return {
        ...state,
        response: undefined,
      };
    case CREATE_REPORT_COMMENT_FAILED:
    case CREATE_REPORT_COMMENT: {
      return {
        ...state,
        responseReportComment: undefined,
      }
    }
    case CREATE_REPORT_COMMENT_SUCCESS: {
      return {
        ...state,
        responseReportComment: action.data,
      }
    }
    default: {
      return state;
    }
  }
};

export default reportReducer;
