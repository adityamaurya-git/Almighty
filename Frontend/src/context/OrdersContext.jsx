import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
    subscribeOrders,
    updateOrderStatus
} from "../services/order.service";

import { playNotification } from "../utils/playNotification";
import { useAuth } from "../hooks/useAuth";
import { STATUS } from "../utils/orderStatus";

export const OrdersContext = createContext();

const ordersProviderInstance =
    Math.random().toString(36).substring(2, 8);



export const OrdersProvider = ({ children }) => {

    const { outlet } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const previousOrders = useRef(new Set());
    const autoAcceptingOrders = useRef(new Set());
    const autoAcceptRef = useRef(false);
    const initialLoad = useRef(true);

    // Keep latest setting
    useEffect(() => {

        autoAcceptRef.current =
            outlet?.autoAcceptOrders === true;

    }, [outlet?.autoAcceptOrders]);


    useEffect(() => {

        if (!outlet?.outletId) {

            setOrders([]);
            setLoading(false);

            return;
        }

        setLoading(true);

        const unsubscribe = subscribeOrders(
            outlet.outletId,
            async (newOrders) => {

                /*
                =========================================
                UPDATE UI
                =========================================
                */

                setOrders(newOrders);
                setLoading(false);


                /*
                =========================================
                PROCESS NEW ORDERS
                =========================================
                */

                if (initialLoad.current) {

                    newOrders.forEach(order => {
                        previousOrders.current.add(order.id);
                    });

                    initialLoad.current = false;

                    return;
                }


                for (const order of newOrders) {

                    const isNewOrder =
                        !previousOrders.current.has(order.id);

                    if (!isNewOrder) {
                        continue;
                    }


                    // Mark immediately
                    previousOrders.current.add(order.id);


                    console.log(
                        "🆕 NEW ORDER:",
                        order.orderId
                    );


                    /*
                    =====================================
                    AUTO ACCEPT
                    =====================================
                    */

                    if (
                        autoAcceptRef.current === true &&
                        order.status === STATUS.PLACED &&
                        !autoAcceptingOrders.current.has(order.id)
                    ) {

                        autoAcceptingOrders.current.add(
                            order.id
                        );

                        playNotification();

                        toast.success(
                            `New Order #${order.orderId}`
                        );


                        console.log(
                            "🔥 AUTO ACCEPTING:",
                            order.orderId
                        );

                        try {

                            await updateOrderStatus(
                                order,
                                STATUS.CONFIRMED
                            );

                            console.log(
                                "✅ AUTO ACCEPTED:",
                                order.orderId
                            );

                        } catch (error) {

                            console.error(
                                "❌ AUTO ACCEPT FAILED:",
                                error
                            );

                            autoAcceptingOrders.current.delete(
                                order.id
                            );

                        }

                        continue;
                    }


                    /*
                    =====================================
                    MANUAL ORDER
                    =====================================
                    */

                    if (
                        order.status === STATUS.PLACED
                    ) {

                        console.log(
                            "ℹ️ Manual acceptance required:",
                            order.orderId
                        );

                        playNotification();

                        toast.success(
                            `New Order #${order.orderId}`
                        );

                    }

                }

            }
        );

        return unsubscribe;

    }, [outlet?.outletId]);


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



// export const OrdersProvider = ({ children }) => {

//     const { outlet } = useAuth();

//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const previousOrders = useRef(new Set());
//     const initialLoad = useRef(true);
//     const subscriptionId = useRef(0);
//     const autoAcceptingOrders = useRef(new Set());

//     // useEffect(() => {

//     //     // ==========================================
//     //     // WAIT FOR OUTLET
//     //     // ==========================================

//     //     if (!outlet?.outletId) {

//     //         setOrders([]);
//     //         setLoading(false);

//     //         return;
//     //     }


//     //     // ==========================================
//     //     // RESET WHEN OUTLET CHANGES
//     //     // ==========================================

//     //     previousOrders.current = new Set();
//     //     initialLoad.current = true;


//     //     // ==========================================
//     //     // SUBSCRIBE TO ORDERS
//     //     // ==========================================

//     //     const unsubscribe = subscribeOrders(
//     //         outlet.outletId,

//     //         async (newOrders) => {

//     //             // ======================================
//     //             // FIRST LOAD
//     //             // ======================================

//     //             if (initialLoad.current) {

//     //                 newOrders.forEach(order => {

//     //                     previousOrders.current.add(
//     //                         order.id
//     //                     );

//     //                 });

//     //                 initialLoad.current = false;

//     //             }


//     //             // ======================================
//     //             // NEW ORDERS
//     //             // ======================================

//     //             else {

//     //                 for (const order of newOrders) {

//     //                     // --------------------------------
//     //                     // Check if this is a new order
//     //                     // --------------------------------

//     //                     const isNewOrder =
//     //                         !previousOrders.current.has(
//     //                             order.id
//     //                         );


//     //                     if (!isNewOrder) {
//     //                         continue;
//     //                     }


//     //                     // ==================================
//     //                     // NOTIFICATION
//     //                     // ==================================

//     //                     playNotification();

//     //                     toast.success(
//     //                         `New Order #${order.orderId}`
//     //                     );


//     //                     if (
//     //                         Notification.permission ===
//     //                         "granted"
//     //                     ) {

//     //                         new Notification(
//     //                             "New Order",
//     //                             {
//     //                                 body:
//     //                                     `Order #${order.orderId} • ₹${order.total}`
//     //                             }
//     //                         );

//     //                     }


//     //                     // ==========================================
//     //                     // AUTO ACCEPT DEBUG
//     //                     // ==========================================

//     //                     console.log("========== AUTO ACCEPT CHECK ==========");

//     //                     console.log("Order ID:", order.id);

//     //                     console.log("Order status:", order.status);

//     //                     console.log(
//     //                         "Outlet autoAcceptOrders:",
//     //                         outlet.autoAcceptOrders
//     //                     );

//     //                     console.log(
//     //                         "Outlet autoAcceptOrders type:",
//     //                         typeof outlet.autoAcceptOrders
//     //                     );

//     //                     console.log(
//     //                         "Is new order:",
//     //                         isNewOrder
//     //                     );

//     //                     console.log(
//     //                         "Outlet ID:",
//     //                         outlet.outletId
//     //                     );

//     //                     console.log("======================================");


//     //                     if (
//     //                         isNewOrder &&
//     //                         outlet.autoAcceptOrders === true &&
//     //                         order.status === STATUS.PLACED
//     //                     ) {

//     //                         console.log(
//     //                             "🔥 AUTO ACCEPT CONDITION PASSED"
//     //                         );

//     //                         try {

//     //                             await updateOrderStatus(
//     //                                 order,
//     //                                 STATUS.CONFIRMED
//     //                             );

//     //                             console.log(
//     //                                 "✅ ORDER AUTO ACCEPTED:",
//     //                                 order.id
//     //                             );

//     //                         } catch (error) {

//     //                             console.error(
//     //                                 "❌ AUTO ACCEPT FAILED:",
//     //                                 error
//     //                             );

//     //                         }

//     //                     } else {

//     //                         console.log(
//     //                             "❌ AUTO ACCEPT CONDITION FAILED"
//     //                         );

//     //                     }

//     //                 }

//     //             }


//     //             // ======================================
//     //             // UPDATE PREVIOUS ORDERS
//     //             // ======================================

//     //             newOrders.forEach(order => {

//     //                 previousOrders.current.add(
//     //                     order.id
//     //                 );

//     //             });


//     //             // ======================================
//     //             // UPDATE STATE
//     //             // ======================================

//     //             setOrders(newOrders);
//     //             setLoading(false);

//     //         }
//     //     );


//     //     // ==========================================
//     //     // CLEANUP
//     //     // ==========================================

//     //     return () => {

//     //         unsubscribe();

//     //     };

//     // }, [
//     //     outlet?.outletId,
//     //     outlet?.autoAcceptOrders
//     // ]);


//     useEffect(() => {

//         const currentSubscriptionId = ++subscriptionId.current;

//         if (!outlet?.outletId) {

//             setOrders([]);
//             setLoading(false);

//             return;
//         }


//         // ==========================================
//         // RESET FOR NEW OUTLET
//         // ==========================================

//         previousOrders.current = new Set();
//         initialLoad.current = true;


//         // ==========================================
//         // SUBSCRIBE TO ORDERS
//         // ==========================================

//         console.log(
//             "📡 ORDERS PROVIDER SUBSCRIBING:",
//             ordersProviderInstance
//         );

//         const unsubscribe = subscribeOrders(
//             outlet.outletId,

//             async (newOrders) => {

//                 // if(currentSubscriptionId !== subscriptionId.current) {
//                 //     return;
//                 // }

//                 // ======================================
//                 // INITIAL LOAD
//                 // ======================================

//                 if (initialLoad.current) {

//                     newOrders.forEach(order => {
//                         previousOrders.current.add(order.id);
//                     });

//                     initialLoad.current = false;

//                     setOrders(newOrders);
//                     setLoading(false);

//                     return;
//                 }


//                 // ======================================
//                 // PROCESS CHANGES
//                 // ======================================

//                 for (const order of newOrders) {

//                     const isNewOrder =
//                         !previousOrders.current.has(order.id);


//                     // ==================================
//                     // NEW ORDER
//                     // ==================================

//                     if (isNewOrder) {

//                         console.log(
//                             "🆕 NEW ORDER:",
//                             order.orderId,
//                             "| Provider:",
//                             ordersProviderInstance
//                         );


//                         // --------------------------------
//                         // NOTIFICATION
//                         // --------------------------------

//                         playNotification();

//                         toast.success(
//                             `New Order #${order.orderId}`
//                         );


//                         if (
//                             Notification.permission === "granted"
//                         ) {

//                             new Notification(
//                                 "New Order",
//                                 {
//                                     body:
//                                         `Order #${order.orderId} • ₹${order.total}`
//                                 }
//                             );

//                         }


//                         // ==================================
//                         // AUTO ACCEPT
//                         // ==================================

//                         if (
//                             outlet.autoAcceptOrders === true &&
//                             order.status === STATUS.PLACED
//                         ) {

//                             console.log(
//                                 "🔥 AUTO ACCEPTING:",
//                                 order.orderId,
//                                 "| Provider:",
//                                 ordersProviderInstance
//                             );


//                             try {

//                                 await updateOrderStatus(
//                                     order,
//                                     STATUS.CONFIRMED
//                                 );


//                                 console.log(
//                                     "✅ AUTO ACCEPTED:",
//                                     order.orderId
//                                 );

//                             }
//                             catch (error) {

//                                 console.error(
//                                     "❌ AUTO ACCEPT FAILED:",
//                                     error
//                                 );

//                             }

//                         }
//                         else {

//                             console.log(
//                                 "ℹ️ Manual acceptance required:",
//                                 order.orderId
//                             );

//                         }


//                         // --------------------------------
//                         // IMPORTANT
//                         // --------------------------------

//                         previousOrders.current.add(
//                             order.id
//                         );

//                     }

//                 }


//                 // ======================================
//                 // UPDATE UI
//                 // ======================================

//                 setOrders(newOrders);
//                 setLoading(false);

//             }
//         );


//         return unsubscribe;

//     }, [outlet?.outletId, outlet?.autoAcceptOrders]);

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