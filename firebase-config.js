 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
 import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDlvnSbpz4PE5fjC80oCxnMdFHMInakuog",
   authDomain: "fir-projects-f4a13.firebaseapp.com",
   projectId: "fir-projects-f4a13",
   storageBucket: "fir-projects-f4a13.appspot.com",
   messagingSenderId: "138131374209",
   appId: "1:138131374209:web:068c391739dc145d280d80",
   measurementId: "G-D9ZZH0H8M9"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const db = getFirestore(app);
 const auth = getAuth(app);

 export {db, auth, app}
 