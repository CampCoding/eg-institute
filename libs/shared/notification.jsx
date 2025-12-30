"use client";

import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { getMessagingIfSupported } from "../configs/fireBase";
import toast from "react-hot-toast";
import { Bounce } from "react-toastify";
import { showModernToast } from "../../components/shared/Toaster";
import { playNotifSound } from "../../utils/notificationSound";

export function useFCM() {
  useEffect(() => {
    let unsub;

    (async () => {
      try {
        const messaging = await getMessagingIfSupported();
        if (!messaging) return;

        const perm = await Notification.requestPermission();
        if (perm !== "granted") {
          console.log("Notifications permission not granted");
          return;
        }

        // ✅ register + wait active
        await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
          scope: "/",
        });
        const swReg = await navigator.serviceWorker.ready;

        const token = await getToken(messaging, {
          vapidKey:
            "BJ0NWCMC9BiXfE2nu5b8M7Z1niFAVATMA-o1J622Ix225mrp8ukfjsn7rZMFuOa5ngGmuyv9j78H4oqCK4e1Td0",
          serviceWorkerRegistration: swReg,
        });

        console.log("FCM TOKEN:", token);
        localStorage.setItem("fcm_token", token);

        unsub = onMessage(messaging, (payload) => {
          const title = payload?.notification?.title || "New notification";
          const body = payload?.notification?.body || "";
          const kind = "alert";

          /* new Notification(title, { body }); */
          console.log(payload);

          showModernToast({
            title,
            body,
            kind,
          });

          playNotifSound(
            kind === "alert"
              ? "alert"
              : kind === "message"
              ? "message"
              : "alert"
          );
        });
      } catch (e) {
        console.error("FCM init error:", e);
      }
    })();

    return () => unsub?.();
  }, []);
}
