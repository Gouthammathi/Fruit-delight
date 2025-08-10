import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlsGzCJvcc10nK5Gr7CNCYLU97MQ9gfQU",
  authDomain: "fruit-delight-3de3a.firebaseapp.com",
  projectId: "fruit-delight-3de3a",
  storageBucket: "fruit-delight-3de3a.firebasestorage.app",
  messagingSenderId: "631516193837",
  appId: "1:631516193837:web:f26900d633bd5c053744a4",
  measurementId: "G-GL5074C4X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Note: Firestore v9+ handles offline persistence automatically
// No need to manually configure settings
console.log('Firestore initialized with automatic offline persistence');

// Add connection state monitoring
let isOnline = navigator.onLine;
window.addEventListener('online', () => {
  isOnline = true;
  console.log('Browser is online');
});
window.addEventListener('offline', () => {
  isOnline = false;
  console.log('Browser is offline');
});

// Firebase configuration validation
const validateFirebaseConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    console.error('Missing Firebase configuration fields:', missingFields);
    return false;
  }
  
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY') {
    console.error('Firebase API key is missing or invalid');
    return false;
  }
  
  console.log('Firebase configuration validated successfully');
  return true;
};

// Validate configuration on import
validateFirebaseConfig();

// Export with connection utilities
export { db, auth, storage, isOnline, validateFirebaseConfig }; 