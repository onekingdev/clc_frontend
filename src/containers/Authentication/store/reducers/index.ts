import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    user: {},
    isFetchingAuthentication: false,
    messageCode: null
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_USER_DATA:
            return {...state, user: action.payload};
        case TYPE.SET_AUTHENTICATION_CODE:
            return {...state, messageCode: action.payload};
        case TYPE.SET_IS_FETCHING_AUTHENTICATION:
            return {...state, isFetchingAuthentication: action.payload};
        case TYPE.CLEAR_AUTHENTICATION_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;