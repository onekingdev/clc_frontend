import * as TYPE from '../actions/types';

const INITIAL_STATE = {
    exampleData: [],
};

const reducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case TYPE.ACTION_TEST:
            return { ...INITIAL_STATE, exampleData: [1] };
        default:
            return state;
    }
};

export default reducer;