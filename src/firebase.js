import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDvLhI8JZBP3SUtOe4tC4iRl12ERp_VElk",
  authDomain: "thetidbit-project.firebaseapp.com",
  projectId: "thetidbit-project",
  storageBucket: "thetidbit-project.appspot.com",
  messagingSenderId: "1072524645797",
  appId: "1:1072524645797:web:9718fea1b831fc7ef8044c",
  measurementId: "G-B66PWD75LD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging(app);



export async function getFCMToken(){
  return await getToken(messaging, { vapidKey: 'BGCvtBzkXxoVShA-xor_WLFm7sz1q3c9ykF_9fgQLgNKAJJZ1HYkgCQYj-AZdyZ8HnE4O_vG_CiiTAhnCAgZSoI' })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
    resolve( payload);
  });
  });




