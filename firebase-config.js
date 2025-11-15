/**
 * Firebase Configuration
 * 
 * To get your Firebase credentials:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project or select an existing one
 * 3. Go to Project Settings (gear icon)
 * 4. Copy your Web App configuration
 * 5. Replace the values below with your actual credentials
 */

export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

/**
 * INSTRUCTIONS:
 * 
 * Step 1: Set up Firebase Project
 * --------------------------------
 * 1. Visit https://console.firebase.google.com/
 * 2. Click "Create a project" or select existing project
 * 3. Name it "MI7-Meal-Manager"
 * 4. Enable Google Analytics (optional)
 * 5. Create the project
 * 
 * Step 2: Get Your Firebase Credentials
 * -----------------------------------------------
 * 1. In Firebase Console, click on your project
 * 2. Click the gear icon (Settings) → Project Settings
 * 3. Scroll down to "Your apps" section
 * 4. Click on Web icon (</>) if not already created
 * 5. Copy the entire firebaseConfig object and paste it here
 * 
 * Step 3: Set Up Firestore Database
 * ----------------------------------
 * 1. In Firebase Console, go to "Firestore Database" (left sidebar)
 * 2. Click "Create database"
 * 3. Choose "Start in test mode" (for development)
 * 4. Select region (e.g., "asia-south1" for Bangladesh)
 * 5. Click "Enable"
 * 
 * Step 4: Create Collections and Set Rules
 * -----------------------------------------
 * Your database structure should look like this:
 * 
 * artifacts/
 * ├── [YOUR_APP_ID]/
 * │   └── public/
 * │       └── data/
 * │           ├── expenses/      (collection)
 * │           ├── contributions/ (collection)
 * │           └── meals/         (collection)
 * 
 * For testing, use these Firestore Rules:
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /{document=**} {
 *       allow read, write: if true;  // TESTING ONLY - Change for production!
 *     }
 *   }
 * }
 * 
 * Step 5: Enable Anonymous Authentication (Optional but Recommended)
 * ------------------------------------------------------------------
 * 1. Go to "Authentication" in Firebase Console
 * 2. Click "Get started"
 * 3. Click "Anonymous" provider
 * 4. Toggle the switch to enable it
 * 5. Click "Save"
 */
