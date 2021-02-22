import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    dailyGraphData: [],
    monthlyGraphData: [],
    tableData: {
        chipsEarned: [],
        myChipsEarned: 0,
        correctQuestions: [],
        myCorrectQuestions: 0,
        myCorrectRank: 0,
        myChipRank: 0,
        myTickets: 0,
    },
    isFetchingPerformanceData: false,
    messageCode: null
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.SET_DAILY_GRAPH_DATA:
            return {...state, dailyGraphData: action.payload};
        case TYPE.SET_MONTHLY_GRAPH_DATA:
            return {...state, monthlyGraphData: action.payload};
        case TYPE.SET_TABLE_DATA:
            return {...state, tableData: action.payload};
        case TYPE.SET_PERFORMANCE_CODE:
            return {...state, messageCode: action.payload};
        case TYPE.SET_IS_FETCHING_PERFORMANCE_DATA:
            return {...state, isFetchingPerformanceData: action.payload};
        case TYPE.CLEAR_PERFORMANCE_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;