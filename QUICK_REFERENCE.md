# 🚀 MI7 Meal Manager - Quick Reference

## Files to Open

| File | Purpose | Open When |
|------|---------|-----------|
| `firebase-config-setup.html` | ⚙️ Configure Firebase | **FIRST** - Setup credentials |
| `index.html` | 🍽️ Main App | After config is saved |
| `firebase-monitor.html` | 📊 View Database | Monitor live data |
| `README.md` | 📚 Full Guide | Need detailed help |
| `FIREBASE_SETUP.md` | 🔥 Firebase Help | Setup Firebase project |

---

## 🎯 Setup in 3 Steps

### Step 1: Get Credentials
```
Visit: https://console.firebase.google.com/
1. Create project "MI7-Meal-Manager"
2. Create Web App
3. Copy configuration
```

### Step 2: Configure App
```
Open: firebase-config-setup.html
1. Paste credentials
2. Click "Save"
```

### Step 3: Use App
```
Open: index.html
Start adding meals!
```

---

## 🔑 Firebase Credentials You'll Need

From Firebase Console → Project Settings → Web App:

```
{
  "apiKey": "AIza...",
  "authDomain": "your-project.firebaseapp.com",
  "projectId": "your-project",
  "storageBucket": "your-project.appspot.com",
  "messagingSenderId": "123456789",
  "appId": "1:123456789:web:abc..."
}
```

---

## 🔄 Data Flow

```
User Input (index.html)
    ↓
Firebase Authentication (Anonymous)
    ↓
Firestore Database
    ↓
Real-time Listeners
    ↓
Live Update on Screen
```

---

## 📊 Database Collections

### Expenses
```json
{
  "date": "2025-11-12",
  "description": "Rice",
  "amount": 1500,
  "spentBy": "Uday"
}
```

### Contributions
```json
{
  "date": "2025-11-12",
  "name": "Uday",
  "amount": 5000
}
```

### Meals
```json
{
  "date": "2025-11-12",
  "uday": 2,
  "abrar": 1,
  "muntasir": 3
}
```

---

## 🛠️ Useful Links

- **Firebase Console:** https://console.firebase.google.com/
- **Firestore Dashboard:** https://firebase.google.com/products/firestore
- **Firebase Docs:** https://firebase.google.com/docs
- **Tailwind CSS:** https://tailwindcss.com/

---

## ⚡ Common Commands

### Python Server
```bash
python -m http.server 8000
# Visit: http://localhost:8000
```

### Node Server
```bash
npm install express cors dotenv firebase-admin
node firebase-server.js
# Visit: http://localhost:3000
```

### Firebase CLI
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🚨 Error Messages & Solutions

| Error | Solution |
|-------|----------|
| "Firebase not configured" | Open `firebase-config-setup.html` first |
| "Permission denied" | Enable Anonymous auth in Firebase |
| "Collection not found" | Collections auto-create when data is added |
| "Can't connect" | Check API key and project ID are correct |

---

## 📱 Available Features

### Summary Page
- Total expenses
- Total contributions
- Meal statistics
- Balance sheet
- Recent activity

### Add Meal
- Log daily meals for each member
- Auto-save to database

### Add Expense
- Track spending
- Record who paid
- See descriptions

### Add Contribution
- Record contributions
- Track by member

### AI Chef
- Ask for meal ideas
- Get recipes
- Budget meal plans

### Download Reports
- Individual meal history
- Complete summary PDF

---

## 🔐 Security Notes

### Development
- Test mode allows all access
- Good for development
- ⚠️ Not for production

### Production
- Set proper Firestore rules
- Require authentication
- Validate data server-side

Example rule:
```firestore
match /artifacts/{appId}/public/data/{document=**} {
  allow read, write: if request.auth != null;
}
```

---

## 📞 Need Help?

1. **Configuration Issues?**
   - Check `firebase-config-setup.html`
   - Verify credentials in Firebase Console

2. **Database Issues?**
   - Check `firebase-monitor.html`
   - View in Firebase Console

3. **General Help?**
   - Read `README.md`
   - Read `FIREBASE_SETUP.md`

4. **Code Issues?**
   - Press F12 (Developer Tools)
   - Check Console tab for errors

---

## ✅ Checklist

- [ ] Firebase project created
- [ ] Web app registered
- [ ] Firestore database created
- [ ] Anonymous auth enabled
- [ ] Credentials saved via `firebase-config-setup.html`
- [ ] No errors in browser console (F12)
- [ ] Data appears in Firebase Console
- [ ] All team members added

---

## 🎉 You're Ready!

1. Open `firebase-config-setup.html`
2. Add your Firebase credentials
3. Open `index.html`
4. Start managing your meals! 🍽️

---

**Questions? Check the documentation files or Firebase docs!**
