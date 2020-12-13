import * as TYPES from './types';
import {apiLoginEndpoint, apiRegisterEndpoint, apiEmailResetEndpoint} from '../../../../helpers/constants';
import api from '../../../../services/apiMiddleware';
import {IUser} from '../../interfaces';

export const clearAuthenticationData = () => {
    return {
        type: TYPES.CLEAR_AUTHENTICATION_DATA
    };
};

export const setAuthenticationCode = (data: number) => {
    return {
        type: TYPES.SET_AUTHENTICATION_CODE,
        payload: data
    };
};

export const setIsFetchingAuthentication= (data: boolean) => {
    return {
        type: TYPES.SET_IS_FETCHING_AUTHENTICATION,
        payload: data
    };
};

export const setUserData = (data: IUser) => {
    return {
        type: TYPES.SET_USER_DATA,
        payload: data,
    };
};

export const login = (data: IUser) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        dispatch(setIsFetchingAuthentication(true));
        const user = await api(apiLoginEndpoint, 'POST', data);
        dispatch(setUserData(user))
    } catch (e) {
        dispatch(setAuthenticationCode(e))
    } finally {
        dispatch(setIsFetchingAuthentication(false));
    }
}

export const register = (data: IUser) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        dispatch(setIsFetchingAuthentication(true));
        const user = await api(apiRegisterEndpoint, 'POST', data);
        dispatch(setUserData(user))
    } catch (e) {
        dispatch(setAuthenticationCode(e))
    } finally {
        dispatch(setIsFetchingAuthentication(false));
    }
}

export const emailReset = (data: IUser) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        dispatch(setIsFetchingAuthentication(true));
        const code = await api(apiEmailResetEndpoint, 'POST', data);
        dispatch(setUserData(code))
    } catch (e) {
        dispatch(setAuthenticationCode(e))
    } finally {
        dispatch(setIsFetchingAuthentication(false));
    }
}