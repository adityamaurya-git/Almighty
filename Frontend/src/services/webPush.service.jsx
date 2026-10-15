// import { getApp } from "firebase/app";
// import {
//   getMessaging,
//   getToken,
//   isSupported,
//   onMessage,
// } from "firebase/messaging";

// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   addDoc,
//   updateDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// import { db } from "../firebase/firebase";

// export async function registerWebPush({
//   vendorId,
//   outletId,
//   role = "owner",
// }) {
//   if (!vendorId || !outletId) {
//     throw new Error("Vendor and outlet are required.");
//   }

//   if (!("Notification" in window) || !("serviceWorker" in navigator)) {
//     throw new Error("This browser does not support web notifications.");
//   }

//   console.log("FCM: checking browser support");

//   if (!(await isSupported())) {
//     throw new Error("Firebase Messaging is not supported in this browser.");
//   }

//   console.log("FCM: requesting permission");
//   const permission = await Notification.requestPermission();

//   if (permission !== "granted") {
//     throw new Error("Notification permission was not granted.");
//   }

//   console.log("FCM: waiting for service worker");
//   // Wait for the PWA service worker to become active.
//   const registration = await navigator.serviceWorker.ready;

//   const messaging = getMessaging(getApp());

//   console.log("FCM: getting token");
//   const token = await getToken(messaging, {
//     vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
//     serviceWorkerRegistration: registration,
//   });

//   if (!token) {
//     throw new Error("Could not obtain an FCM token.");
//   }

//   const tokensRef = collection(
//     db,
//     "vendors",
//     vendorId,
//     "notificationTokens"
//   );

//   console.log("FCM: saving token to Firestore");
//   // Reuse an existing document if this token is already registered.
//   const existing = await getDocs(
//     query(tokensRef, where("token", "==", token))
//   );

//   const tokenData = {
//     token,
//     platform: "web",
//     role,
//     outletId,
//     vendorId,
//     updatedAt: serverTimestamp(),
//   };

//   if (existing.empty) {
//     await addDoc(tokensRef, {
//       ...tokenData,
//       createdAt: serverTimestamp(),
//     });
//   } else {
//     await Promise.all(
//       existing.docs.map((tokenDoc) =>
//         updateDoc(tokenDoc.ref, tokenData)
//       )
//     );
//   }

//   console.log("FCM: completed");

//   return { token, messaging };
// }

// export function listenForForegroundMessages(messaging, callback) {
//   return onMessage(messaging, callback);
// }





import { getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function registerWebPush({
  vendorId,
  outletId,
  role = "owner",
}) {
  if (!vendorId || !outletId) {
    throw new Error("Vendor and outlet are required.");
  }

  if (
    !("Notification" in window) ||
    !("serviceWorker" in navigator)
  ) {
    throw new Error(
      "This browser does not support web notifications."
    );
  }

  if (!(await isSupported())) {
    throw new Error(
      "Firebase Messaging is not supported in this browser."
    );
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  // Wait for the PWA's registered service worker.
  const registration = await navigator.serviceWorker.ready;

  const messaging = getMessaging(getApp());

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });

  if (!token) {
    throw new Error("Could not obtain an FCM token.");
  }

  const tokensRef = collection(
    db,
    "vendors",
    vendorId,
    "notificationTokens"
  );

  // Avoid creating another document for an existing token.
  const existing = await getDocs(
    query(tokensRef, where("token", "==", token))
  );

  const tokenData = {
    token,
    platform: "web",
    role,
    outletId,
    vendorId,
    updatedAt: serverTimestamp(),
  };

  if (existing.empty) {
    await addDoc(tokensRef, {
      ...tokenData,
      createdAt: serverTimestamp(),
    });
  } else {
    await Promise.all(
      existing.docs.map((tokenDoc) =>
        updateDoc(tokenDoc.ref, tokenData)
      )
    );
  }

  return { token, messaging };
}

export function listenForForegroundMessages(
  messaging,
  callback
) {
  return onMessage(messaging, callback);
}
