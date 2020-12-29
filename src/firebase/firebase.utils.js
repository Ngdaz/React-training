import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBF5c_b_w-imNa__dx-iqv26s5L5UboeE8",
    authDomain: "crwn-db-d2134.firebaseapp.com",
    projectId: "crwn-db-d2134",
    storageBucket: "crwn-db-d2134.appspot.com",
    messagingSenderId: "636916029933",
    appId: "1:636916029933:web:d394758ef6dea8bb9f6fe4",
    measurementId: "G-4VFFCN450S"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try{
          await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
          })
        } catch(error){
            console.log('err creating user',error.message); 

        }
    }
    return userRef 
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
