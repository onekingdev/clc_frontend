import * as TYPES from './types';
import api from '../../../../services/apiMiddleware';
import {apiDropLessons, apiDropLibrary, apiDropQuestions, apiDropTopics} from "../../../../helpers/constants";

export const isUploadingLibraryData = (data: boolean) => {
    return {
        type: TYPES.SET_IS_UPLOADING_LIBRARY_DATA,
        payload: data
    };
}

export const uploadLibrary = (library: any) => async (dispatch: any, getState: any) => {
    dispatch(isUploadingLibraryData(true));
    await api.get(apiDropLibrary);

    return api.post("uploadLibrary", library)
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

    return api.post("uploadContent", questions)
        .then(response => {
            dispatch(isUploadingLibraryData(false));
            return response;
        });
}