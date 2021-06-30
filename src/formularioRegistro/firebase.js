import firebase from'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCXAlNbHIpxR3NosQ96F-sIsLlnn_zctUc",
    authDomain: "base-2b48c.firebaseapp.com",
    projectId: "base-2b48c",
    storageBucket: "base-2b48c.appspot.com",
    messagingSenderId: "151076658992",
    appId: "1:151076658992:web:225b9d86d9fdbe657d32f5"
};
// Initialize Firebase
const fb=firebase.initializeApp(firebaseConfig);

export const db=fb.firestore();

