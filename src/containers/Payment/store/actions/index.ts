import {SET_CLIENT_SECRET} from "./types";
import api from "../../../../services/apiMiddleware";
import {getUserByEmail} from "../../../../helpers/constants";
import {setUserData} from "../../../Authentication/store/actions";

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

export const fetchUpdatedPaymentData = (email: string, callback: () => void) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        const user = await api.post(getUserByEmail, email);
        dispatch(setUserData(user));
        setTimeout(() => callback(), 500);
    } catch (e) {
        alert('user not found')
    } finally {

    }
}