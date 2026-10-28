import { getApp } from "firebase/app";

import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const getTokenDocumentId = (token) => encodeURIComponent(token);

// Delete only this browser's matching web token documents.
// Other outlets and Flutter tokens are left untouched.
async function deleteWebTokenDocuments(vendorId, token) {
  if (!vendorId || !token) return;

  const tokensRef = collection(
    db,
    "vendors",
    vendorId,
    "notificationTokens"
  );

  const matchingTokens = await getDocs(
    query(tokensRef, where("token", "==", token))
  );

  await Promise.all(
    matchingTokens.docs
      .filter((tokenDoc) => tokenDoc.data().platform === "web")
      .map((tokenDoc) => deleteDoc(tokenDoc.ref))
  );
}

export async function registerWebPush({
  vendorId,
  outletId,
  role = "outlet",
}) {
  if (!vendorId || !outletId) {
    throw new Error("Vendor ID and outlet ID are required.");
  }

  // 1. Read the main vendor document before creating a token.
  const vendorRef = doc(db, "vendors", vendorId);
  const vendorSnap = await getDoc(vendorRef);

  if (!vendorSnap.exists()) {
    throw new Error("Vendor document was not found.");
  }

  const vendorData = vendorSnap.data();

  // 2. If applicationType exists, do not register this browser.
  if (
    Object.prototype.hasOwnProperty.call(
      vendorData,
      "applicationType"
    )
  ) {
    return {
      skipped: true,
      reason: "applicationType field exists",
    };
  }

  // 3. Check browser support.
  if (
    !("Notification" in window) ||
    !("serviceWorker" in navigator)
  ) {
    throw new Error("This browser does not support web notifications.");
  }

  if (!(await isSupported())) {
    throw new Error(
      "Firebase Messaging is not supported in this browser."
    );
  }

  if (!import.meta.env.VITE_FIREBASE_VAPID_KEY) {
    throw new Error("VITE_FIREBASE_VAPID_KEY is missing.");
  }

  // 4. Request permission if it has not already been granted.
  let permission = Notification.permission;

  if (permission === "default") {
    permission = await Notification.requestPermission();
  }

  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  // 5. Wait for the PWA service worker.
  const registration = await navigator.serviceWorker.ready;
  const messaging = getMessaging(getApp());

  // 6. Obtain this browser's FCM token.
  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });

  if (!token) {
    throw new Error("Could not obtain an FCM token.");
  }

  // 7. Use a deterministic document ID to prevent duplicates.
  const tokenRef = doc(
    db,
    "vendors",
    vendorId,
    "notificationTokens",
    getTokenDocumentId(token)
  );

  await setDoc(
    tokenRef,
    {
      token,
      vendorId,
      outletId,
      role,
      platform: "web",
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return {
    skipped: false,
    token,
    messaging,
  };
}

// Call this when the outlet logs out.

export async function unregisterWebPush({ vendorId, outletId }) {
  if (!vendorId || !outletId) return;

  if (!(await isSupported())) return;

  const tokensRef = collection(
    db,
    "vendors",
    vendorId,
    "notificationTokens"
  );

  // Find only web tokens belonging to this outlet.
  const snapshot = await getDocs(
    query(
      tokensRef,
      where("outletId", "==", outletId),
      where("platform", "==", "web")
    )
  );

  // Delete only the matching web token documents.
  await Promise.all(
    snapshot.docs.map((tokenDoc) => deleteDoc(tokenDoc.ref))
  );
}


export function listenForForegroundMessages(messaging, callback) {
  return onMessage(messaging, callback);
}
