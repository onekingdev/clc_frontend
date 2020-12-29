import * as TYPES from './types';
import {IPathsList} from '../../interfaces';
import api from '../../../../services/apiMiddleware';
import {apiPathsEndpoint} from '../../../../helpers/constants';

export const clearPathsData = () => {
    return {
        type: TYPES.CLEAR_PATHS_DATA
    };
};

export const setPathsCode = (data: number) => {
    return {
        type: TYPES.SET_PATHS_CODE,
        payload: data
    }
}

export const setIsFetchingPathsData = (data: boolean) => {
    return {
        type: TYPES.SET_IS_FETCHING_PATHS_DATA,
        payload: data
    }
}

export const setPathsList = (data: IPathsList) => {
    return {
        type: TYPES.SET_PATHS_LIST,
        payload: data
    };
}

export const getPathsList = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        dispatch(setIsFetchingPathsData(true));
        const myTopics = getState().screenTemplateState.myTopics;
        const email = getState().authState.user.email;
        const list = await api.post(apiPathsEndpoint, {myTopics, email});
        dispatch(setPathsList(list));
    } catch (e) {
        dispatch(setPathsCode(e));
    } finally {
        dispatch(setIsFetchingPathsData(false));
    }
}