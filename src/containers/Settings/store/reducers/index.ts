import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    isUploadingLibraryData: false
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_IS_UPLOADING_LIBRARY_DATA:
            return {...state, isUploadingLibraryData: action.payload};
        default:
            return state;
    }
};

export default reducer;