import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


/*const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};*/

const firebaseConfig = {
  apiKey: 'AIzaSyAvIXmAYJLtN8CeqMSeLa37hOEbQvyhcOs',
  authDomain: 'boc-auth-development.firebaseapp.com',
  projectId: 'boc-auth-development',
  storageBucket: 'boc-auth-development.appspot.com',
  messagingSenderId: '99527022317',
  appId: '1:99527022317:web:27e24b1403627742619ee4'
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;