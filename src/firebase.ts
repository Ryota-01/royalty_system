// 必要なSDKから必要な関数をインポート
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: 使用したいFirebase製品のSDKを追加する
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_DEVEROPMENT_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_DEVEROPMENT_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_DEVEROPMENT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEVEROPMENT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEVEROPMENT_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_DEVEROPMENT_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_DEVEROPMENT_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { app, analytics, db };
