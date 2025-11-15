# 🍽️ MI7 Meal Manager - Complete Setup Guide

A modern, real-time meal management system for shared living spaces using Firebase Firestore and Gemini AI.

## 📦 Project Structure

```
meal/
├── index.html                    # Main application
├── firebase-config-setup.html    # Easy Firebase configuration UI
├── firebase-config.js            # Firebase configuration template
├── firebase-server.js            # Optional Node.js backend server
├── FIREBASE_SETUP.md             # Detailed Firebase setup guide
├── package.json                  # Node dependencies
├── .env.example                  # Environment variables template
└── README.md                     # This file
```

## 🚀 Quick Start (5 minutes)

### Step 1: Get Firebase Credentials
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Create a Web App
4. Copy your configuration

### Step 2: Configure the App
1. Open `firebase-config-setup.html` in your browser
2. Paste your Firebase credentials
3. Click "Save Configuration"
4. Done! ✅

### Step 3: Open the App
1. Open `index.html` in your browser
2. Start adding meals, expenses, and contributions
3. Watch data sync in real-time to Firebase!

## 📱 Features

### ✨ Core Features
- **📊 Summary Dashboard** - View financial and meal statistics
- **🍽️ Meal Tracking** - Log daily meals for each member
- **💰 Expense Management** - Track spending and who paid
- **💳 Contribution Tracking** - Record member contributions
- **📈 Balance Sheet** - See who owes whom
- **📥 PDF Export** - Download reports for each member
- **🤖 AI Chef** - Ask Gemini for meal ideas and recipes

### 🔄 Real-Time Features
- Live database sync
- Instant updates across all browsers
- No page refresh needed

### 🔐 Security
- Anonymous authentication
- Firestore security rules
- Data validation

## 🔧 Detailed Setup

### Option 1: Browser Configuration (Easiest)

```bash
# 1. Open in browser
firebase-config-setup.html

# 2. Enter your Firebase credentials
# 3. Click "Save Configuration"
```

### Option 2: Manual Configuration

1. Open `firebase-config.js`
2. Replace with your credentials:
```javascript
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc..."
};
```

### Option 3: Environment Variables

Create `.env` file:
```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...
VITE_GEMINI_API_KEY=your-gemini-api-key
```

## 🔥 Firebase Setup (Detailed)

### Create Firestore Database

1. Firebase Console → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"**
4. Select region: **"asia-south1"** (for Bangladesh)
5. Click **"Enable"**

### Required Collections

Create these collections in Firestore:

```
artifacts/
└── default-meal-app/
    └── public/
        └── data/
            ├── expenses/          (auto-created)
            ├── contributions/     (auto-created)
            └── meals/             (auto-created)
```

### Enable Authentication

1. Firebase Console → **Authentication**
2. Click **"Get started"**
3. Select **"Anonymous"**
4. Toggle **"Enable"**
5. Click **"Save"**

### Security Rules

For **development** (Firebase Console → Firestore → Rules):

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

For **production**:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artifacts/{appId}/public/data/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📊 Database Structure

### Expenses Collection
```json
{
  "id": "doc-id",
  "date": "2025-11-12",
  "description": "Rice",
  "amount": 1500,
  "spentBy": "Uday",
  "addedBy": "user-id"
}
```

### Contributions Collection
```json
{
  "id": "doc-id",
  "date": "2025-11-12",
  "name": "Uday",
  "amount": 5000,
  "addedBy": "user-id"
}
```

### Meals Collection
```json
{
  "id": "doc-id",
  "date": "2025-11-12",
  "uday": 2,
  "abrar": 1,
  "muntasir": 3,
  "arafat": 2,
  "jobayer": 1,
  "abid": 2,
  "ankon": 1,
  "addedBy": "user-id"
}
```

## 🌐 Running the App

### In Browser (No Server)
```bash
# Just open the file
firefox index.html
# or
google-chrome index.html
```

### With Local Server (Python)
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

### With Node.js Server
```bash
# Install dependencies
npm install express cors dotenv firebase-admin

# Get service account key from Firebase Console
# → Project Settings → Service Accounts → Generate New Private Key

# Create .env file with credentials

# Run server
node firebase-server.js

# Visit: http://localhost:3000
```

### With Firebase Hosting (Recommended for Production)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize Firebase in project
firebase init hosting

# Deploy
firebase deploy --only hosting
```

## 🐛 Troubleshooting

### "Firebase initialization failed"
- ✅ Check Firebase credentials are correct
- ✅ Verify Firestore database is created
- ✅ Ensure Anonymous auth is enabled
- ✅ Check browser console for specific errors

### "Permission denied" when adding data
- ✅ Firestore rules are in test mode
- ✅ Anonymous authentication is enabled
- ✅ Try clearing localStorage and refreshing

### Data not showing up
- ✅ Check Firestore Console for documents
- ✅ Verify collection paths match your app ID
- ✅ Check browser DevTools Network tab
- ✅ Ensure page title shows "Connecting..." then updates

### How to Monitor Live Data

1. **Firebase Console** (Easiest)
   - Open [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to **Firestore Database** → **Data**
   - Watch documents appear in real-time

2. **Browser DevTools**
   - Press `F12` → **Console**
   - You'll see Firebase debug messages
   - Check Network tab for Firestore calls

3. **Admin Dashboard** (if running firebase-server.js)
   - Visit `http://localhost:3000`
   - See live data sync

## 🎨 Customization

### Change Team Members
Edit `index.html` line 31:
```javascript
const members = ['Uday', 'Abrar', 'Muntasir', 'Arafat', 'Jobayer', 'Abid', 'Ankon'];
```

### Change App ID
Edit `firebase-config.js` or use `firebase-config-setup.html`

### Change Colors
Edit CSS in `index.html`:
```css
/* Change teal to your color */
.bg-teal-600 { background-color: #your-color; }
```

## 📚 Learning Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/)

## ✅ Pre-Flight Checklist

Before using the app:

- [ ] Firebase project created
- [ ] Web app registered in Firebase
- [ ] Firestore database created
- [ ] Anonymous authentication enabled
- [ ] Firebase credentials saved (via `firebase-config-setup.html`)
- [ ] Collections auto-created or manually created
- [ ] Security rules configured
- [ ] No errors in browser console (F12)
- [ ] Data appears in Firebase Console when added

## 🚢 Deployment

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting
```

### Deploy to GitHub Pages
```bash
# Push to gh-pages branch
git branch -D gh-pages
git checkout -b gh-pages
git push -u origin gh-pages
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 📞 Support

- Check `FIREBASE_SETUP.md` for detailed Firebase instructions
- Check browser console (F12) for error messages
- Visit [Firebase Documentation](https://firebase.google.com/docs)

## 📝 License

Open source - feel free to modify and share!

## 🎉 Features Roadmap

- [ ] SMS notifications for expenses
- [ ] Expense splitting calculator
- [ ] Monthly reports
- [ ] Barcode receipt scanning
- [ ] Mobile app (React Native)
- [ ] Recurring expenses
- [ ] Budget alerts
- [ ] Multi-language support

---

**Made with ❤️ for MI7**

Need help? Open an issue or check the documentation!
# Meal-info
