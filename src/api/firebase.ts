
import { initializeApp } from "@firebase/app"
import { getAuth } from "@firebase/auth"
import { getAnalytics } from "@firebase/analytics"
import { getFirestore } from "@firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyA7HUCZPV8whPXz80D4E_OVhMq7dK9RCgA",
  authDomain: "techgoda-1efac.firebaseapp.com",
  projectId: "techgoda-1efac",
  storageBucket: "",
  messagingSenderId: "",
  appId: "1:293412443812:web:84f14b0ac24caf40723831",
  measurementId: "G-Q4TZ34K9CL",

}

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, firebaseAuth, db };

