// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
console.log("Firebase initialized");

// Initialize Firestore
const db = getFirestore();

/**
 * Increment the specified counter in Firestore.
 * @param {string} counterName - The ID of the document in the `counters` collection.
 */
export async function incrementCounter(counterName) {
  const counterRef = doc(db, "counters", counterName);

  try {
    await updateDoc(counterRef, {
      count: increment(1),
    });
    console.log(`${counterName} counter incremented`);
  } catch (error) {
    console.error(`Error incrementing ${counterName}:`, error);
  }
}

/**
 * Fetch the current value of a counter from Firestore.
 * @param {string} counterName - The ID of the document in the `counters` collection.
 * @returns {Promise<number>} - The current count value.
 */
async function fetchCounter(counterName) {
  const counterRef = doc(db, "counters", counterName);

  try {
    const counterSnap = await getDoc(counterRef);
    if (counterSnap.exists()) {
      return counterSnap.data().count;
    } else {
      console.log(`Counter "${counterName}" does not exist!`);
      return 0;
    }
  } catch (error) {
    console.error(`Error fetching ${counterName} counter:`, error);
    return 0;
  }
}

/**
 * Update the counter display on the web page.
 */
export async function updateCounterDisplay() {
  const templateCount = await fetchCounter("templateGenerator");
  const midiCount = await fetchCounter("midiGenerator");
  const pageViews = await fetchCounter("pageViews");

  document.getElementById("templateCounter").textContent = templateCount || 0;
  document.getElementById("midiCounter").textContent = midiCount || 0;
  document.getElementById("pageViewsCounter").textContent = pageViews || 0;
}
