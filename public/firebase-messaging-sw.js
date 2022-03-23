importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDvLhI8JZBP3SUtOe4tC4iRl12ERp_VElk",
    authDomain: "thetidbit-project.firebaseapp.com",
    projectId: "thetidbit-project",
    storageBucket: "thetidbit-project.appspot.com",
    messagingSenderId: "1072524645797",
    appId: "1:1072524645797:web:9718fea1b831fc7ef8044c",
    measurementId: "G-B66PWD75LD"
});

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options
// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'thetidbit notification',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });