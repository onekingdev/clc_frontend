import firebase from 'firebase/app';
import 'firebase/auth';
let app: firebase.app.App = (() => {
    switch (process.env.NODE_ENV as 'local' | 'development' | 'production') {
        case 'production':
            return firebase.initializeApp( {
                    apiKey: "AIzaSyDjDLYRdraVPdvJDV6GjpWfaiRM0XJHrys",
                    authDomain: "chipleadercoaching-webapp.firebaseapp.com",
                    databaseURL: "https://chipleadercoaching-webapp.firebaseio.com",
                    projectId: "chipleadercoaching-webapp",
                    storageBucket: "chipleadercoaching-webapp.appspot.com",
                    messagingSenderId: "446390346165",
                    appId: "1:446390346165:web:30ad9553d10dbb757ff9fc",
                    measurementId: "G-MJW9SW2Z64",
            });
        case 'local':
        case 'development':
        default:
            return firebase.initializeApp({
                    apiKey: "AIzaSyBRoGNgYCTGL7jZnQZ_wDq2OkibJP_L-gE",
                    authDomain: "devenvclc.firebaseapp.com",
                    projectId: "devenvclc",
                    storageBucket: "devenvclc.appspot.com",
                    messagingSenderId: "16835516799",
                    appId: "1:16835516799:web:596ba8345ecee4353c624a",
                    measurementId: "G-D03FJBHMSY"
            });
    }
})();

// const email = new firebase.auth.EmailAuthProvider();

export {app};