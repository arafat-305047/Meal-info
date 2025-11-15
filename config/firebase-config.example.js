// Example Firebase config (safe to commit). Copy this to `private/firebase-config.js` and add your real keys.
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Usage:
// 1. Copy this file to `private/firebase-config.js`
// 2. Replace the placeholder values with your real Firebase credentials
// 3. The app will try to load `./private/firebase-config.js` in development; in CI/CD you can set the
//    environment variable __firebase_config to a JSON-stringified config object.
