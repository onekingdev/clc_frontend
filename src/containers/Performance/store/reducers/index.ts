import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    graphData: [],
    tableData: {
        chipsEarned: [],
        myChipsEarned: 0,
        correctQuestions: [],
        myCorrectQuestions: 0,
        myCorrectRank: 0,
        myChipRank: 0
    },
    isFetchingPerformanceData: false,
    messageCode: null
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_GRAPH_DATA:
            return {...state, graphData: action.payload};
        case TYPE.SET_TABLE_DATA:
            return {...state, tableData: action.payload};
        case TYPE.SET_PERFORMANCE_CODE:
        case TYPE.SET_IS_FETCHING_PERFORMANCE_DATA:
            return {...state, isFetchingPerformanceData: action.payload};
            return {...state, messageCode: action.payload};
        case TYPE.CLEAR_PERFORMANCE_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;