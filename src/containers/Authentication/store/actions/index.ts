import * as TYPES from './types';
import {app} from '../../../../services/firebase';
import {apiCreateUser, apiValidateCode, apiRegisterEndpoint, apiEmailResetEndpoint} from '../../../../helpers/constants';
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
        if (data.email && data.password) {
            await app
                .auth()
                .signInWithEmailAndPassword(data.email, data.password)
                .then(async result => {
                    const user = await api.post(apiCreateUser, data);
                    dispatch(setUserData(user))
                });
        }
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

        const code = await api.post(apiValidateCode, data);

        // alert(JSON.stringify(code));
        /*if (code && data.email && data.password) {
            await app
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(async result => {
                    const user = await api(apiRegisterEndpoint, 'POST', data);
                    dispatch(setUserData(user))
                })
        }*/
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
        if (data.email) {
            await app
                .auth()
                .sendPasswordResetEmail(data.email)
                .then(async result => {
                    const code = await api.post(apiEmailResetEndpoint, data);
                    dispatch(setUserData(code))
                })
        }
    } catch (e) {
        dispatch(setAuthenticationCode(e))
    } finally {
        dispatch(setIsFetchingAuthentication(false));
    }
}