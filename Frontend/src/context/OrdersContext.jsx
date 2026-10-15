// import { createContext, useEffect, useRef, useState } from "react";

// import toast from "react-hot-toast";

// import { subscribeOrders } from "../services/order.service";
// import { playNotification } from "../utils/playNotification";
// import { useAuth } from "../hooks/useAuth";

// export const OrdersContext = createContext();

// export const OrdersProvider = ({ children }) => {

//     const { outlet } = useAuth();

//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const previousOrders = useRef(new Set());
//     const initialLoad = useRef(true);

//     useEffect(() => {

//         if (!outlet?.outletId) {

//             setOrders([]);
//             setLoading(false);

//             return;
//         }

//         // Reset when outlet changes
//         previousOrders.current = new Set();
//         initialLoad.current = true;

//         const unsubscribe = subscribeOrders(
//             outlet.outletId,

//             (newOrders) => {

//                 // ==========================================
//                 // INITIAL LOAD
//                 // ==========================================

//                 if (initialLoad.current) {

//                     newOrders.forEach(order => {

//                         previousOrders.current.add(order.id);

//                     });

//                     initialLoad.current = false;

//                 }

//                 // ==========================================
//                 // NEW ORDERS
//                 // ==========================================

//                 else {

//                     newOrders.forEach(order => {

//                         if (
//                             !previousOrders.current.has(order.id)
//                         ) {
//                             console.log(
//                                 "🆕 NEW ORDER:",
//                                 order.orderId
//                             );

//                             playNotification();

//                             toast.success(
//                                 `New Order #${order.orderId}`
//                             );

//                             if (
//                                 Notification.permission === "granted"
//                             ) {

//                                 new Notification(
//                                     "New Order",
//                                     {
//                                         body:
//                                             `Order #${order.orderId} • ₹${order.total}`
//                                     }
//                                 );

//                             }

//                         }

//                         previousOrders.current.add(order.id);

//                     });

//                 }

//                 // ==========================================
//                 // UPDATE UI
//                 // ==========================================

//                 setOrders(newOrders);
//                 setLoading(false);

//             }
//         );

//         return unsubscribe;

//     }, [outlet?.outletId]);


//     return (

//         <OrdersContext.Provider
//             value={{
//                 orders,
//                 loading
//             }}
//         >

//             {children}

//         </OrdersContext.Provider>

//     );

// };




// new-10-10-26


import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { subscribeOrders } from "../services/order.service";
import {
    playNotification,
    playNotificationOnce,
    stopNotification
} from "../utils/playNotification";
import { useAuth } from "../hooks/useAuth";
import { STATUS } from "../utils/orderStatus";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
    const { outlet } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const previousOrders = useRef(new Set());
    const initialLoad = useRef(true);

    useEffect(() => {
        if (!outlet?.outletId) {
            stopNotification();
            setOrders([]);
            setLoading(false);

            return;
        }

        // Reset when the outlet or auto-accept setting changes.
        previousOrders.current = new Set();
        initialLoad.current = true;
        setLoading(true);

        const unsubscribe = subscribeOrders(
            outlet.outletId,
            (newOrders) => {
                // Detect newly created orders for one-time notifications.
                if (initialLoad.current) {
                    newOrders.forEach((order) => {
                        previousOrders.current.add(order.id);
                    });

                    initialLoad.current = false;
                } else {
                    newOrders.forEach((order) => {
                        const isNewOrder =
                            !previousOrders.current.has(order.id);

                        // if (isNewOrder) {
                        //     previousOrders.current.add(order.id);

                        //     // Notify only for orders requiring manual action.
                        //     if (
                        //         !outlet.autoAcceptOrders &&
                        //         order.status === STATUS.PLACED
                        //     ) {
                        //         console.log(
                        //             "NEW MANUAL ORDER:",
                        //             order.orderId
                        //         );

                        //         toast.success(
                        //             `New Order #${order.orderId}`
                        //         );

                        //         if (
                        //             "Notification" in window &&
                        //             Notification.permission === "granted"
                        //         ) {
                        //             new Notification("New Order", {
                        //                 body: `Order #${order.orderId} • ₹${order.total}`
                        //             });
                        //         }
                        //     }
                        // }


                        if (isNewOrder) {
                            previousOrders.current.add(order.id);

                            console.log("NEW ORDER DETECTED:", {
                                orderId: order.orderId,
                                status: order.status,
                                autoAcceptOrders: outlet.autoAcceptOrders
                            });

                            if (outlet.autoAcceptOrders) {
                                // Auto-accept ON: notify once, even if already confirmed.
                                toast.success(
                                    `New Order #${order.orderId} — Auto-accept is ON`
                                );

                                playNotificationOnce();

                                if (
                                    "Notification" in window &&
                                    Notification.permission === "granted"
                                ) {
                                    new Notification("New Order Received", {
                                        body: `Order #${order.orderId} — Auto-accept is ON.`
                                    });
                                }
                            } else if (order.status === STATUS.PLACED) {
                                // Manual acceptance: notify once here.
                                // The repeating sound is handled by the existing logic.
                                toast.success(`New Order #${order.orderId}`);

                                if (
                                    "Notification" in window &&
                                    Notification.permission === "granted"
                                ) {
                                    new Notification("New Order", {
                                        body: `Order #${order.orderId} • ₹${order.total}`
                                    });
                                }
                            }
                        }


                    });
                }

                // Keep ringing while any order awaits manual action.
                const hasPendingManualOrders =
                    !outlet.autoAcceptOrders &&
                    newOrders.some(
                        (order) => order.status === STATUS.PLACED
                    );

                if (hasPendingManualOrders) {
                    playNotification();
                } else {
                    stopNotification();
                }

                setOrders(newOrders);
                setLoading(false);
            }
        );

        return () => {
            unsubscribe();
            stopNotification();
        };
    }, [outlet?.outletId, outlet?.autoAcceptOrders]);

    return (
        <OrdersContext.Provider
            value={{
                orders,
                loading
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
};
