import {app} from "../services/firebase";
import moment from 'moment';
import firebase from "firebase/app";
import 'firebase/firestore'
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const endOfMonthHandler = async (uid: string) => {
    const user: any = await app
        .firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((doc: any) => doc.data());

    if (moment().format('MM') !== moment.unix(user.dailyChallenge.lastUpdate).format('MM')) {
        user.dailyChallenge.days = [];
        user.dailyChallenge.days.push(parseInt(moment().format('DD')));

        await app
            .firestore()
            .collection('users')
            .doc(uid)
            .update('dailyChallenge', user.dailyChallenge)
    }
}

export const endOfDayHandler = async (uid: string) => {
    const user: any = await app
        .firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((doc: any) => doc.data());

    const date1 = moment().format('DD/MM');
    const date2 = moment.unix(user.dailyChallenge.lastUpdate).format('DD/MM');

    if (date1 !== date2) {
        if ((parseInt(moment().format('DD')) - parseInt(moment.unix(user.dailyChallenge.lastUpdate).format('DD'))) > 1 && user.dailyChallenge.questions > 10) {
            user.dailyChallenge.questions -= 5;
        } else if ((parseInt(moment().format('DD')) - parseInt(moment.unix(user.dailyChallenge.lastUpdate).format('DD'))) === 1) {
            user.dailyChallenge.questions += 5;
        }
        user.dailyChallenge.lastUpdate = timestamp;
        user.dailyChallenge.counter = 0;

        await app
            .firestore()
            .collection('users')
            .doc(uid)
            .update('dailyChallenge', user.dailyChallenge)
    }
}

export const  validateEmail = (email: string) => {
    if (!email) return false;
    email = email.trim();
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const detectBrowser = () => {
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
        return 'Opera';
    } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
        return 'Chrome';
    } else if(navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
        return 'Firefox';
    } else if((navigator.userAgent.indexOf("MSIE") != -1 )) {
        return 'IE';//crap
    }

    return 'Unknown';
}