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

const Provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {

        let user = null;

        await signInWithPopup(auth, Provider)
        .then((result) => {
            user = result.user
        })
        .catch((err) => {
            console.log(err);
            
        })

        return user;
}