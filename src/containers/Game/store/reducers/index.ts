import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    questions: [],
    fetchNextAIQuestions: false,
    isFetchingGameData: false,
    messageCode: null,
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_QUESTIONS:
            return {...state, questions: action.payload};
        case TYPE.SET_FETCH_NEXT_AI_QUESTIONS:
            return {...state, fetchNextAIQuestions: action.payload};
        case TYPE.SET_GAME_CODE:
            return {...state, messageCode: action.payload};
        case TYPE.SET_IS_FETCHING_GAME_DATA:
            return {...state, isFetchingGameData: action.payload};
        case TYPE.CLEAR_GAME_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;