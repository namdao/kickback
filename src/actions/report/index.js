import {
  CREATE_REPORT,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAILED,
  CREATE_REPORT_COMMENT,
  CREATE_REPORT_COMMENT_SUCCESS,
  CREATE_REPORT_COMMENT_FAILED,
} from '@constants/action-names';

const createReportSuccess = (payload = {}) => {
  return {
    type: CREATE_REPORT_SUCCESS,
    payload
  }
}
const createReportFailed = (payload = {}) => {
  return {
    type: CREATE_REPORT_FAILED,
    payload
  }
}
const createReport = (payload = {}) => {
  return {
    type: CREATE_REPORT,
    payload
  }
}

const createReportComment = (payload = {}) => {
  return {
    type: CREATE_REPORT_COMMENT,
    payload
  }
}
const createReportCommentSuccess = (payload = {}) => {
  return {
    type: CREATE_REPORT_COMMENT_SUCCESS,
    payload
  }
}
const createReportCommentFailed = (payload = {}) => {
  return {
    type: CREATE_REPORT_COMMENT_FAILED,
    payload
  }
}

export {
  createReportSuccess,
  createReport,
  createReportFailed,
  createReportComment,
  createReportCommentSuccess,
  createReportCommentFailed
}