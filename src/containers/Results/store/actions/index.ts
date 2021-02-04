import * as TYPES from "./types";
import api from "../../../../services/apiMiddleware";
import {apiLevelUp} from "../../../../helpers/constants";
import {setUserData} from "../../../Authentication/store/actions";
import {app} from "../../../../services/firebase";

export const clearResultsData = () => {
    return {
        type: TYPES.CLEAR_RESULTS_DATA
    };
};

export const setTicketsEarned = (data: number) => {
    return {
        type: TYPES.SET_TICKETS_EARNED,
        payload: data
    }
}

export const setChipsEarned = (data: number) => {
    return {
        type: TYPES.SET_CHIPS_EARNED,
        payload: data
    }
}

export const setCorrectQuestions = (data: number) => {
    return {
        type: TYPES.SET_CORRECT_QUESTIONS,
        payload: data
    }
}

export const setTotalQuestions = (data: number) => {
    return {
        type: TYPES.SET_TOTAL_QUESTIONS,
        payload: data
    }
}

export const saveAssessment = (assessment: { correct: number, totalQuestions: number, ticketsEarned: number, chipsEarned: number }, callback: () => void) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const uid = getState().authState.user.stringID;

    await app
        .firestore()
        .collection('users')
        .doc(uid)
        .update('assessmentResult', assessment)

    await app
        .firestore()
        .collection('users')
        .doc(uid)
        .update('assessment', false)

    callback();
}