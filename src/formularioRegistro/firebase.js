import firebase from'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAACvu3rXFONJZpZUO582-8Y8PDhHfZFAc",
  authDomain: "recetassaludables-1af0b.firebaseapp.com",
  projectId: "recetassaludables-1af0b",
  storageBucket: "recetassaludables-1af0b.appspot.com",
  messagingSenderId: "181904520362",
  appId: "1:181904520362:web:04513e08be2eb4d2274cd3"
};
// Initialize Firebase
const fb=firebase.initializeApp(firebaseConfig);

export const db=fb.firestore();

