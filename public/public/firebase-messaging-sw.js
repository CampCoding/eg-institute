const {
  apiKey,
  authDomain,
  projectId,
  messagingSenderId,
  appId,
} = require("../../libs/constant");

/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  messagingSenderId: messagingSenderId,
  appId: appId,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("✅ FCM Background Received:", payload);
  const title = payload?.notification?.title || "New notification";
  console.log("✅ SW BACKGROUND RECEIVED:", payload);
  const options = {
    body: payload?.notification?.body || "",
    icon: "/favicon.ico",
    data: payload?.data || {},
  };

  self.registration.showNotification(title, options);
});
