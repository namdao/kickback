import {
    UPDATE_IS_UPLOADING,
  } from '@constants/action-names'

const updateUploading = (payload) => {
    return {
        type: UPDATE_IS_UPLOADING,
        payload
    }
}

export {
    updateUploading
}