import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZvNwGFKcDRmZg3NWOUyuoSFSzRVYVxMA",
  authDomain: "lakeland-development.firebaseapp.com",
  projectId: "lakeland-development",
  storageBucket: "lakeland-development.appspot.com",
  messagingSenderId: "600087097667",
  appId: "1:600087097667:web:3f6e31a7b1fe51f183fff6",
  measurementId: "G-EM429HXVRC"
};

  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const facebookProvider = new firebase.auth.FacebookAuthProvider();
   const TwitterProvider = new firebase.auth.TwitterAuthProvider();
   const GithubProvider = new firebase.auth.GithubAuthProvider();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
  export  {auth};
  export  {storage};