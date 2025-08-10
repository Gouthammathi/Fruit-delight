# Firebase Setup Guide for Fruit Delight

## Current Issue
You're experiencing "Access denied. Please check Firebase security rules" error because the Firebase security rules haven't been deployed to your Firebase project.

## Steps to Resolve

### 1. Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase in your project
```bash
firebase init
```

When prompted:
- Select "Firestore" and "Storage"
- Choose your existing project: `fruit-delight-3de3a`
- Accept the default file names for rules

### 4. Deploy Security Rules
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules
```

### 5. Verify Rules in Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `fruit-delight-3de3a`
3. Go to Firestore Database → Rules
4. Verify the rules are updated
5. Go to Storage → Rules
6. Verify the storage rules are updated

## Alternative: Manual Rule Update

If you prefer to update rules manually in the Firebase Console:

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Testing the Connection

After deploying the rules:
1. Refresh your admin page
2. The connection status should show "Connected"
3. You should be able to log in and access data

## Troubleshooting

### Still getting "Access denied"?
1. Check if you're logged in to Firebase in your app
2. Verify the rules were deployed successfully
3. Check the Firebase Console for any error messages
4. Ensure your Firebase project ID matches exactly

### Connection issues?
1. Check your internet connection
2. Verify Firebase services are available at [Firebase Status](https://status.firebase.google.com/)
3. Check if your Firebase project is on the correct plan (Spark/Blaze)

## Security Note
The current rules allow any authenticated user to read/write all data. For production, consider implementing more restrictive rules based on user roles and data ownership. 