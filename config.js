import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyC-6-ddQFn_Ag5U_3TApCPfQng3MGIx5cg",
  authDomain: "vikramchk-1a978.firebaseapp.com",
  databaseURL: "https://vikramchk-1a978.firebaseio.com",
  projectId: "vikramchk-1a978",
  storageBucket: "vikramchk-1a978.appspot.com",
  messagingSenderId: "1042789840360",
  appId: "1:1042789840360:web:f275bbe337dac5e25d605d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();