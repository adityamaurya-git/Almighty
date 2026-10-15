
/* public/firebase-messaging-sw.js
   Imported into the PWA's generated /sw.js.
   Do not register another service worker from this file.
*/

importScripts(
  "https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "almighty-dce73.firebaseapp.com",
  projectId: "almighty-dce73",
  storageBucket: "almighty-dce73.firebasestorage.app",
  messagingSenderId: "934721971534",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  const data = payload.data || {};

  console.log("Background FCM message:", data);

  // New order or a reminder for an unhandled order
  if (data.type === "vendor_new_order") {
    const orderId = data.orderId || "unknown";
    const tag = `vendor-order-${orderId}`;

    // Prevent displaying a notification for an order that has
    // already been handled, if this worker has been informed.
    const existing = await self.registration.getNotifications({
      tag,
    });

    // Refresh the same order's notification on reminder messages.
    existing.forEach((notification) => notification.close());

    await self.registration.showNotification(
      data.title || "🔔 New Order Received",
      {
        body: data.body || "You have received a new order.",
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
        tag,
        renotify: true,
        requireInteraction: true,
        data: {
          type: data.type,
          orderId,
          url: "/almighty/partner/dashboard",
        },
      }
    );

    return;
  }

  // When the order is accepted/rejected/handled, close its alert.
  if (data.type === "vendor_order_handled" && data.orderId) {
    const notifications = await self.registration.getNotifications();

    notifications.forEach((notification) => {
      if (notification.data?.orderId === data.orderId) {
        notification.close();
      }
    });
  }
});

// Open or focus the dashboard when the vendor clicks a notification.
self.addEventListener("notificationclick", (event) => {
  const notificationData = event.notification.data || {};
  const targetUrl =
    notificationData.url || "/almighty/partner/dashboard";

  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    }).then((windowClients) => {
      for (const client of windowClients) {
        if ("focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      return clients.openWindow(targetUrl);
    })
  );
});
