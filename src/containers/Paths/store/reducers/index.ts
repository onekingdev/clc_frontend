import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    pathsList: {},
    isFetchingPathsData: false,
    messageCode: null
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_PATHS_LIST:
            return {...state, pathsList: action.payload};
        case TYPE.SET_PATHS_CODE:
            return {...state, messageCode: action.payload};
        case TYPE.SET_IS_FETCHING_PATHS_DATA:
            return {...state, isFetchingPathsData: action.payload};
        case TYPE.CLEAR_PATHS_DATA:
        return INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;