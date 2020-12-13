import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    libraryLists: {
        usage: [],
        faq: []
    },
    isFetchingLibraryData: false,
    messageCode: null
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_LIBRARY_LIST:
            return {...state, libraryLists: action.payload};
        case TYPE.SET_LIBRARY_CODE:
            return {...state, messageCode: action.payload};
        case TYPE.SET_IS_FETCHING_LIBRARY_DATA:
            return {...state, isFetchingLibraryData: action.payload};
        case TYPE.CLEAR_LIBRARY_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;