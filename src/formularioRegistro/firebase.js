import firebase from'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDXTjxHxvzXwkaTYSWDo2HY0-e8GwQgoFY",
  authDomain: "respaldo-e5d0a.firebaseapp.com",
  projectId: "respaldo-e5d0a",
  storageBucket: "respaldo-e5d0a.appspot.com",
  messagingSenderId: "967768364943",
  appId: "1:967768364943:web:4501cf30059ee7e75dddfa"
};
// Initialize Firebase
const fb=firebase.initializeApp(firebaseConfig);

export const db=fb.firestore();

