import firebase from'firebase/app'
import 'firebase/firestore'


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDM6kernnpRgESuYKwH9tyZHLNYLSjw9fA",
  authDomain: "fireabase-recetas-saludables.firebaseapp.com",
  projectId: "fireabase-recetas-saludables",
  storageBucket: "fireabase-recetas-saludables.appspot.com",
  messagingSenderId: "421864252074",
  appId: "1:421864252074:web:39484e37a241d3b4b466d3"
};
// Initialize Firebase
const fb=firebase.initializeApp(firebaseConfig);
//const storage=firebase.storage();
export const db=fb.firestore();

