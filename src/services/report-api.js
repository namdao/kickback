import { apiRequest } from './base-api';

const sendReport = (method, url, token, body) => (
  apiRequest(method, url, body, { Authorization: `Bearer ${token}` })
    .then((res) => res.data)
    .catch((err) => ({ err }))
);

export const apiCreateReport = (token, body) => {
  // return apiRequest('POST', '/posts/report/', body, { Authorization: `Bearer ${token}` })
  //   .then((res) => res.data)
  //   .catch((err) => ({ err }))
  return sendReport('POST', '/posts/report/', token, body);
}

export const apiCreateReportComment = (token, body) => {
  return sendReport('POST', '/comments/report/', token, body);
}
