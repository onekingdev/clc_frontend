import * as TYPES from './types';
import {IFlop, IPlayers, IQuestions} from '../../interfaces';
import {apiSaveEarnings, apiGetQuestions} from '../../../../helpers/constants';
import api from '../../../../services/apiMiddleware';
import {app} from "../../../../services/firebase";

export const clearGameData = () => {
    return {
        type: TYPES.CLEAR_GAME_DATA
    };
};

export const setGameCode = (data: number) => {
    return {
        type: TYPES.SET_GAME_CODE,
        payload: data
    }
}

export const setIsFetchingGameData = (data: boolean) => {
    return {
        type: TYPES.SET_IS_FETCHING_GAME_DATA,
        payload: data
    }
}

export const setQuestions = (data: IQuestions[]) => {
    return {
        type: TYPES.SET_QUESTIONS,
        payload: data
    };
};

export const fetchGameData = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        const lesson = {
            UID: await getState().pathsState.selectedTopic.lessonUID,
            name: await getState().pathsState.selectedTopic.lessonName,
        }
        dispatch(setIsFetchingGameData(true));
        let questions = await api.post(apiGetQuestions, lesson);
        if (questions) dispatch(setQuestions(questions));
    } catch (e) {
        dispatch(setGameCode(e));
    } finally {
        dispatch(setIsFetchingGameData(false));
    }
}

export const saveEarnings = (data: object) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        await api.post(apiSaveEarnings, data);
    } catch (e) {
        dispatch(setGameCode(e));
    } finally {
        dispatch(setIsFetchingGameData(false));
    }
}

export const updateMyTopics = (questionID: number, correct: boolean) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const uid = getState().authState.user.stringID;
    const myTopics = getState().screenTemplateState.myTopics;
    const topic = getState().pathsState.selectedTopic;

    const myTopicsIndex = myTopics.findIndex((t: any) => t.id === topic.id);

    if (myTopicsIndex !== -1) {
        const lessonIndex = myTopics[myTopicsIndex].lessons.findIndex((l: any) => l.UID === topic.lessonUID)

        if (lessonIndex !== -1) {
            const questionIndex = myTopics[myTopicsIndex].lessons[lessonIndex].questions.findIndex((q: any) => q.id === questionID)

            if (questionIndex !== -1) {
                myTopics[myTopicsIndex].lessons[lessonIndex].questions[questionIndex] = {id: questionID, correct}
                if (correct) {
                    myTopics[myTopicsIndex].lessons[lessonIndex].correctInARow += 1;
                    if (myTopics[myTopicsIndex].lessons[lessonIndex].correctInARow === 5) { // TODO change this condition in near future
                        myTopics[myTopicsIndex].lessons[lessonIndex].mastered = true;
                        let counter = 0;
                        myTopics[myTopicsIndex].lessons.forEach((l:any) => {if (l.mastered) counter++});
                        if (counter === topic.totalTopicLessons) myTopics[myTopicsIndex].mastered = true;
                    }
                } else {
                    myTopics[myTopicsIndex].lessons[lessonIndex].correctInARow = 0;
                }
            } else {
                myTopics[myTopicsIndex].lessons[lessonIndex].questions.push({
                    id: questionID,
                    correct,
                })
            }
        } else {
            myTopics[myTopicsIndex].lessons.push({
                mastered: false,
                UID: topic.lessonUID,
                lessonName: topic.lessonName,
                correctInARow: correct ? 1 : 0,
                questions: [
                    {
                        id: questionID,
                        correct: correct
                    }
                ]
            })
        }
    } else {
        myTopics.push({
            id: topic.id,
            UID: topic.UID,
            name: topic.name,
            masteredLevel: topic.masteredLevel,
            chips: topic.chips,
            tickets: topic.tickets,
            status: topic.status,
            mastered: false,
            lessons: [{
                    mastered: false,
                    UID: topic.lessonUID,
                    lessonName: topic.lessonName,
                    correctInARow: correct ? 1 : 0,
                    questions: [
                        {
                            id: questionID,
                            correct: correct
                        }
                    ]
            }]
        })
    }

    await app
        .firestore()
        .collection('users')
        .doc(uid)
        .update('myTopics', myTopics)

}

