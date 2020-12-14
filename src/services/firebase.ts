import * as firebase from 'firebase';
import 'firebase/auth';

const app = firebase.initializeApp( {
    apiKey: "AIzaSyAw02DE4jTHes1hlzzXLXSIE_jI-27DVV8",
    authDomain: "clc-poker.firebaseapp.com",
    databaseURL: "https://clc-poker.firebaseio.com",
    projectId: "clc-poker",
    storageBucket: "clc-poker.appspot.com",
    messagingSenderId: "104936674083",
    appId: "1:104936674083:web:43e8f3854a8b7cdcf4b296",
    measurementId: "G-MJW9SW2Z64"
});

// const email = new firebase.auth.EmailAuthProvider();

export {app};