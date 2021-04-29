import {SET_CLIENT_SECRET} from "./types";
import api from "../../../../services/apiMiddleware";
import {
    apiGetUserByEmail,
    apiPaymentSubscription,
    apiUpdatePaymentDetails,
    apiCancelSubscription
} from "../../../../helpers/constants";
import * as AUTH_TYPES from '../../../Authentication/store/actions'

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

export const fetchPaymentSubscription = (email: string, paymentMethod: any, memberType: any) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
       
        return await api.post(apiPaymentSubscription, {email, paymentMethod,memberType});
    } catch (e) {

    } finally {

    }
}

export const cancelSubscription = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        let user = getState().authState.user;

        dispatch(AUTH_TYPES.setIsFetchingAuthentication(true))
        const {status} = await api.post(apiCancelSubscription, {id: user.id});
        if (status === 'canceled')
            user.payment['canceled'] = true;

        dispatch(AUTH_TYPES.setUserData(user));
        dispatch(AUTH_TYPES.setIsFetchingAuthentication(false))
    } catch (e) {
        alert('Error')
    } finally {

    }
}

export const updatePaymentDetails = (paymentMethod: any) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        const user = getState().authState.user;
        return await api.post(apiUpdatePaymentDetails, {id: user.id, newPaymentMethod: paymentMethod});
    } catch (e) {
        alert('Error')
    } finally {

    }
}