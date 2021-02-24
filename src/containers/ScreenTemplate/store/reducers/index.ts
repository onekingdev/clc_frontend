import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    chips: 0,
    tickets: 0,
    myTopics: [],
    favorites: [],
    dailyChallenge: {}
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_CHIPS:
            return {...state, chips: action.payload};
        case TYPE.SET_TICKETS:
            return {...state, tickets: action.payload};
        case TYPE.SET_FAVORITES:
            return {...state, favorites: action.payload};
        case TYPE.SET_MY_TOPICS:
            return {...state, myTopics: action.payload};
        case TYPE.SET_DAILY_CHALLENGE:
            return {...state, dailyChallenge: action.payload};
        default:
            return state;
    }
};

export default reducer;