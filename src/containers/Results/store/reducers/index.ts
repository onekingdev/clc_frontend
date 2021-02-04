import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    ticketsEarned: 0,
    chipsEarned: 0,
    correctQuestions: 0,
    totalQuestions: 0
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_TICKETS_EARNED:
            return {...state, ticketsEarned: action.payload};
        case TYPE.SET_CHIPS_EARNED:
            return {...state, chipsEarned: action.payload};
        case TYPE.SET_CORRECT_QUESTIONS:
            return {...state, correctQuestions: action.payload};
        case TYPE.SET_TOTAL_QUESTIONS:
            return {...state, totalQuestions: action.payload};
        case TYPE.CLEAR_RESULTS_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;