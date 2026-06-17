/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

// Firebase configuration (Hardcoded because SW cannot easily import from project modules)
const firebaseConfig = {
  apiKey: "AIzaSyD_EmO_M3BTWIqa7z1OcPFpPb7qujQQRHk",
  authDomain: "eg-institute.firebaseapp.com",
  projectId: "eg-institute",
  storageBucket: "eg-institute.firebasestorage.app",
  messagingSenderId: "960701293742",
  appId: "1:960701293742:web:4e57373ac5881b6bd9793f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("FCM Background:", payload);

  const notificationTitle = payload?.notification?.title || "New notification";
  const notificationOptions = {
    body: payload?.notification?.body || "",
    icon: "/favicon.ico",
    data: payload?.data || {},
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
