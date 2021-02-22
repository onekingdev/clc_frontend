import * as TYPES from "./types";
import api from "../../../../services/apiMiddleware";
import {apiGetEvents, apiGetSpotlight, apiGetWeeklyHandBreakdown} from "../../../../helpers/constants";

export const setEvents = (data: any) => {
    return {
        type: TYPES.SET_EVENTS,
        payload: data
    }
}

export const setContentSpotlight = (data: any) => {
    return {
        type: TYPES.SET_CONTENT_SPOTLIGHT,
        payload: data
    }
}

export const setWeeklyHandBreakdown = (data: any) => {
    return {
        type: TYPES.SET_WEEKLY_HAND_BREAKDOWN,
        payload: data
    }
}

export const setIsFetchingEvents = (data: boolean) => {
    return {
        type: TYPES.SET_IS_FETCHING_EVENTS,
        payload: data
    }
}

export const setIsFetchingCards = (data: boolean) => {
    return {
        type: TYPES.SET_IS_FETCHING_CARDS,
        payload: data
    }
}

export const fetchEvents = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        dispatch(setIsFetchingEvents(true));
        const events = await api.get(apiGetEvents);
        dispatch(setEvents(events));
    } catch (e) {
        console.log(e);
    } finally {
        dispatch(setIsFetchingEvents(false));
    }
}

export const fetchHomeCards = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        dispatch(setIsFetchingCards(true));
        const contentSpotlight = await api.get(apiGetSpotlight);
        const weeklyHandBreakdown = await api.get(apiGetWeeklyHandBreakdown);
        console.log(weeklyHandBreakdown,'................0000000000............')
        dispatch(setContentSpotlight(contentSpotlight));
        dispatch(setWeeklyHandBreakdown(weeklyHandBreakdown));
    } catch (e) {
        console.log(e);
    } finally {
        dispatch(setIsFetchingCards(false));
    }
}