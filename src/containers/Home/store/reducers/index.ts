import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    events: [],
    isFetchingEvents: false,
    contentSpotlight: {},
    weeklyHandBreakdown: {},
    isFetchingCards: false,
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_EVENTS:
            return {...state, events: action.payload};
        case TYPE.SET_CONTENT_SPOTLIGHT:
            return {...state, contentSpotlight: action.payload};
        case TYPE.SET_WEEKLY_HAND_BREAKDOWN:
            return {...state, weeklyHandBreakdown: action.payload};
        case TYPE.SET_IS_FETCHING_EVENTS:
            return {...state, isFetchingEvents: action.payload};
        case TYPE.SET_IS_FETCHING_CARDS:
            return {...state, isFetchingCards: action.payload};
        default:
            return state;
    }
};

export default reducer;