import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
const signoutUser = () => signOut(auth);
const signInWithGoogle = () => signInWithPopup(auth, provider);
const getCurrentUser = () => auth.currentUser;
const listenToAuthChanges = (callback) => onAuthStateChanged(auth, callback);

const authentication = {
    auth,
    signUp,
    signIn,
    signoutUser,
    signInWithGoogle,
    getCurrentUser,
    listenToAuthChanges
}
export default authentication;
