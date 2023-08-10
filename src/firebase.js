import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj-N2KZynSTnKNf0fLdo7pMkwjlEutA1c",
  authDomain: "lakeland-kenya.firebaseapp.com",
  projectId: "lakeland-kenya",
  storageBucket: "lakeland-kenya.appspot.com",
  messagingSenderId: "698610019208",
  appId: "1:698610019208:web:b932e3fba345846e03e83d",
  measurementId: "G-MBVQG3405S"
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