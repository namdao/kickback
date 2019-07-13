import {
    UPDATE_IS_UPLOADING,
    RESET_ALL_STATE
} from '@constants/action-names';

import _ from 'lodash';

const initialState = {
    isUploading: false,
    total: 0,
    progress: 0,
    currentImage: 0,
};

const uploadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_ALL_STATE: {
            return initialState
        }
        case UPDATE_IS_UPLOADING: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: {
            return state;
        }
    }
};

export default uploadingReducer;
