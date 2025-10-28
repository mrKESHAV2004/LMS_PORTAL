import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebaseapp from "./firebase";

const auth = getAuth(firebaseapp);
const db = getFirestore(firebaseapp);
const provider = new GoogleAuthProvider();
let user = null;

const setUser = (newUser) => {
  user = newUser;
};

const signUp = async (email, password, username, dob) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userData = {
    email,
    username,
    isEducator: false,
    createdAt: new Date()
  };

  // Only include dob if it's provided and not undefined
  if (dob !== undefined) {
    userData.dob = dob;
  }

  await setDoc(doc(db, "users", user.uid), userData);
  setUser(userCredential);
  return userCredential;
};

const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  setUser(userCredential);
  return userCredential;
};

const signoutUser = () => signOut(auth);

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const userDoc = doc(db, "users", user.uid);
  await setDoc(userDoc, {
    email: user.email,
    username: user.displayName,
    isEducator: false,
    createdAt: new Date()
  }, { merge: true });
  setUser(result);
  return result;
};

const getCurrentUser = () => user;

const listenToAuthChanges = (callback) => onAuthStateChanged(auth, callback);

const updateUserData = async (uid, updates) => {
  const userDoc = doc(db, "users", uid);
  await setDoc(userDoc, updates, { merge: true });
};

const authentication = {
    auth,
    signUp,
    signIn,
    signoutUser,
    signInWithGoogle,
    getCurrentUser,
    listenToAuthChanges
};

export default authentication;
