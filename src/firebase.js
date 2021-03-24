import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9dSw2cBWu0PsPQgUkgxaWcFeCUBC8Q4c",
    authDomain: "fashup-6031a.firebaseapp.com",
    projectId: "fashup-6031a",
    storageBucket: "fashup-6031a.appspot.com",
    messagingSenderId: "267892476432",
    appId: "1:267892476432:web:75a13a2aa80d88e1df1895",
    measurementId: "G-4G45HZZSK0"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;