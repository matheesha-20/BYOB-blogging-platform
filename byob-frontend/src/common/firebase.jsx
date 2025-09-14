import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCZTremL5MMZCjhoWjkui1YERaVQQMtZZ4",
  authDomain: "byob-blogging-web.firebaseapp.com",
  projectId: "byob-blogging-web",
  storageBucket: "byob-blogging-web.firebasestorage.app",
  messagingSenderId: "579298177854",
  appId: "1:579298177854:web:a20ab7b22bb30f419fb26f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const authWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const idToken = await user.getIdToken(); 

  return {
    access_token: idToken,
    profile: {
      email: user.email,
      name: user.displayName,
      picture: user.photoURL
    }
  };
};
