import * as TYPES from "./types";

export const clearPerformanceData = () => {
    return {
        type: TYPES.CLEAR_PERFORMANCE_DATA
    };
};

export const setPerformanceCode = (data: number) => {
    return {
        type: TYPES.SET_PERFORMANCE_CODE,
        payload: data
    }
}

export const setIsFetchingPerformanceData = (data: boolean) => {
    return {
        type: TYPES.SET_IS_FETCHING_PERFORMANCE_DATA,
        payload: data
    }
}