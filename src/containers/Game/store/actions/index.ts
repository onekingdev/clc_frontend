import * as TYPES from './types';
import * as RESULTS_ACTIONS from '../../../Results/store/actions';
import {IQuestions} from '../../interfaces';
import {
    apiSaveEarnings,
    apiGetQuestions,
    apiGetAIQuestions,
    apiLevelUp,
    apiGetAIAssessment
} from '../../../../helpers/constants';
import api from '../../../../services/apiMiddleware';
import {app} from "../../../../services/firebase";
import {setUserData} from "../../../Authentication/store/actions";

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

export const fetchGameData = () => async(
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
            const myTopics = await getState().screenTemplateState.myTopics; // todo: fix this shit ...........
            let questions = await api.post(apiGetAIAssessment,{myTopics});
            if (questions) {
                dispatch(setQuestions(questions));
                dispatch(RESULTS_ACTIONS.setChipsEarned(questions[0].chipsEarned));
                dispatch(RESULTS_ACTIONS.setTicketsEarned(questions[0].ticketsEarned));
                dispatch(RESULTS_ACTIONS.setTotalQuestions(questions[0].totalQuestions));
                dispatch(RESULTS_ACTIONS.setCorrectQuestions(questions[0].correctQuestions));
            }
        } else {
            const user = await getState().authState.user;
            const myTopics = await getState().screenTemplateState.myTopics; // todo: fix this shit ...........

            let questions = await api.post(apiGetAIQuestions, {myTopics, user});
            if (questions) dispatch(setQuestions(questions));
        }
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

export const levelUp = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const user = await getState().authState.user;

    let newUserData = await api.post(apiLevelUp, {id: user.id});

    dispatch(setUserData(newUserData));
}

export const updateMyTopics = (questionID: number, correct: boolean, topicData: any) => async(
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
            const questionIndex = myTopics[myTopicsIndex].lessons[lessonIndex].questions.findIndex((q: any) => q.id === questionID)
            //***************************************************************************************
            if (questionIndex !== -1) {
                myTopics[myTopicsIndex].lessons[lessonIndex].questions[questionIndex] = {id: questionID, correct}

            } else {
                myTopics[myTopicsIndex].lessons[lessonIndex].questions.push({
                    id: questionID,
                    correct,
                })
            }

            if (correct) {
                myTopics[myTopicsIndex].lessons[lessonIndex].correctInARow += 1;
                const rule = myTopics[myTopicsIndex].lessons[lessonIndex].rule.split('/');

                if (myTopics[myTopicsIndex].lessons[lessonIndex].correctInARow === parseInt(rule[0])) {
                    myTopics[myTopicsIndex].lessons[lessonIndex].mastered = true;
                    dispatch(setFetchNextAIQuestions(true))
                    let counter = 0;
                    myTopics[myTopicsIndex].lessons.forEach((l:any) => {if (l.mastered) counter++});

                    if (// TODO: fix this shit .........................................
                        myTopics[myTopicsIndex].name === 'Preflop' && counter > 22
                        || myTopics[myTopicsIndex].name === 'Flop' && counter > 34
                        || myTopics[myTopicsIndex].name === 'Turn' && counter > 34
                        || myTopics[myTopicsIndex].name === 'River' && counter > 44
                        || myTopics[myTopicsIndex].name === 'Heads Up Strategy' && counter > 3
                    ) { //counter === topic.totalTopicLessons
                        myTopics[myTopicsIndex].mastered = true;
                        dispatch(levelUp());
                    }
                }
            } else {
                myTopics[myTopicsIndex].lessons[lessonIndex].correctInARow = 0;
            }
            // **************************************************************************************
        } else {
            myTopics[myTopicsIndex].lessons.push({
                rule: topic.rule,
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
                    rule: topic.rule,
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

