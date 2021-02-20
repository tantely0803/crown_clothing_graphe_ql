import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA6cKZxF3GMT8x6rtv3iDZdDNZF6t6-7kA",
    authDomain: "crwn-db-c580b.firebaseapp.com",
    databaseURL: "https://crwn-db-c580b.firebaseio.com",
    projectId: "crwn-db-c580b",
    storageBucket: "crwn-db-c580b.appspot.com",
    messagingSenderId: "778592273812",
    appId: "1:778592273812:web:dcf371c3f6b866bd0b3b81"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
