import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDtQgOn9rEp3QPSnj3JbZ9DOlt-OPsEX1I",
    authDomain: "vratchat.firebaseapp.com",
    databaseURL: "https://vratchat.firebaseio.com",
    projectId: "vratchat",
    storageBucket: "vratchat.appspot.com",
    messagingSenderId: "334011232113",
    appId: "1:334011232113:web:e8f13db43711727ab550d0",
    measurementId: "G-Z77N2HJBZK"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth , provider};