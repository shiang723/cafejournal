import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';
// For @react-native-async-storage/async-storage v3:


// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // databaseURL: 'https://project-id.firebaseio.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: 'project-id.appspot.com',
  // messagingSenderId: 'sender-id',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  // measurementId: 'G-measurement-id',
};

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service


export const db = getFirestore(app);


export const appStorage = createAsyncStorage("app");
export const persistence = getReactNativePersistence(appStorage);

export const auth = initializeAuth(app, {
  persistence
});

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
// WARN  [2026-07-19T06:04:15.031Z]  @firebase/auth: Auth (12.16.0):
// You are initializing Firebase Auth for React Native without providing
// AsyncStorage. Auth state will default to memory persistence and will not
// persist between sessions. In order to persist auth state, install the package
// "@react-native-async-storage/async-storage" and provide it to
// initializeAuth:

// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// For @react-native-async-storage/async-storage v3:
// import { createAsyncStorage } from '@react-native-async-storage/async-storage';
// const appStorage = createAsyncStorage("app");
// const persistence = getReactNativePersistence(appStorage);

// /*
// // For @react-native-async-storage/async-storage v2:
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const persistence = getReactNativePersistence(ReactNativeAsyncStorage);
// */

// // Then, initialize auth:
// const auth = initializeAuth(app, {
//   persistence
// });