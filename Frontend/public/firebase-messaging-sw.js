/* global importScripts, firebase */

/*
 * Firebase messaging handler imported into the PWA's generated /sw.js.
 * Do not register a separate service worker from this file.
 */

importScripts(
  "https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC-tBEyZZ6eAQ7IgukFKNpdg4SIfYc1hOU",
  authDomain: "almighty-dce73.firebaseapp.com",
  projectId: "almighty-dce73",
  storageBucket: "almighty-dce73.firebasestorage.app",
  messagingSenderId: "934721971534",
  appId: "1:934721971534:web:7810ca060a4a34f212ea1f",
});

const messaging = firebase.messaging();

// Forward order events to any open dashboard tab/PWA window,
// even when it is minimized or hidden.
async function broadcastToPages(message) {
  const windowClients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  windowClients.forEach((client) => client.postMessage(message));
}

messaging.onBackgroundMessage(async (payload) => {
  const data = payload.data || {};

  console.log("Background FCM message:", data);

  // Show a notification for a new order or an order reminder.
  if (data.type === "vendor_new_order") {
    const orderId = data.orderId || "unknown";
    const tag = `vendor-order-${orderId}`;

    // Replace an existing notification for this order.
    const existingNotifications =
      await self.registration.getNotifications({ tag });

    existingNotifications.forEach((notification) => {
      notification.close();
    });

    await self.registration.showNotification(
      data.title || "🔔 New Order Received",
      {
        body: data.body || "You have received a new order.",
        icon: "/pwa-192-192.png",
        badge: "/pwa-192-192.png",
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

    // await broadcastToPages({
    //   source: "almighty-fcm",
    //   type: "vendor_new_order",
    //   orderId,
    // });


    await broadcastToPages({
      source: "almighty-fcm",
      type: "vendor_new_order",
      orderId,
      vendorId: data.vendorId,
      outletId: data.outletId,
      autoAccepted: data.autoAccepted,
    });

    return;
  }

  // Close the matching order notification when handled.
  if (data.type === "vendor_order_handled" && data.orderId) {
    const notifications = await self.registration.getNotifications();

    notifications.forEach((notification) => {
      if (notification.data?.orderId === data.orderId) {
        notification.close();
      }
    });

    // await broadcastToPages({
    //   source: "almighty-fcm",
    //   type: "vendor_order_handled",
    //   orderId: data.orderId,
    // });


    await broadcastToPages({
      source: "almighty-fcm",
      type: "vendor_order_handled",
      orderId: String(data.orderId),
      vendorId: data.vendorId,
      outletId: data.outletId,
    });


  }

});

// Open or focus the dashboard when a notification is clicked.
self.addEventListener("notificationclick", (event) => {
  const notificationData = event.notification.data || {};
  const targetUrl =
    notificationData.url || "/almighty/partner/dashboard";

  event.notification.close();

  event.waitUntil(
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        for (const client of windowClients) {
          if ("focus" in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }

        return self.clients.openWindow(targetUrl);
      })
  );
});