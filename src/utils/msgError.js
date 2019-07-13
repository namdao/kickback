import { NavigationActions } from "@actions/navigate";
export const validError = (err) => {
  if (err) {
    if (err.response && err.response.data) {
      if (err.response.data.data) {
        const { error_message,error_code } = err.response.data.data;
        let msg = 'There was a problem connecting to the server. Please try again!';
        if (error_message) {
          msg = error_message;
        }
        if(error_code == 1008){
          msg = 'The token has expired or someone is using your account.';
        }
        NavigationActions.showWarningBox(msg)
      } else {
        NavigationActions.showWarningBox('There was a problem connecting to the server. Please try again!')
      }
    }
    else if (err.error_message) {
      NavigationActions.showWarningBox(err.error_message)
    }
    else {
      NavigationActions.showWarningBox('Please Check Your Internet Connection!')
    }
  } else {
    NavigationActions.showWarningBox('Please Check Your Internet Connection!')
  }
}

export const reportDone = () => {
  const reportDone = {
    title: 'Report Submitted',
    subTitle: 'Thank you for helping to make Kickback a better place.',
    titleButton: 'Close'
  };
  NavigationActions.showReportBox(reportDone);
}
export default validError;