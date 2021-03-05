import * as TYPES from './types';
import * as AUTH_ACTIONS from '../../../Authentication/store/actions';
import {IQuestions} from '../../interfaces';
import {
    apiSaveEarnings,
    apiGetQuestions,
    apiGetAIQuestions,
    apiLevelUp,
    apiGetAssessment
} from '../../../../helpers/constants';
import api from '../../../../services/apiMiddleware';
import {app} from "../../../../services/firebase";
import moment from "moment";

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

export const setFetchNextAIQuestions = (data: boolean) => {
    return {
        type: TYPES.SET_FETCH_NEXT_AI_QUESTIONS,
        payload: data
    };
};

export const fetchGameData = (myTopics: any) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        dispatch(setIsFetchingGameData(true));
        const topic = JSON.parse(<string>sessionStorage.getItem('selectedTopic'));
        const pathname = new URL(window.location.href).pathname;

        if (topic && topic.id) {
            const lesson = {
                UID: topic.lessonUID,
                name: topic.lessonName,
            }
            let questions = await api.post(apiGetQuestions, lesson);
            if (questions) dispatch(setQuestions(questions));
        } else if (pathname === '/assessment') {
            let questions = await api.post(apiGetAssessment,{myTopics});
            if (questions) dispatch(setQuestions(questions));
        } else {
            const user = await getState().authState.user;

            let questions = await api.post(apiGetAIQuestions, {myTopics, user});
            if (questions) dispatch(setQuestions(questions));
        }
    } catch (e) {
        dispatch(setGameCode(e));
    } finally {
        dispatch(setIsFetchingGameData(false));
    }
}

export const saveEarnings = (path: string, data: { tickets: number, questionID: number, chips: number, userID: number, challenge: number}) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const uid = getState().authState.user.stringID;

    try {
        let dailyChallenge = getState().screenTemplateState.dailyChallenge;
        if (path !== '/assessment' && dailyChallenge.questions > dailyChallenge.counter) {
            data.challenge = 1;
            dailyChallenge.counter += 1;
            if (!dailyChallenge.days.includes(parseInt(moment().format('DD')))) {
                dailyChallenge.days.push(parseInt(moment().format('DD')));
            }
            await app
                .firestore()
                .collection('users')
                .doc(uid)
                .update('dailyChallenge', dailyChallenge)
        }

        await api.post(apiSaveEarnings, data);
    } catch (e) {
        dispatch(setGameCode(e));
    } finally {
        dispatch(setIsFetchingGameData(false));
    }
}

export const levelUp = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const user = await getState().authState.user;

    let newUserData = await api.post(apiLevelUp, {id: user.id});

    dispatch(AUTH_ACTIONS.setUserData(newUserData));
}

export const updateMyTopics = (path: string, questionID: number, correct: boolean, topicData: any, answeredIndex: number) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const uid = getState().authState.user.stringID;
    const myTopics = getState().screenTemplateState.myTopics;
    const topic = topicData ? topicData : JSON.parse(<string>sessionStorage.getItem('selectedTopic'));

    const myTopicsIndex = myTopics.findIndex((t: any) => t.UID === topic.UID);

    if (myTopicsIndex !== -1) {
        const lessonIndex = myTopics[myTopicsIndex].lessons.findIndex((l: any) => l.UID === topic.lessonUID)

        if (lessonIndex !== -1) {
            let questionIndex = myTopics[myTopicsIndex].lessons[lessonIndex].questions.findIndex((q: any) => q.id === questionID)
            //***************************************************************************************
            const rule = myTopics[myTopicsIndex].lessons[lessonIndex].rule.split('/');

            if (questionIndex !== -1) {
                if (!myTopics[myTopicsIndex].lessons[lessonIndex].questions[questionIndex].correct && correct) {
                    myTopics[myTopicsIndex].lessons[lessonIndex].correctInARow += 1;
                    myTopics[myTopicsIndex].lessons[lessonIndex].correct += 1;
                } else if (myTopics[myTopicsIndex].lessons[lessonIndex].questions[questionIndex].correct && !correct && myTopics[myTopicsIndex].lessons[lessonIndex].correct > 0) {
                    myTopics[myTopicsIndex].lessons[lessonIndex].correct -= 1;
                }
                myTopics[myTopicsIndex].lessons[lessonIndex].questions[questionIndex] = {id: questionID, correct}
            } else {
                if (correct) {
                    myTopics[myTopicsIndex].lessons[lessonIndex].correctInARow += 1;
                    myTopics[myTopicsIndex].lessons[lessonIndex].correct += 1;
                } else if (!correct && myTopics[myTopicsIndex].lessons[lessonIndex].correct > 0) {
                    myTopics[myTopicsIndex].lessons[lessonIndex].correct -= 1;
                }
                myTopics[myTopicsIndex].lessons[lessonIndex].questions.push({
                    id: questionID,
                    correct,
                })
            }

            if (correct) {
                if (myTopics[myTopicsIndex].lessons[lessonIndex].correctInARow === parseInt(rule[0])) {
                    myTopics[myTopicsIndex].lessons[lessonIndex].mastered = true;
                    if (path === '/ai') {
                        dispatch(setFetchNextAIQuestions(true))
                    }
                    let masterLessons = 0;
                    myTopics[myTopicsIndex].lessons.forEach((l:any) => {if (l.mastered) masterLessons += 1});

                    //TODO: creo que topic.totalTopicLessons no viene bien
                    if (masterLessons === topic.totalTopicLessons && !myTopics[myTopicsIndex].mastered) {
                        myTopics[myTopicsIndex].mastered = true;
                        dispatch(levelUp());
                    }
                }
            }

            if ((answeredIndex / parseInt(rule[1])) % 1 == 0) {
                myTopics[myTopicsIndex].lessons[lessonIndex].correctInARow = 0;
            }
            // **************************************************************************************
        } else {
            myTopics[myTopicsIndex].lessons.push({
                rule: topic.rule,
                mastered: false,
                UID: topic.lessonUID,
                description: topic.lessonDescription,
                lessonName: topic.lessonName,
                correctInARow: correct ? 1 : 0,
                correct: correct ? 1 : 0,
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
                    rule: topic.rule,
                    mastered: false,
                    UID: topic.lessonUID,
                    description: topic.lessonDescription,
                    lessonName: topic.lessonName,
                    correctInARow: correct ? 1 : 0,
                    correct: correct ? 1 : 0,
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

