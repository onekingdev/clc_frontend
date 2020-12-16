import * as TYPES from "./types";
import api from '../../../../services/apiMiddleware';

export const actionTest = () => {
    return {
        type: TYPES.ACTION_TEST
    };
}

export const uploadLibrary = (library: any) => (dispatch: any, getState: any) => {
    return api.post("uploadLibrary", library)
        .then(response => {
            console.log("uploadLibrary",response);
            return response;
        });
}

export const uploadQuestions = (questions: any) => (dispatch: any, getState: any) => {
    return api.post("uploadQuestions", questions)
        .then(response => {
            console.log("uploadQuestions",response);
            return response;
        });
}