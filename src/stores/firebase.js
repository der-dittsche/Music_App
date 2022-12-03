import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAJpMj8M9bJmmPxFoR1Pk8ezOKr7BZW2fo',
  authDomain: 'music-app-404e3.firebaseapp.com',
  projectId: 'music-app-404e3',
  storageBucket: 'music-app-404e3.appspot.com',
  messagingSenderId: '306035918224',
  appId: '1:306035918224:web:8d28407ba64bb7e8e55f15',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
