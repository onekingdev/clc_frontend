import * as TYPES from "./types";
import api from "../../../../services/apiMiddleware";
import {apiGetQuestionsProgressbar, apiFinishAssessment} from "../../../../helpers/constants";
import {app} from "../../../../services/firebase";
import {setUserData} from "../../../Authentication/store/actions";
import {endOfDayHandler, endOfMonthHandler} from "../../../../helpers/validations";

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

export const setProgressData = (data: {id: number, correct: boolean | null}) => {
    return {
        type: TYPES.SET_PROGRESS_DATA,
        payload: data
    }
}

export const setProgressIndex = (data: number) => {
    return {
        type: TYPES.SET_PROGRESS_INDEX,
        payload: data
    }
}

export const saveAssessment = (assessment: { correct: number, totalQuestions: number, ticketsEarned: number, chipsEarned: number }) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const uid = getState().authState.user.stringID;
    const id = getState().authState.user.id;

    const newUserData = await api.post(apiFinishAssessment, {id});

    dispatch(setUserData(newUserData));

    await app
        .firestore()
        .collection('users')
        .doc(uid)
        .update('assessmentResult', assessment)

}

export const fetchQuestionProgressbar = (type: string, myTopics: any, UID?: string) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const user = getState().authState.user;
    const dailyChallenge = getState().screenTemplateState.dailyChallenge;

    if (dailyChallenge.lastUpdate) {
        let result = await api.post(apiGetQuestionsProgressbar, {
            type,
            myTopics,
            UID,
            user: {...user, dailyChallenge}
        });

        dispatch(setChipsEarned(result.chipsEarned));
        dispatch(setTicketsEarned(result.ticketsEarned));
        dispatch(setTotalQuestions(result.totalQuestions));
        dispatch(setCorrectQuestions(result.correctQuestions));
        dispatch(setProgressData(result.progressData));
        dispatch(setProgressIndex(result.progressIndex))

        await endOfMonthHandler(user.stringID);
        await endOfDayHandler(user.stringID);
    }
}