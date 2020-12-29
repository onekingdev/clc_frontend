import * as TYPES from './types';
import api from '../../../../services/apiMiddleware';

export const isUploadingLibraryData = (data: boolean) => {
    return {
        type: TYPES.SET_IS_UPLOADING_LIBRARY_DATA,
        payload: data
    };
}

export const uploadLibrary = (library: any) => (dispatch: any, getState: any) => {
    dispatch(isUploadingLibraryData(true));
    return api.post("uploadLibrary", library)
        .then(response => {
            dispatch(isUploadingLibraryData(false));
            return response;
        });
}

export const uploadQuestions = (questions: any) => (dispatch: any, getState: any) => {
    dispatch(isUploadingLibraryData(true));
    return api.post("uploadContent", questions)
        .then(response => {
            dispatch(isUploadingLibraryData(false));
            return response;
        });
}