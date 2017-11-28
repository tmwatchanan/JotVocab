import firebase from 'firebase';
import firebaseui from 'firebaseui';

const config = {
    apiKey: "AIzaSyAE_63kvd7GIN_KfPnUmo4CooWFaEWVlYQ",
    authDomain: "jotvocab.firebaseapp.com",
    databaseURL: "https://jotvocab.firebaseio.com",
    projectId: "jotvocab",
    storageBucket: "jotvocab.appspot.com",
    messagingSenderId: "715646011817"
};

export const FBApp = firebase.initializeApp(config);
export const FBUIApp = new firebaseui.auth.AuthUI(firebase.auth(FBApp));