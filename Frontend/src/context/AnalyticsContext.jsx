import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { subscribeOrdersAnalytics, subscribeProductsAnalytics } from "../services/analytics.service";
export const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {

    const { vendor , outlet } = useAuth();
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [dateFilter, setDateFilter] = useState("today");


    const [analytics, setAnalytics] = useState({
        salesChart: [],
        topProducts: [],
        peakHours: [],
        sales: 0,
        orders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        cancelledOrders: 0,
        averageOrderValue: 0,
        grossRevenue: 0,
        lowStockProducts: 0
    });


    useEffect(() => {

        if (!outlet?.outletId) return;

        const unsubscribeOrders =
            subscribeOrdersAnalytics(
                outlet.outletId,
                (ordersData) => {
                    setOrders(ordersData);
                }
            );

        const unsubscribeProducts =
            subscribeProductsAnalytics(
                outlet.outletId,
                (productsData) => {
                    setProducts(productsData);
                }
            );

        return () => {
            unsubscribeOrders();
            unsubscribeProducts();
        };

    }, [outlet]);

    useEffect(() => {
        calculateAnalytics(
            orders,
            products,
            dateFilter
        );
    }, [orders, products, dateFilter]);


    const calculateAnalytics = (orders, products, filter) => {
        // console.log("orders:", orders, "products:", products);

        const now = new Date();
        let filteredOrders = [...orders];

        switch (filter) {
            case "today":
                filteredOrders = orders.filter(order => {
                    if (!order.createdAt) return false;
                    const date = order.createdAt.toDate();
                    return date.toDateString() === now.toDateString();
                });
                break;

            case "7days":
                filteredOrders = orders.filter(order => {
                    if (!order.createdAt) return false;
                    const diff =
                        (now - order.createdAt.toDate()) /
                        (1000 * 60 * 60 * 24);
                    return diff <= 7;
                });
                break;

            case "30days":
                filteredOrders = orders.filter(order => {
                    if (!order.createdAt) return false;
                    const diff =
                        (now - order.createdAt.toDate()) /
                        (1000 * 60 * 60 * 24);
                    return diff <= 30;
                });
                break;

            case "month":
                filteredOrders = orders.filter(order => {
                    if (!order.createdAt) return false;
                    const date = order.createdAt.toDate();
                    return (
                        date.getMonth() === now.getMonth() &&
                        date.getFullYear() === now.getFullYear()
                    );
                });
                break;

            case "year":
                filteredOrders = orders.filter(order => {
                    if (!order.createdAt) return false;
                    return (
                        order.createdAt.toDate().getFullYear() ===
                        now.getFullYear()
                    );
                });
                break;

            default:
                filteredOrders = orders;
        }

        const totalSales =
            filteredOrders.reduce(
                (sum, order) =>
                    sum + Number(order.subtotal || 0),
                0
            );

        const totalOrders =
            filteredOrders.length;

        const completedOrders =
            filteredOrders.filter(order =>
                order.status === "delivered"
            ).length;

        const cancelledOrders =
            filteredOrders.filter(order =>
                order.status === "rejected"
            ).length;

        const pendingOrders =
            filteredOrders.filter(order =>

                order.status === "placed" ||

                order.status === "accepted" ||

                order.status === "preparing" ||

                order.status === "order packed"

            ).length;

        const averageOrderValue =
            totalOrders
                ? totalSales / totalOrders
                : 0;

        const grossRevenue =
            totalSales;

        const lowStockProducts =
            products.filter(product =>
                Number(product.stock) <= 5
            ).length;



        const salesMap = {};

        filteredOrders.forEach(order => {
            if (!order.createdAt) return;

            const date = order.createdAt
                .toDate()
                .toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short"
                });

            salesMap[date] = (salesMap[date] || 0) +
                Number(order.subtotal || 0);
        })

        const salesChart =
            Object.keys(salesMap).map(date => ({
                date,
                sales: salesMap[date]
            }));


        const productMap = {};

        filteredOrders.forEach(order => {
            order.items?.forEach(item => {
                if (!productMap[item.id]) {
                    productMap[item.id] = {
                        id: item.id,
                        name: item.name,
                        sold: 0,
                        revenue: 0
                    };
                }

                productMap[item.id].sold += Number(item.qty);

                productMap[item.id].revenue +=
                    Number(item.qty) * Number(item.price);
            });

        });

        const topProducts = Object.values(productMap)
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 5);


        const hourMap = {};

        filteredOrders.forEach(order => {

            if (!order.createdAt) return;

            const hour =
                order.createdAt
                    .toDate()
                    .getHours();

            hourMap[hour] =
                (hourMap[hour] || 0) + 1;

        });

        const peakHours =
            Object.keys(hourMap)
                .map(hour => ({

                    hour: `${hour}:00`,

                    orders: hourMap[hour]

                }))
                .sort(
                    (a, b) =>
                        Number(a.hour.split(":")[0]) -
                        Number(b.hour.split(":")[0])
                );

        setAnalytics({
            sales: totalSales,
            orders: totalOrders,
            completedOrders,
            pendingOrders,
            cancelledOrders,
            averageOrderValue,
            grossRevenue,
            lowStockProducts,
            salesChart,
            topProducts,
            peakHours
        });

    }


    return (
        <AnalyticsContext.Provider
            value={{ ...analytics, dateFilter, setDateFilter }}
        >
            {children}
        </AnalyticsContext.Provider>
    );
}