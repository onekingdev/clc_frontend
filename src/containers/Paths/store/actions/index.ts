import * as TYPES from './types';
import {IPathsList} from '../../interfaces';
import api from '../../../../services/apiMiddleware';
import {apiPathsEndpoint} from '../../../../helpers/constants';
import {app} from '../../../../services/firebase';

export const clearPathsData = () => {
    return {
        type: TYPES.CLEAR_PATHS_DATA
    };
};

export const setPathsCode = (data: number) => {
    return {
        type: TYPES.SET_PATHS_CODE,
        payload: data
    }
}

export const setIsFetchingPathsData = (data: boolean) => {
    return {
        type: TYPES.SET_IS_FETCHING_PATHS_DATA,
        payload: data
    }
}

export const setPathsList = (data: IPathsList) => {
    return {
        type: TYPES.SET_PATHS_LIST,
        payload: data
    };
}

export const setSelectedTopic = (data: any) => {
    return {
        type: TYPES.SET_SELECTED_TOPIC,
        payload: data
    };
}

export const getPathsList = (myTopics: any) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        dispatch(setIsFetchingPathsData(true));
        const email = await getState().authState.user.email;
        const list = await api.post(apiPathsEndpoint, {myTopics, email});
        dispatch(setPathsList(list));
    } catch (e) {
        dispatch(setPathsCode(e));
    } finally {
        dispatch(setIsFetchingPathsData(false));
    }
}

//TODO: add backend transaction
export const buyItem = (item: any, callback: (data: any) => void) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const user = await getState().authState.user;
    const realtimeChips = await getState().screenTemplateState.chips;
    const realtimeTickets = await getState().screenTemplateState.tickets;
    const myTopics = await getState().screenTemplateState.myTopics;

    if (item.masteredLevel <= user.masteredLevel) {
        if (item.tickets <= realtimeTickets) {
            if (item.chips <= realtimeChips) {
                const chips = realtimeChips - item.chips;
                const tickets = realtimeTickets - item.tickets;

                await app
                    .firestore()
                    .collection('users')
                    .doc(user.stringID)
                    .update('chips', chips)

                await app
                    .firestore()
                    .collection('users')
                    .doc(user.stringID)
                    .update('tickets', tickets)

                myTopics.push({
                    id: item.id,
                    UID: item.UID,
                    name: item.name,
                    masteredLevel: item.masteredLevel,
                    chips: item.chips,
                    tickets: item.tickets,
                    status: item.status,
                    mastered: false,
                    lessons: []
                });

                await app
                    .firestore()
                    .collection('users')
                    .doc(user.stringID)
                    .update('myTopics', myTopics)

                callback({correct: true, msg: 200});



            } else {
                callback({correct: false, msg: 501});
            }
        } else {
            callback({correct: false, msg: 502})
        }
    } else {
        callback({correct: false, msg: 503})
    }
}