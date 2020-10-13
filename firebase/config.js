import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxHILh6cv0zFAw-luAelQXSEbqpQ4tqRM",
  authDomain: "annual-school-census.firebaseapp.com",
  databaseURL: "https://annual-school-census.firebaseio.com",
  projectId: "annual-school-census",
  storageBucket: "annual-school-census.appspot.com",
  messagingSenderId: "47101596260",
  appId: "1:47101596260:web:8d449aef52186d931e4571",
  measurementId: "G-LGVGLNFHVX",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
