import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase.config";

export const loginUser = async (email, password) => {
  try {
    // No v9+, passamos 'auth' como primeiro argumento
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error.code, error.message);
    throw error;
  }
};
export const createUser = async (email, password) => {
  try {
    // Note que a função é chamada passando o 'auth' como primeiro argumento
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error creating user:", error.code, error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    // Note a diferença: signOut(auth) em vez de auth.signOut()
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao deslogar:", error.code, error.message);
    throw error;
  }
};

export const getAuthState = async (callback) => {
  return onAuthStateChanged(auth, callback);
};
