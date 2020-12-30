import {app} from '../../../../services/firebase';
import * as TYPES from './types';

const setTickets = (data: number) => {
    return {
        type: TYPES.SET_TICKETS,
        payload: data
    }
}

const setChips = (data: number) => {
    return {
        type: TYPES.SET_CHIPS,
        payload: data
    }
}

const setFavorites = (data: object[]) => {
    return {
        type: TYPES.SET_FAVORITES,
        payload: data
    }
}

const setMyTopics = (data: object[]) => {
    return {
        type: TYPES.SET_MY_TOPICS,
        payload: data
    }
}

export const getRealtimeUserData = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const uid = await getState().authState.user.stringID;

    await app
        .firestore()
        .collection('users')
        .doc(uid)
        .onSnapshot({
            next: (snapshot: any) => {
                dispatch(setChips(snapshot.data().chips));
                dispatch(setTickets(snapshot.data().tickets));
                dispatch(setMyTopics(snapshot.data().myTopics));
                dispatch(setFavorites(snapshot.data().favorites));
            },
        });
}