// src/firebase/authFunctions.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider, // Import GoogleAuthProvider
  signInWithPopup,    // Import signInWithPopup
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './index'; // Import the initialized auth instance from src/firebase/index.js

export const firebaseSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error signing up:", error.message);
    return { success: false, error: error.message };
  }
};

export const firebaseSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error signing in:", error.message);
    return { success: false, error: error.message };
  }
};

export const firebaseGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  // You can add scopes if needed, e.g., provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  try {
    const result = await signInWithPopup(auth, provider); // Use signInWithPopup
    console.log("User signed in with Google:", result.user);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    // Handle specific error codes for better user feedback
    if (error.code === 'auth/popup-closed-by-user') {
      return { success: false, error: 'Google sign-in popup was closed.' };
    }
    return { success: false, error: error.message };
  }
};

export const firebaseGoogleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  // You can add scopes if needed, e.g., provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  try {
    const result = await signInWithPopup(auth, provider); // Use signInWithPopup
    console.log("User signed up with Google:", result.user);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Error signing up with Google:", error.message);
    // Handle specific error codes for better user feedback
    if (error.code === 'auth/popup-closed-by-user') {
      return { success: false, error: 'Google sign-up popup was closed.' };
    }
    return { success: false, error: error.message };
  }
};


export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error.message);
    return { success: false, error: error.message };
  }
};

export { onAuthStateChanged };
