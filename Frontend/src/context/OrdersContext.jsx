import { createContext, useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import { subscribeOrders } from "../services/order.service";
import { playNotification } from "../utils/playNotification";
import { useAuth } from "../hooks/useAuth";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {

    const { outlet } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const previousOrders = useRef(new Set());
    const initialLoad = useRef(true);

    useEffect(() => {

        if (!outlet?.outletId) {

            setOrders([]);
            setLoading(false);

            return;
        }

        // Reset when outlet changes
        previousOrders.current = new Set();
        initialLoad.current = true;

        const unsubscribe = subscribeOrders(
            outlet.outletId,

            (newOrders) => {

                // ==========================================
                // INITIAL LOAD
                // ==========================================

                if (initialLoad.current) {

                    newOrders.forEach(order => {

                        previousOrders.current.add(order.id);

                    });

                    initialLoad.current = false;

                }

                // ==========================================
                // NEW ORDERS
                // ==========================================

                else {

                    newOrders.forEach(order => {

                        if (
                            !previousOrders.current.has(order.id)
                        ) {
                            console.log(
                                "🆕 NEW ORDER:",
                                order.orderId
                            );

                            playNotification();

                            toast.success(
                                `New Order #${order.orderId}`
                            );

                            if (
                                Notification.permission === "granted"
                            ) {

                                new Notification(
                                    "New Order",
                                    {
                                        body:
                                            `Order #${order.orderId} • ₹${order.total}`
                                    }
                                );

                            }

                        }

                        previousOrders.current.add(order.id);

                    });

                }

                // ==========================================
                // UPDATE UI
                // ==========================================

                setOrders(newOrders);
                setLoading(false);

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