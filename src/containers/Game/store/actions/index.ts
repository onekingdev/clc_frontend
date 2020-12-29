import * as TYPES from './types';
import {IFlop, IPlayers, IQuestions} from '../../interfaces';

export const clearGameData = () => {
    return {
        type: TYPES.CLEAR_GAME_DATA
    };
};

export const setGameCode = (data: number) => {
    return {
        type: TYPES.SET_GAME_CODE,
        payload: data
    }
}

export const setIsFetchingGameData = (data: boolean) => {
    return {
        type: TYPES.SET_IS_FETCHING_GAME_DATA,
        payload: data
    }
}

export const setPlayers = (data: IPlayers[]) => {
    return {
        type: TYPES.SET_PLAYERS,
        payload: data
    };
};

export const setFlop = (data: IFlop) => {
    return {
        type: TYPES.SET_FLOP,
        payload: data
    };
};

export const setQuestions = (data: IQuestions[]) => {
    return {
        type: TYPES.SET_QUESTIONS,
        payload: data
    };
};

export const fetchGameData = (lesson: object) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        //dispatch(setIsFetchingGameData(true));

    } catch (e) {
        dispatch(setGameCode(e));
    } finally {
        dispatch(setIsFetchingGameData(false));
    }
}

