// src/firebase/authFunctions.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./index";
import logger from '../utils/logger';

export const firebaseSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    logger.info("User signed up:", userCredential.user.email);
    return { success: true, user: userCredential.user };
  } catch (error) {
    logger.error("Error signing up:", error.message);
    return { success: false, error: error.message };
  }
};

export const firebaseSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    logger.info("User signed in:", userCredential.user.email);
    return { success: true, user: userCredential.user };
  } catch (error) {
    logger.error("Error signing in:", error.message);
    return { success: false, error: error.message };
  }
};

export const firebaseGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    logger.info("User signed in with Google:", result.user.email);
    return { success: true, user: result.user };
  } catch (error) {
    logger.error("Error signing in with Google:", error.message);
    if (error.code === "auth/popup-closed-by-user") {
      return { success: false, error: "Google sign-in popup was closed." };
    }
    return { success: false, error: error.message };
  }
};

export const firebaseGoogleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    logger.info("User signed up with Google:", result.user.email);
    return { success: true, user: result.user };
  } catch (error) {
    logger.error("Error signing up with Google:", error.message);
    if (error.code === "auth/popup-closed-by-user") {
      return { success: false, error: "Google sign-up popup was closed." };
    }
    return { success: false, error: error.message };
  }
};

export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
    logger.info("User signed out.");
    return { success: true };
  } catch (error) {
    logger.error("Error signing out:", error.message);
    return { success: false, error: error.message };
  }
};

export { onAuthStateChanged };
