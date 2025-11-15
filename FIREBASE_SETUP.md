# 🍽️ MI7 Meal Manager - Firebase Setup Guide

Complete guide to connect your meal management app to Firebase Firestore database.

## 📋 Table of Contents
1. [Firebase Project Setup](#firebase-project-setup)
2. [Get Your Credentials](#get-your-credentials)
3. [Configure Your App](#configure-your-app)
4. [Create Database Collections](#create-database-collections)
5. [Set Security Rules](#set-security-rules)
6. [Running the App](#running-the-app)
7. [Monitoring Live Database](#monitoring-live-database)

---

## 🔥 Firebase Project Setup

### Step 1: Create a Firebase Project

1. Visit **[Firebase Console](https://console.firebase.google.com/)**
2. Click **"Create a project"** (or select existing)
3. Enter project name: `MI7-Meal-Manager`
4. Choose your options:
   - ✅ Enable Google Analytics (optional)
5. Click **"Create project"**
6. Wait for project to be created (1-2 minutes)

### Step 2: Create a Web App

1. In Firebase Console, click the gear icon ⚙️ **Settings**
2. Go to **"Project Settings"** tab
3. Scroll to **"Your apps"** section
4. Click **Web icon** `</>` 
5. App nickname: `MI7 Meal Manager`
6. Check **"Also set up Firebase Hosting"** (optional)
7. Click **"Register app"**
8. **COPY** the entire config object (you'll need this!)
9. Click **"Continue to console"**

### Step 3: Enable Services

#### Firestore Database
1. Left sidebar → **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select region: **"asia-south1"** (closest to Bangladesh)
5. Click **"Enable"**
6. Wait for creation (30 seconds)

#### Authentication (Anonymous)
1. Left sidebar → **"Authentication"**
2. Click **"Get started"**
3. Choose **"Anonymous"** provider
4. Toggle **"Enable"** ✅
5. Click **"Save"**

---

## 🔐 Get Your Credentials

### Client-Side Credentials (for your website)

```javascript
// These come from Firebase Console → Project Settings
{
  apiKey: "AIza...",                    // Available publicly
  authDomain: "mi7-meal.firebaseapp.com",
  projectId: "mi7-meal",
  storageBucket: "mi7-meal.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
}
```

### Server-Side Credentials (for Node.js server)

1. Firebase Console → ⚙️ Settings → **"Service Accounts"** tab
2. Click **"Generate New Private Key"**
3. Save as `serviceAccountKey.json` in project root
4. ⚠️ **KEEP THIS SECRET** - Don't commit to git!

---

## ⚙️ Configure Your App

### Step 1: Create `.env` File

Create `c:\Users\Administrator\Desktop\meal\.env`:

```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_GEMINI_API_KEY=your-gemini-api-key
```

### Step 2: Update Firebase Config

Edit `firebase-config.js`:

```javascript
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 3: Update HTML File

The `index.html` already contains Firebase initialization code. The app will:
- Auto-initialize Firebase from the config
- Authenticate anonymously
- Listen to real-time database changes

---

## 📊 Create Database Collections

Your Firestore should have this structure:

```
artifacts/
└── default-meal-app/
    └── public/
        └── data/
            ├── expenses/          (Collection)
            ├── contributions/     (Collection)
            └── meals/             (Collection)
```

### Document Structure

#### Expenses Collection
```json
{
  "date": "2025-11-12",
  "description": "Rice",
  "amount": 1500,
  "spentBy": "Uday",
  "addedBy": "user-id",
  "timestamp": "2025-11-12T10:30:00Z"
}
```

#### Contributions Collection
```json
{
  "date": "2025-11-12",
  "name": "Uday",
  "amount": 5000,
  "addedBy": "user-id",
  "timestamp": "2025-11-12T10:30:00Z"
}
```

#### Meals Collection
```json
{
  "date": "2025-11-12",
  "uday": 2,
  "abrar": 1,
  "muntasir": 3,
  "arafat": 2,
  "jobayer": 1,
  "abid": 2,
  "ankon": 1,
  "addedBy": "user-id",
  "timestamp": "2025-11-12T10:30:00Z"
}
```

---

## 🔒 Set Security Rules

### For Development (Test Mode)

Go to Firebase Console → **Firestore Database** → **"Rules"** tab

Replace with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads and writes for testing
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### For Production (Recommended)

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow authenticated users
    match /artifacts/{appId}/public/data/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 🚀 Running the App

### Option 1: Direct in Browser

1. **Just open** `index.html` in your browser
2. The app will connect to Firebase automatically
3. Start adding meals, expenses, and contributions!

### Option 2: With Local Server

```bash
# Install dependencies
npm install express cors dotenv firebase-admin

# Create .env with your credentials
# Download serviceAccountKey.json from Firebase

# Run the server
node firebase-server.js

# Open in browser
http://localhost:3000
```

### Option 3: With Python Server

```bash
# Simple Python HTTP server
python -m http.server 8000

# Open in browser
http://localhost:8000
```

---

## 📱 Monitoring Live Database

### Real-Time Monitoring

You can view your database in real-time:

1. **Firebase Console**
   - Go to **Firestore Database** → **Data** tab
   - See all collections and documents
   - Edit/delete documents directly

2. **Web Dashboard** (if running firebase-server.js)
   - Visit `http://localhost:3000/dashboard`
   - Real-time sync with Firestore

3. **Firebase Admin Panel** (Advanced)
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login
   firebase login
   
   # Emulate locally
   firebase emulators:start
   ```

---

## 🐛 Troubleshooting

### Problem: "Firebase initialization failed"

**Solution:**
- Verify `firebaseConfig` has correct credentials
- Check if Firestore database is created
- Ensure Anonymous authentication is enabled

### Problem: "Permission denied" errors

**Solution:**
- Check Firestore security rules are set to test mode
- Verify authentication is enabled
- Clear browser cache and reload

### Problem: Data not syncing

**Solution:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Verify database path matches app code
- Ensure listener is set up correctly

### Problem: API quota exceeded

**Solution:**
- Check Firestore quotas in Firebase Console
- Reduce real-time listeners
- Implement pagination for large datasets

---

## 📞 Useful Links

- **[Firebase Documentation](https://firebase.google.com/docs)**
- **[Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)**
- **[Firebase Console](https://console.firebase.google.com/)**
- **[Firebase Pricing](https://firebase.google.com/pricing)**

---

## ✅ Checklist

Before running your app:

- [ ] Firebase project created
- [ ] Web app registered
- [ ] Firestore database created
- [ ] Anonymous authentication enabled
- [ ] `.env` file created with credentials
- [ ] `firebase-config.js` updated
- [ ] Database collections created (optional - auto-created)
- [ ] Security rules configured
- [ ] No console errors when loading `index.html`
- [ ] Can add new entries (they appear in Firebase Console)

---

**Happy meal tracking! 🍽️🎉**
