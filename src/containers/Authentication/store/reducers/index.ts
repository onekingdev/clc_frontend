import { userInfo } from 'os';
import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    user: {token: undefined, rewardfulId: undefined},
    isFetchingAuthentication: false,
    messageCode: null
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_USER_DATA:
            if(!action.payload.token && !!state.user.token) action.payload.token = state.user.token;
            return {...state, user: {...action.payload, rewardfulId: state.user.rewardfulId}};
        case TYPE.SET_AUTHENTICATION_CODE:
            return {...state, messageCode: action.payload};
        case TYPE.SET_IS_FETCHING_AUTHENTICATION:
            return {...state, isFetchingAuthentication: action.payload};
        case TYPE.SET_REWARDFUL_ID:
            return {...state, user: {
                ...(state.user),
                rewardfulId: action.payload
            }
        };
        case TYPE.CLEAR_AUTHENTICATION_DATA:
            return {
                ...INITIAL_STATE, 
                user:{
                    token: undefined,
                    rewardfulId: state.user.rewardfulId
                }
            };
        default:
            return state;
    }
};

export default reducer;