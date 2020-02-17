import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAnWuL9d1PVM79rlD0-aWOyp-eRKq1Asz0",
    authDomain: "todo-list-b4fe4.firebaseapp.com",
    databaseURL: "https://todo-list-b4fe4.firebaseio.com",
    projectId: "todo-list-b4fe4",
    storageBucket: "todo-list-b4fe4.appspot.com",
    messagingSenderId: "404044215113",
    appId: "1:404044215113:web:7aaff00481fefa45332098"
};
const fire = firebase.initializeApp(firebaseConfig)
export default fire