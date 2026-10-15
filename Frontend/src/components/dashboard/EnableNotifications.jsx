// // import { useState } from "react";
// // import { useAuth } from "../../hooks/useAuth";
// // import { registerWebPush } from "../../services/webPush.service";
// // import toast from "react-hot-toast";

// // export const EnableNotifications = () => {


// //     const { outlet } = useAuth();
// //     const [loading, setLoading] = useState(false);

// //     const handleEnableNotifications = async () => {
// //         if (loading) return;

// //         setLoading(true);

// //         try {
// //             console.log("1. Starting notification registration");

// //             const result = await registerWebPush({
// //                 vendorId: outlet.vendorId, // Verify this field exists
// //                 outletId: outlet.outletId,
// //                 role: "owner",
// //             });

// //             console.log("2. Notification registration completed", result);
// //             toast.success("Order notifications enabled!");
// //         } catch (error) {
// //             console.error("Notification setup failed:", error);
// //             toast.error(error?.message || "Failed to enable notifications");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <button onClick={handleEnableNotifications} disabled={loading}>
// //             {loading ? "Enabling..." : "Enable Order Notifications"}
// //         </button>
// //     );


// // }









// import { useState, useRef, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import {
//   registerWebPush,
//   listenForForegroundMessages,
// } from "../../services/webPush.service";
// import toast from "react-hot-toast";

// export const EnableNotifications = () => {
//   const { outlet } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [enabled, setEnabled] = useState(false);
//   const unsubscribeRef = useRef(null);

//   useEffect(() => {
//     return () => {
//       unsubscribeRef.current?.();
//     };
//   }, []);

//   const handleEnableNotifications = async () => {
//     if (loading) return;

//     if (!outlet?.vendorId || !outlet?.outletId) {
//       toast.error("Vendor or outlet information is missing.");
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log("1. Starting notification registration");

//       const result = await registerWebPush({
//         vendorId: outlet.vendorId,
//         outletId: outlet.outletId,
//         role: "owner",
//       });

//       // Prevent duplicate foreground listeners.
//       unsubscribeRef.current?.();

//       unsubscribeRef.current = listenForForegroundMessages(
//         result.messaging,
//         (payload) => {
//           console.log("FOREGROUND FCM MESSAGE:", payload);

//           const title =
//             payload.notification?.title ||
//             payload.data?.title ||
//             "New Order";

//           const body =
//             payload.notification?.body ||
//             payload.data?.body ||
//             "You have received a notification.";

//           toast(`${title}: ${body}`, {
//             duration: 6000,
//           });
//         }
//       );

//       setEnabled(true);
//       console.log("2. Foreground listener registered");
//       toast.success("Order notifications enabled!");
//     } catch (error) {
//       console.error("Notification setup failed:", error);
//       toast.error(error?.message || "Failed to enable notifications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleEnableNotifications}
//       disabled={loading || enabled}
//     >
//       {loading
//         ? "Enabling..."
//         : enabled
//         ? "Notifications Enabled"
//         : "Enable Order Notifications"}
//     </button>
//   );
// };






import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import {
  registerWebPush,
  listenForForegroundMessages,
} from "../../services/webPush.service";

export const EnableNotifications = () => {
  const { outlet , user } = useAuth();
  const [loading, setLoading] = useState(false);
  const unsubscribeRef = useRef(null);

  console.log(user , outlet.vendorId);

  useEffect(() => {
    return () => {
      unsubscribeRef.current?.();
    };
  }, []);

  const handleEnableNotifications = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (!outlet?.vendorId || !outlet?.outletId) {
        throw new Error(
          "Vendor or outlet information is missing."
        );
      }

      const { messaging } = await registerWebPush({
        vendorId: outlet.vendorId,
        outletId: outlet.outletId,
        role: "outlet",
      });

      // Avoid attaching duplicate foreground listeners.
      unsubscribeRef.current?.();

      unsubscribeRef.current = listenForForegroundMessages(
        messaging,
        (payload) => {
          const data = payload.data || {};

          console.log("FOREGROUND FCM MESSAGE:", payload);

          if (data.type === "vendor_new_order") {
            toast.success(
              data.title || "New order received",
              {
                duration: 6000,
              }
            );

            if (data.body) {
              toast(data.body, { duration: 6000 });
            }
          } else if (
            data.type === "vendor_order_handled"
          ) {
            console.log(
              "Order handled:",
              data.orderId
            );
          }
        }
      );

      toast.success("Order notifications enabled!");
    } catch (error) {
      console.error("Notification setup failed:", error);

      toast.error(
        error?.message || "Failed to enable notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleEnableNotifications}
      disabled={loading}
    >
      {loading
        ? "Enabling..."
        : "Enable Order Notifications"}
    </button>
  );
};
