import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtlDbAdA3AGjKsW6BaLCjBxH8T_6D2o0E",
  authDomain: "e-accouting.firebaseapp.com",
  projectId: "e-accouting",
  storageBucket: "e-accouting.appspot.com",
  messagingSenderId: "489269127279",
  appId: "1:489269127279:web:4cdbd2e84031dd7c64c59a",
  measurementId: "G-R6XQF77LTC",
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }