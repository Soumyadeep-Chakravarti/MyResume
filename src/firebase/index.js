// src/firebase/index.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Only import getAuth here
// import { getFirestore } from 'firebase/firestore'; // Uncomment if you need Firestore
// import { getAnalytics } from "firebase/analytics"; // Uncomment if you need Analytics

import FirebaseConfigKeys from '../config/FirebaseConfigKeys'; // Import the configuration object

const app = initializeApp(FirebaseConfigKeys);

// Initialize and Export Firebase Services
export const auth = getAuth(app);