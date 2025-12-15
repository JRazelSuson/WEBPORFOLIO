

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm1EDb84ua1tRpzhMbDjFWUAEBnVzNenU",
  authDomain: "webporfolio-database.firebaseapp.com",
  projectId: "webporfolio-database",
  storageBucket: "webporfolio-database.appspot.com",
  messagingSenderId: "736759666614",
  appId: "1:736759666614:web:23a0332839cc899e505317"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
