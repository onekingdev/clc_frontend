import * as TYPES from './types';
import {app} from '../../../../services/firebase';
import {apiCreateUser, apiValidateCode, getUserByEmail} from '../../../../helpers/constants';
import api from '../../../../services/apiMiddleware';
import {IUser} from '../../interfaces';
import firebase from "firebase";
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const clearAuthenticationData = () => {
    return {
        type: TYPES.CLEAR_AUTHENTICATION_DATA
    };
};

export const setAuthenticationCode = (data: number | string) => {
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

export const login = (data: IUser, callback: (success: boolean) => void) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        setTimeout(() => dispatch(setIsFetchingAuthentication(true)), 500);
        if (data.email && data.password) {
            await app
                .auth()
                .signInWithEmailAndPassword(data.email, data.password)
                .then(async result => {
                    const user = await api.post(getUserByEmail, data);
                    dispatch(setUserData(user))
                    setTimeout(() => callback(true), 1000);
                }).catch(e => dispatch(setAuthenticationCode(e.message)))
        }
    } catch (e) {
        dispatch(setAuthenticationCode(e))
        setTimeout(() => callback(false), 500);
    } finally {
        setTimeout(() => dispatch(setIsFetchingAuthentication(false)), 500);
    }
}

export const register = (data: IUser, callback: (success: boolean) => void) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {

    try {
        setTimeout(() => dispatch(setIsFetchingAuthentication(true)), 500);

        const code = await api.post(apiValidateCode, data);

        if (code.id && data.email && data.password) {
            await app
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(async result => {
                    data['stringID'] = result.user?.uid;
                    const user = await api.post(apiCreateUser, data);
                    await app
                        .firestore()
                        .collection('users')
                        .doc(data.stringID)
                        .set({
                            chips: 0,
                            tickets: 0,
                            myTopics: [],
                            favorites: []
                        });
                    await app
                        .firestore()
                        .collection('earnings')
                        .doc(data.stringID)
                        .set({
                            avatar: '',
                            userName: data.userName,
                            season: {correct: 0, chips: 0, started: timestamp},
                            week: {correct: 0, chips: 0, started: timestamp},
                            month: {correct: 0, chips: 0, started: timestamp},
                            lifetime: {correct: 0, chips: 0},
                            days: {
                                monday: {correct: 0, tickets: 0},
                                tuesday: {correct: 0, tickets: 0},
                                wednesday: {correct: 0, tickets: 0},
                                thursday: {correct: 0, tickets: 0},
                                friday: {correct: 0, tickets: 0},
                                saturday: {correct: 0, tickets: 0},
                                sunday: {correct: 0, tickets: 0},
                            }
                        });
                    dispatch(setUserData(user))
                    setTimeout(() => callback(true), 1000);
                }).catch(e => dispatch(setAuthenticationCode(e.message)))
        } else if (code.error) {
            dispatch(setAuthenticationCode(code.error));
            setTimeout(() => callback(false), 500);
        }
    } catch (e) {
        dispatch(setAuthenticationCode(e));
    } finally {
        setTimeout(() => dispatch(setIsFetchingAuthentication(false)), 500);
    }
}

export const emailReset = (data: IUser, callback: (success: boolean) => void) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        setTimeout(() => dispatch(setIsFetchingAuthentication(true)), 500);
        if (data.email) {
            await app
                .auth()
                .sendPasswordResetEmail(data.email)
                .then(async result => {
                    setTimeout(() => callback(true), 1000);
                }).catch(e => dispatch(setAuthenticationCode(e.message)))
        }
    } catch (e) {
        dispatch(setAuthenticationCode(e))
        setTimeout(() => callback(false), 500);
    } finally {
        setTimeout(() => dispatch(setIsFetchingAuthentication(false)), 500);
    }
}

export const logout = (callback: (success: boolean) => void) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        setTimeout(() => dispatch(setIsFetchingAuthentication(true)), 500);
        await app
            .auth()
            .signOut()
            .then(async result => {
                dispatch(clearAuthenticationData())
                setTimeout(() => callback(true), 2000);
            }).catch(e => dispatch(setAuthenticationCode(e.message)))

    } catch (e) {
        dispatch(setAuthenticationCode(e))
        setTimeout(() => callback(false), 1000);
    } finally {
        setTimeout(() => dispatch(setIsFetchingAuthentication(false)), 1000);
    }
}