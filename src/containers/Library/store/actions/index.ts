import * as TYPES from './types';
import {ILibraryList} from '../../interfaces';
import api from '../../../../services/apiMiddleware';
import {apiGetLibrary, apiWatchVideoLibrary} from '../../../../helpers/constants';

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

export const setLibraryWatchinStatus = (payload: any) => {
    return {
        type: TYPES.SET_LIBRARY_WATCHING_STATUS,
        payload: payload,
    }
}

export const setLibraryList = (data: ILibraryList) => {
    return {
        type: TYPES.SET_LIBRARY_LIST,
        payload: data
    };
}

export const fetchLibraryList = (sortByNewest?: string, sortByWatch?: string, userId?: string) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        dispatch(setIsFetchingLibraryData(true));
        const list = await api.get(apiGetLibrary + `?sortByNewest=${sortByNewest}&sortByWatch=${sortByWatch}&userId=${userId}`);
        dispatch(setLibraryList(list));
    } catch (e) {
        setLibraryCode(e);
    } finally {
        dispatch(setIsFetchingLibraryData(false));
    }
}

export const openVideoHandler = (id: number, userId: number, key: string) => async (
    dispatch: (data: any) => void,
    getDate: any
) => {
    try {
        const result = await api.post(apiWatchVideoLibrary, { id: id, userId: userId });
        if (result.status === 201) {
            dispatch(setLibraryWatchinStatus({id: id, key: key}))
        }
    } catch (e: any) {
        console.log("OpenVidoeHandler: ", e.message);
    } finally {
        // nothing
    }
}