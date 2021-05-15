import firebase from'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBNY4ZFxYV8lG0BNM9IXFq19HAAuQ1me5M",
  //apiKey: "AIzaSyBNY4ZFxYV8lG0BNM9IXFq19HAAuQ1me5M",
  authDomain: "recetas-saludables-69ee9.firebaseapp.com",
  //authDomain: "fireabase-recetas-saludables.firebaseapp.com",
  projectId: "recetas-saludables-69ee9",
 //projectId: "fireabase-recetas-saludables",
  storageBucket: "recetas-saludables-69ee9.appspot.com",
  //storageBucket: "fireabase-recetas-saludables.appspot.com",
  messagingSenderId: "265049758167",
  //messagingSenderId: "421864252074",
  appId: "1:265049758167:web:4926c4523a49c439d21392"
  //appId: "1:421864252074:web:39484e37a241d3b4b466d3"
};
// Initialize Firebase
const fb=firebase.initializeApp(firebaseConfig);
//const storage=firebase.storage();
export const db=fb.firestore();



