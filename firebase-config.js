import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4GqWjGCG8qtsWBnDxBAGep9qIT2JMKA4",
    authDomain: "halo-base.firebaseapp.com",
    projectId: "halo-base",
    storageBucket: "halo-base.appspot.com",
    messagingSenderId: "218350299706",
    appId: "1:218350299706:web:c7357d69fe632f7736a303"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
