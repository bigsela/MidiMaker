// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-check.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8TvUStLtbRHy0S-XhZYrbIwzicbZjDGA",
  authDomain: "ors-midimaker.firebaseapp.com",
  projectId: "ors-midimaker",
  storageBucket: "ors-midimaker.appspot.com",
  messagingSenderId: "298026855328",
  appId: "1:298026855328:web:b6e2a4d5d7327e408992c5",
  measurementId: "G-6THPGT724D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase App Check
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LcqjK8qAAAAAKhVX1xKeWYLVQm8SM2CpcEZUdDn"), // Replace with your actual reCAPTCHA Site Key
  isTokenAutoRefreshEnabled: true, // Automatically refresh tokens
});

console.log("Firebase and App Check initialized");
