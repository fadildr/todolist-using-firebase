import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCJXdQ0SWIoQ5ivpuJGMd478rneoTWqs8g",
  authDomain: "uninet-b2a5a.firebaseapp.com",
  projectId: "uninet-b2a5a",
  storageBucket: "uninet-b2a5a.appspot.com",
  messagingSenderId: "123159222643",
  appId: "1:123159222643:web:8d0a63d184f08f94d58d06",
  measurementId: "G-D0WWJ9XFZY",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
