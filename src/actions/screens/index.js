import {
    CHANGE_SCREEN_NAME
} from '@constants/action-names';
  
const updateScreenName = (payload = {}) => {
    return {
        type: CHANGE_SCREEN_NAME,
        payload
    }
}
export {
    updateScreenName
}