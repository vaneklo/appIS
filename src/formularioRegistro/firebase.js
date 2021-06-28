import firebase from'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDOAUbyEd5-NTHR2fuTd-PyUgnwd-dmvPE",
  authDomain: "recetassaludablesfinal.firebaseapp.com",
  projectId: "recetassaludablesfinal",
  storageBucket: "recetassaludablesfinal.appspot.com",
  messagingSenderId: "267659076058",
  appId: "1:267659076058:web:3ba088ebb0b16116dde0e3"
};
// Initialize Firebase
const fb=firebase.initializeApp(firebaseConfig);

export const db=fb.firestore();

