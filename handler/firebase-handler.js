import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase-config";

export function register(email, password) {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                resolve(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                reject({errorCode, errorMessage});
            });
    });
}

export function login(email, password) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                resolve(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                reject({errorCode, errorMessage});
            });
    });
}
