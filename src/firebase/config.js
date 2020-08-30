import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
// the asteric _* means , import everything
//

// Your web app's Firebase configuration
//-----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyCsLVXPG8BXTAVIg_oOiQLp2yUR0zWDzKE",
  authDomain: "melitta-firegram.firebaseapp.com",
  databaseURL: "https://melitta-firegram.firebaseio.com",
  projectId: "melitta-firegram",
  storageBucket: "melitta-firegram.appspot.com",
  messagingSenderId: "789625095364",
  appId: "1:789625095364:web:5db97b10932377ce29f591",
};
//-----------------------------------------
//
//
//-----------------------------------------
// HERE WE ARE INITIALIZING THE *** APP ***
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//-----------------------------------------
//
//
//-----------------------------------------
// HERE WE INITIALIZE the 2 kind of SERVICES:
// STORAGE SERVICE AND THE FIRESTORE SERVICE
//
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
// the Time stamp the file is going to have, so that we cn organize it chronologically
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// So whenever you want to create a new time stamp you can just invoke the variable function: timestamp
// because this is a function: timestamp that invokes this:  firebase.firestore.FieldValue.serverTimestamp;
//  Now EXPORT the timestamp, line 43 : timestamp };
// go back to use storaje.js
//-----------------------------------------
//
//EXPORT IT
//
export { projectStorage, projectFirestore, timestamp };
