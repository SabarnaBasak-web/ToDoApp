import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBYAQSy9d-vCNmSDKFFPi0EVHP8HWb2C6o",
    authDomain: "reacttodoapp-55244.firebaseapp.com",
    databaseURL: "https://reacttodoapp-55244.firebaseio.com",
    projectId: "reacttodoapp-55244",
    storageBucket: "reacttodoapp-55244.appspot.com",
    messagingSenderId: "956359011387",
    appId: "1:956359011387:web:475ae84029216d3b4d401e"
});

const db = firebaseApp.firestore();

export default db;