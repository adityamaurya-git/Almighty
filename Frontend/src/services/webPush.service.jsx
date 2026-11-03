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


// const getTokenDocumentId = (token) => encodeURIComponent(token);

const getTokenDocumentId = (token, outletId, platform = "web") => {
  return [
    encodeURIComponent(token),
    encodeURIComponent(outletId),
    encodeURIComponent(platform),
  ].join("__");
};



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

  console.log("REGISTER WEB PUSH STARTED", {
    vendorId,
    outletId,
    permission: Notification.permission,
    vapidKeyPresent: Boolean(
      import.meta.env.VITE_FIREBASE_VAPID_KEY
    ),
  });

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

  // Confirm the selected vendor belongs to the logged-in outlet.
  // if (vendorData.outletId !== outletId) {
  //   throw new Error(
  //     "The selected vendor does not match the logged-in outlet."
  //   );
  // }

  // Confirm the vendor belongs to the outlet's owner.
  if (!vendorData.ownerId) {
    throw new Error(
      "Owner ID is missing from the selected vendor."
    );
  }

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

  console.log("FCM TOKEN GENERATED:", Boolean(token));
  console.log("TOKEN OUTLET:", outletId);

  if (!token) {
    throw new Error("Could not obtain an FCM token.");
  }

  // 7. Use a deterministic document ID to prevent duplicates.
  const tokenRef = doc(
    db,
    "vendors",
    vendorId,
    "notificationTokens",
    // getTokenDocumentId(token)
    getTokenDocumentId(token, outletId, "web")
  );

  console.log("SAVING TOKEN FOR OUTLET:", outletId);

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
  console.log("TOKEN DOCUMENT SAVED:", outletId);

  return {
    skipped: false,
    token,
    messaging,
  };
}

// Call this when the outlet logs out.

// export async function unregisterWebPush({ vendorId, outletId }) {
//   if (!vendorId || !outletId) return;

//   if (!(await isSupported())) return;

//   const tokensRef = collection(
//     db,
//     "vendors",
//     vendorId,
//     "notificationTokens"
//   );

//   // Find only web tokens belonging to this outlet.
//   const snapshot = await getDocs(
//     query(
//       tokensRef,
//       where("outletId", "==", outletId),
//       where("platform", "==", "web")
//     )
//   );

//   // Delete only the matching web token documents.
//   await Promise.all(
//     snapshot.docs.map((tokenDoc) => deleteDoc(tokenDoc.ref))
//   );
// }


export async function unregisterWebPush({ vendorId, outletId }) {
  if (!vendorId || !outletId) return;

  if (!(await isSupported())) return;

  const messaging = getMessaging(getApp());

  // Get the token for this browser/PWA installation.
  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: await navigator.serviceWorker.ready,
  });

  if (!token) return;

  const tokensRef = collection(
    db,
    "vendors",
    vendorId,
    "notificationTokens"
  );

  // Delete this outlet's web-token association only.
  const newTokenRef = doc(
    db,
    "vendors",
    vendorId,
    "notificationTokens",
    getTokenDocumentId(token, outletId, "web")
  );

  await deleteDoc(newTokenRef);

  // Also clean up the legacy token-only document, but only if it
  // belongs to this same outlet and is a web token.
  const legacyRef = doc(
    db,
    "vendors",
    vendorId,
    "notificationTokens",
    encodeURIComponent(token)
  );

  const legacySnap = await getDoc(legacyRef);

  if (
    legacySnap.exists() &&
    legacySnap.data().platform === "web" &&
    legacySnap.data().outletId === outletId
  ) {
    await deleteDoc(legacyRef);
  }
}


export function listenForForegroundMessages(messaging, callback) {
  return onMessage(messaging, callback);
}
