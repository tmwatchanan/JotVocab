import firebase from 'firebase';
import firebaseui from 'firebaseui';

const config = {
    apiKey: "AIzaSyDI5lMf2oE_5RlUb0hVt-cBn3AfAy1Yynk",
    authDomain: "note-app-83bf9.firebaseapp.com",
    databaseURL: "https://note-app-83bf9.firebaseio.com",
    projectId: "note-app-83bf9",
    storageBucket: "note-app-83bf9.appspot.com",
    messagingSenderId: "75507176619"
};

export const FBApp = firebase.initializeApp(config);
export const FBUIApp = new firebaseui.auth.AuthUI(firebase.auth(FBApp));