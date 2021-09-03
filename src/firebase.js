// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL5af4XOZpDnaHGeOJlYSRh5iT9B5U_44",
  authDomain: "linktree-test-1.firebaseapp.com",
  databaseURL: "https://linktree-test-1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "linktree-test-1",
  storageBucket: "linktree-test-1.appspot.com",
  messagingSenderId: "106168413912",
  appId: "1:106168413912:web:c1f21683a567998f18f1ad"
};

// function initFirebase() {
//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
//   }
// }

// initFirebase()
// export {firebase}
firebase.initializeApp(firebaseConfig);
export default firebase
