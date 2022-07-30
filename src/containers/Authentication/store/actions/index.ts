import * as TYPES from './types';
import {app} from '../../../../services/firebase';
import {apiCreateUser, apiValidateCode, apiGetUserByEmail, apiCheckDailyPassword} from '../../../../helpers/constants';
import api from '../../../../services/apiMiddleware';
import {IUser} from '../../interfaces';

import firebase from "firebase/app";
import 'firebase/firestore'
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { Console } from 'console';
require("dotenv").config();

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

export const setRewardfulId = (data:any) => {
    return {
        type: TYPES.SET_REWARDFUL_ID,
        payload: data,
    };
}
export const login = (data: IUser, callback: (success: boolean, userData: IUser) => void) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        sessionStorage.setItem('selectedTopic', '{}');
        setTimeout(() => dispatch(setIsFetchingAuthentication(true)), 500);
        if (data.email && data.password) {
                if(process.env.REACT_APP_WITHOUT_OAUTH === 'false') 
                await app
                    .auth()
                    .signInWithEmailAndPassword(data.email, data.password)
                    .then(async result => {
                        const user = await api.post(apiGetUserByEmail, data);
                        dispatch(setUserData(user))
                        setTimeout(() => callback(true, user), 1000);
                    }).catch(async e => {
                    /*------------------ universal password -S---------------------*/
                        let isChecked = false;
                        const checkUPwd = await api.post(apiCheckDailyPassword, data);          //check password from backend api
                        if(checkUPwd.success) {
                            /*----------- check u password in firebase -S-----------------*/
                            await app
                                .auth()
                                .signInWithEmailAndPassword(<string>process.env.REACT_APP_UPWD_EMAIL, <string>data.password)
                                .then(async result => {
                                    isChecked = true;
                                }).catch(async e => {isChecked = false})
                            /*----------- check u password in firebase -E-----------------*/
                        } 
                        if(!isChecked) {
                            dispatch(setAuthenticationCode(e.message))
                        } else {
                            const user = await api.post(apiGetUserByEmail, data);
                            dispatch(setUserData(user))
                            setTimeout(() => callback(true, user), 1000);
                        }
                    /*------------------ universal password -E---------------------*/
                    })
            else {
                const user = await api.post(apiGetUserByEmail, data);
                dispatch(setUserData(user))
                setTimeout(() => callback(true, user), 1000);
            }
        }
    } catch (e) {
        dispatch(setAuthenticationCode(e))
        setTimeout(() => callback(false, {}), 500);
    } finally {
        setTimeout(() => dispatch(setIsFetchingAuthentication(false)), 500);
    }
}

export const register = (data: IUser, callback: (success: boolean, registeredUser: any) => void) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        sessionStorage.setItem('selectedTopic', '{}');
        setTimeout(() => dispatch(setIsFetchingAuthentication(true)), 500);

        const code = await api.post(apiValidateCode, data);

        if (code.id && data.email && data.password) {
            await app
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(async result => {
                    console.log(result)
                    data['stringID'] = result.user?.uid;
                    const user = await api.post(apiCreateUser, data);
                    await app
                        .firestore()
                        .collection('users')
                        .doc(data.stringID)
                        .set({
                            dailyChallenge: {questions: 10, counter: 0, days:[], lastUpdate: timestamp},
                            chips: 0,
                            tickets: 0,
                            myTopics: [{}],
                            favorites: []
                        });
                    await app
                        .firestore()
                        .collection('earnings')
                        .doc(data.stringID)
                        .set({
                            avatar: 'S',
                            userName: data.userName,
                            season: {correct: 0, chips: 0, tickets: 0, started: timestamp},
                            week: {correct: 0, chips: 0, tickets: 0, started: timestamp},
                            month: {correct: 0, chips: 0, tickets: 0, started: timestamp},
                            lifetime: {correct: 0, chips: 0, tickets: 0},
                            days: {
                                monday: {correct: 0, tickets: 0},
                                tuesday: {correct: 0, tickets: 0},
                                wednesday: {correct: 0, tickets: 0},
                                thursday: {correct: 0, tickets: 0},
                                friday: {correct: 0, tickets: 0},
                                saturday: {correct: 0, tickets: 0},
                                sunday: {correct: 0, tickets: 0},
                            },
                            months: {
                                december: {correct: 0, tickets: 0},
                                january: {correct: 0, tickets: 0},
                                february: {correct: 0, tickets: 0},
                                march: {correct: 0, tickets: 0},
                                april: {correct: 0, tickets: 0},
                                may: {correct: 0, tickets: 0},
                                june: {correct: 0, tickets: 0},
                                july: {correct: 0, tickets: 0},
                                august: {correct: 0, tickets: 0},
                                september: {correct: 0, tickets: 0},
                                october: {correct: 0, tickets: 0},
                                november: {correct: 0, tickets: 0},
                            }
                        });
                    dispatch(setUserData(user))
                    setTimeout(() => callback(true, user), 1000);
                }).catch(e => dispatch(setAuthenticationCode(e.message)))
        } else if (code.error) {
            dispatch(setAuthenticationCode(code.error));
            setTimeout(() => callback(false, {}), 500);
        }
        return code;
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

export const fetchUpdatedUserData = (email: string) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        const user = await api.post(apiGetUserByEmail, {email});
       
        dispatch(setUserData(user));
    } catch (e) {
        alert('user not found')
    } finally {

    }
}