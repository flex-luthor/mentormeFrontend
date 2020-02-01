import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyC8xyK04C5hsfCnLDk8FHie3uEWTrnCaBE",
    authDomain: "mentorme-efa7c.firebaseapp.com",
    databaseURL: "https://mentorme-efa7c.firebaseio.com",
    projectId: "mentorme-efa7c",
    storageBucket: "mentorme-efa7c.appspot.com",
    messagingSenderId: "310781077201",
    appId: "1:310781077201:web:3419ec77c4e7bd18b407f0",
    measurementId: "G-5D66VSJDGW"
};
var fire = firebase.initializeApp(config);
export default fire;