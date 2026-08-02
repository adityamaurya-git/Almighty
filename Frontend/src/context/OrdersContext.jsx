import {
    createContext,
    useEffect,
    useRef,
    useState
} from "react";

import toast from "react-hot-toast";

import { subscribeOrders } from "../services/order.service";
import { playNotification } from "../utils/playNotification";
import { useAuth } from "../hooks/useAuth";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {

    const { vendor } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const previousOrders = useRef(new Set());
    const initialLoad = useRef(true);

    useEffect(() => {

        if (!vendor?.id) {
            setOrders([]);
            setLoading(false);
            return;
        }

        const unsubscribe = subscribeOrders(
            vendor.id,
            (newOrders) => {

                if (initialLoad.current) {

                    newOrders.forEach(order => {
                        previousOrders.current.add(order.id);
                    });

                    initialLoad.current = false;

                } else {

                    newOrders.forEach(order => {

                        if (!previousOrders.current.has(order.id)) {

                            playNotification();

                            toast.success(
                                `New Order #${order.orderId}`
                            );

                            if (
                                Notification.permission === "granted"
                            ) {

                                new Notification("New Order", {

                                    body:
                                        `Order #${order.orderId} • ₹${order.total}`

                                });

                            }

                        }

                        previousOrders.current.add(order.id);

                    });

                }

                setOrders(newOrders);

                setLoading(false);

            }
        );

        return unsubscribe;

    }, [vendor]);

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