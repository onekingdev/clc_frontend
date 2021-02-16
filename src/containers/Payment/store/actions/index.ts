import {SET_CLIENT_SECRET} from "./types";
import api from "../../../../services/apiMiddleware";

export const setClientSecret = (data: string) => {
    return {
        type: SET_CLIENT_SECRET,
        payload: data
    }
}

export const fetchPaymentIntent = (items: {id: string}[]) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        const response = await api.post('paymentIntent', {items});
        dispatch(setClientSecret(response.clientSecret));
    } catch (e) {

    } finally {

    }
}