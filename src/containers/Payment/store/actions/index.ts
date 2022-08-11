import {SET_CLIENT_SECRET} from "./types";
import api from "../../../../services/apiMiddleware";
import {
    apiGetUserByEmail,
    apiPaymentSubscription,
    apiUpdatePaymentDetails,
    apiCancelSubscription,
    apiReActiveSubscription,
} from "../../../../helpers/constants";
import * as AUTH_TYPES from '../../../Authentication/store/actions'
import Results from "../../../Results";

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

export const fetchPaymentSubscription = (email: string, paymentMethod: any, subscriptionType: any, subscriptionInterval: any, rewardfulId: string, reactivate: boolean) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        console.log("fetch payment subscription", rewardfulId)
        return await api.post(apiPaymentSubscription, {email, paymentMethod, subscriptionType, subscriptionInterval, rewardfulId, reactivate});
    } catch (e) {

    } finally {

    }
}

export const cancelSubscription = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    let result={success: false, data: null, message: null}
    try {
        let user = getState().authState.user;

        dispatch(AUTH_TYPES.setIsFetchingAuthentication(true))
        const {success, data, message} = await api.post(apiCancelSubscription, {id: user.id});
        
        if (success) {
            if (data.scheduled) {
                user.payment['canceled'] = true;
            } else if (data.cancel_at_period_end) {
                user.payment['canceled'] = true;
                user.payment['subscription'] = new Date(data.current_period_end * 1000);
            } else {
                alert(message);
            }
        } else {
            alert(message);
        }
        dispatch(AUTH_TYPES.setUserData(user));
        dispatch(AUTH_TYPES.setIsFetchingAuthentication(false))
        result.success = true;
        result.data = data;
    } catch (e: any) {
        dispatch(AUTH_TYPES.setIsFetchingAuthentication(false))
        alert('Error')
        result.success = false;
        result.message = e.raw.message;
    } finally {

    }
    return result;
}

export const reActiveSubscription = () => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    let result = {success:false,data:null,message:null}
    try {
        let user = getState().authState.user;

        dispatch(AUTH_TYPES.setIsFetchingAuthentication(true))
        const {success, data, message} = await api.post(apiReActiveSubscription, {id: user.id});
        // const {cancel_at_period_end, current_period_end} = await api.post(apiReActiveSubscription, {id: user.id});
        if (success && !data.cancel_at_period_end){
            user.payment['canceled'] = false;
            user.payment['subscription'] = new Date(data.current_period_end * 1000);
            dispatch(AUTH_TYPES.setUserData(user));
            dispatch(AUTH_TYPES.setIsFetchingAuthentication(false))
        } else {
            alert(message)
            dispatch(AUTH_TYPES.setIsFetchingAuthentication(false))
        }
        result.success = true;
        result.data = data;
        
    } catch (e:any) {
        result.success = false;
        result.message = e.raw.message;
        alert('Error')
    } finally {

    }
    return result;
}

export const updatePaymentDetails = (paymentMethod: any) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    try {
        const user = getState().authState.user;
        return await api.post(apiUpdatePaymentDetails, {id: user.id, newPaymentMethod: paymentMethod, rewardfulId: user.rewardfulId});
    } catch (e) {
        alert('Error')
    } finally {

    }
}