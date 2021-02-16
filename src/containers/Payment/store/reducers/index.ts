import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    clientSecret: '',
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_CLIENT_SECRET:
            return {...state, clientSecret: action.payload};
        default:
            return state;
    }
};

export default reducer;