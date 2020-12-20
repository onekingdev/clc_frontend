import * as TYPES from './types';
import {ILibraryList} from '../../interfaces';
import api from '../../../../services/apiMiddleware';
import {apiGetLibrary} from '../../../../helpers/constants';

export const clearLibraryData = () => {
    return {
        type: TYPES.CLEAR_LIBRARY_DATA
    };
};

export const setLibraryCode = (data: number) => {
    return {
        type: TYPES.SET_LIBRARY_CODE,
        payload: data
    }
}

export const setIsFetchingLibraryData = (data: boolean) => {
    return {
        type: TYPES.SET_IS_FETCHING_LIBRARY_DATA,
        payload: data
    }
}

export const setLibraryList = (data: ILibraryList) => {
    return {
        type: TYPES.SET_LIBRARY_LIST,
        payload: data
    };
}

export const fetchLibraryList = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        dispatch(setIsFetchingLibraryData(true));
        const list = await api.get(apiGetLibrary);
        dispatch(setLibraryList(list));
    } catch (e) {
        setLibraryCode(e);
    } finally {
        dispatch(setIsFetchingLibraryData(false));
    }
}

