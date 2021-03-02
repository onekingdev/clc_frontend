import * as TYPES from './types';
import api from '../../../../services/apiMiddleware';
import {
    apiDropLessons,
    apiDropLibrary,
    apiDropQuestions,
    apiDropTopics,
    apiUploadLibrary,
    apiUploadContent,
    apiDropGlossary,
    apiUploadGlossary,
    apiUploadEvents,
    apiDropEvents,
    apiUpdateUser
} from "../../../../helpers/constants";
import * as AUTH_ACTIONS from '../../../Authentication/store/actions';
import {IUpdateUserData} from "../../interfaces";
import {app} from "../../../../services/firebase";

export const settingsErrorMessage = (data: string) => {
    return {
        type: TYPES.SET_SETTINGS_ERROR_MESSAGE,
        payload: data
    }
}

export const isUploadingLibraryData = (data: boolean) => {
    return {
        type: TYPES.SET_IS_UPLOADING_LIBRARY_DATA,
        payload: data
    };
}

export const uploadLibrary = (library: any) => async (dispatch: any, getState: any) => {
    dispatch(isUploadingLibraryData(true));
    await api.get(apiDropLibrary);

    return api.post(apiUploadLibrary, library)
        .then(response => {
            dispatch(isUploadingLibraryData(false));
            return response;
        });
}

export const uploadQuestions = (questions: any) => async (dispatch: any, getState: any) => {
    dispatch(isUploadingLibraryData(true));
    await api.get(apiDropQuestions);
    await api.get(apiDropLessons);
    await api.get(apiDropTopics);

    return api.post(apiUploadContent, questions)
        .then(response => {
            dispatch(isUploadingLibraryData(false));
            return response;
        });
}

export const uploadGlossary = (glossary: any) => async (dispatch: any, getState: any) => {
    dispatch(isUploadingLibraryData(true));
    await api.get(apiDropGlossary);

    return api.post(apiUploadGlossary, glossary)
        .then(response => {
            dispatch(isUploadingLibraryData(false));
            return response;
        });
}

export const uploadEvents = (events: any) => async (dispatch: any, getState: any) => {
    dispatch(isUploadingLibraryData(true));
    await api.get(apiDropEvents);

    return api.post(apiUploadEvents, events)
        .then(response => {
            dispatch(isUploadingLibraryData(false));
            return response;
        });
}

export const updateUserData = (userData: IUpdateUserData) => async (dispatch: any, getState: any) => {
    const user = getState().authState.user;
    let error = false;

    if (!error && userData.password !== 'set your new password') {
        const userObj = await app.auth().currentUser;
        // @ts-ignore
        await userObj.updatePassword(userData.password)
            .then()
            .catch((e) => {
                dispatch(settingsErrorMessage(e.message))
                error = true;
            })

    }

    if (!error && userData.email !== user.email) {
        const userObj = await app.auth().currentUser;
        // @ts-ignore
        await userObj.updateEmail(userData.email)
            .then()
            .catch((e) => {
                dispatch(settingsErrorMessage(e.message))
                error = true;
            })
    }

    if (!error && userData.avatar !== user.avatar) {
        await app
            .firestore()
            .collection('earnings')
            .doc(user.stringID)
            .update('avatar', userData.avatar);
    }


    if (!error) {
        await api.post(apiUpdateUser, {id: user.id, ...userData})
            .then(response => {
                dispatch(AUTH_ACTIONS.setUserData(response));
                alert('User data successfully updated');
            });
    }
}