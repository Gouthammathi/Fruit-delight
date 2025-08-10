// Firebase Connection Test Script
// Run this in the browser console to test Firebase connection

import { db, auth, storage, validateFirebaseConfig } from './src/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

console.log('=== Firebase Connection Test ===');

// Test 1: Configuration Validation
console.log('1. Testing Firebase configuration...');
const configValid = validateFirebaseConfig();
console.log('Configuration valid:', configValid);

// Test 2: Authentication State
console.log('2. Testing authentication state...');
console.log('Current user:', auth.currentUser);
console.log('Auth state:', auth.currentUser ? 'Authenticated' : 'Not authenticated');

// Test 3: Firestore Connection
console.log('3. Testing Firestore connection...');
try {
  const testQuery = await getDocs(collection(db, 'customers'));
  console.log('✅ Firestore connection successful');
  console.log('Documents found:', testQuery.size);
} catch (error) {
  console.error('❌ Firestore connection failed:', error);
  console.log('Error code:', error.code);
  console.log('Error message:', error.message);
}

// Test 4: Storage Connection
console.log('4. Testing Storage connection...');
try {
  const storageRef = ref(storage, 'test-connection');
  console.log('✅ Storage connection successful');
} catch (error) {
  console.error('❌ Storage connection failed:', error);
}

console.log('=== Test Complete ==='); 