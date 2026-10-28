import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import {
  registerWebPush,
  listenForForegroundMessages,
} from "../../services/webPush.service";

export const EnableNotifications = () => {
  const { outlet, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const unsubscribeRef = useRef(null);

  const audioRef = useRef(null);
  const activeOrderIdsRef = useRef(new Set());

  const playedAutoOrderIdsRef = useRef(new Set());
  const autoAcceptAudioRef = useRef(new Map());
  const outletRef = useRef(outlet);

  useEffect(() => {
    outletRef.current = outlet;
  }, [outlet]);

  console.log(user, outlet.vendorId);

  const playAutoAcceptSound = (orderId) => {
    if (!orderId) return;

    // Prevent duplicate sounds for the same order.
    // This handles both foreground FCM and service-worker messages.
    if (playedAutoOrderIdsRef.current.has(orderId)) return;

    playedAutoOrderIdsRef.current.add(orderId);

    const audio = new Audio("/sounds/notification.mpeg");
    audio.loop = false;
    audio.volume = 1;

    autoAcceptAudioRef.current.set(orderId, audio);

    audio.onended = () => {
      autoAcceptAudioRef.current.delete(orderId);
    };

    audio.play().catch((error) => {
      console.error("AUTO-ACCEPT SOUND FAILED:", error.name, error.message);
      autoAcceptAudioRef.current.delete(orderId);
    });
  };

  const handleNewOrderSound = (orderId) => {
    if (!orderId) return;

    if (outletRef.current?.autoAcceptOrders) {
      // Auto-accept ON: play once per order.
      playAutoAcceptSound(orderId);
    } else {
      // Auto-accept OFF: keep the existing repeating ringtone.
      startOrderAlert(orderId);
    }
  };

  const startOrderAlert = (orderId) => {
    if (!orderId) return;

    activeOrderIdsRef.current.add(orderId);

    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/notification.mpeg");
      audioRef.current.loop = true;
      audioRef.current.volume = 1;
    }

    // audioRef.current.play().catch((error) => {
    //   console.warn("Order alert audio could not play:", error);
    // });


    audioRef.current.play()
      .then(() => {
        console.log("ORDER SOUND PLAYING");
      })
      .catch((error) => {
        console.error("ORDER SOUND FAILED:", error.name, error.message);
      });

  };

  const stopOrderAlert = (orderId) => {
    if (orderId) {
      activeOrderIdsRef.current.delete(orderId);
    }

    if (activeOrderIdsRef.current.size === 0 && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const handleOrderHandled = (event) => {
      const { orderId } = event.detail || {};

      if (orderId) {
        stopOrderAlert(orderId);
      }
    };

    window.addEventListener(
      "almighty-order-handled",
      handleOrderHandled
    );

    return () => {
      window.removeEventListener(
        "almighty-order-handled",
        handleOrderHandled
      );
    };
  }, []);


  useEffect(() => {
    return () => {
      unsubscribeRef.current?.();

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Start/stop the alert when the service worker reports an order
  // while this page is minimized or hidden.
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const onSwMessage = (event) => {
      const msg = event.data || {};
      if (msg.source !== "almighty-fcm") return;

      // if (msg.type === "vendor_new_order") {
      //   startOrderAlert(msg.orderId);
      // } else if (msg.type === "vendor_order_handled") {
      //   stopOrderAlert(msg.orderId);
      // }

      if (msg.type === "vendor_new_order") {
        handleNewOrderSound(msg.orderId);
      } else if (msg.type === "vendor_order_handled") {
        stopOrderAlert(msg.orderId);
      }

    };

    navigator.serviceWorker.addEventListener("message", onSwMessage);

    return () => {
      navigator.serviceWorker.removeEventListener("message", onSwMessage);
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

      const testAudio = new Audio("/sounds/notification.mpeg");
      testAudio.volume = 1;

      try {
        await testAudio.play();
        console.log("TEST SOUND PLAYING");
      } catch (error) {
        console.error("TEST SOUND FAILED:", error);
      }
      // Avoid attaching duplicate foreground listeners.
      unsubscribeRef.current?.();

      unsubscribeRef.current = listenForForegroundMessages(
        messaging,
        (payload) => {
          const data = payload.data || {};

          console.log("FOREGROUND FCM MESSAGE:", payload);

          console.log(
            "PAGE VISIBILITY:",
            document.visibilityState
          );

          // if (data.type === "vendor_new_order") {
          //   toast.success(data.title || "New order received", {
          //     duration: 6000,
          //   });

          //   if (data.body) {
          //     toast(data.body, { duration: 6000 });
          //   }

          //   startOrderAlert(data.orderId);
          // } else if (data.type === "vendor_order_handled") {
          //   stopOrderAlert(data.orderId);

          //   console.log("Order handled:", data.orderId);
          // }


          if (data.type === "vendor_new_order") {
            toast.success(data.title || "New order received", {
              duration: 6000,
            });

            if (data.body) {
              toast(data.body, { duration: 6000 });
            }

            handleNewOrderSound(data.orderId);
          } else if (data.type === "vendor_order_handled") {
            stopOrderAlert(data.orderId);
            console.log("Order handled:", data.orderId);
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