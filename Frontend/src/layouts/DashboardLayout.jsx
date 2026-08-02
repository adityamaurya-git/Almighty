import { useMemo, useState } from "react";
import EmptyState from "../components/dashboard/EmptyState";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import StatsCards from "../components/dashboard/StatsCards";
import OrderList from "../components/orders/OrderList";
import { useAuth } from "../hooks/useAuth";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useOrders } from "../hooks/useOrders";
import OrderFilters from "../components/orders/OrderFilters";
import { isToday } from "../utils/date.utils";

const DashboardLayout = ({ children }) => {

    const { vendor, logoutVendor } = useAuth();
    const {orders , loading } = useOrders();

    const [selectedFilter , setSelectedFilter] = useState("All");
    const [statsFilter, setStatsFilter] = useState("today");


    const filteredOrders = useMemo(() => {

        const today = new Date();
        const todaysOrders = orders.filter(order => {

            if (!order.createdAt) return false;
            const orderDate = order.createdAt.toDate();

            return (
                orderDate.getDate() === today.getDate() &&
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear()
            );

        });

        if (selectedFilter === "All") {
            return todaysOrders;
        }

        return todaysOrders.filter(order =>
            order.status.toLowerCase() ===
            selectedFilter.toLowerCase()
        );

    }, [orders, selectedFilter]);


    const statsOrders = useMemo(() => {
    const now = new Date();

    return orders.filter((order) => {
        if (!order.createdAt) return false;

        const orderDate = order.createdAt.toDate();

        switch (statsFilter) {

            case "today":
                return (
                    orderDate.getDate() === now.getDate() &&
                    orderDate.getMonth() === now.getMonth() &&
                    orderDate.getFullYear() === now.getFullYear()
                );

            case "week": {
                const start = new Date(now);
                start.setHours(0, 0, 0, 0);

                const day = start.getDay();
                const diff = day === 0 ? 6 : day - 1;

                start.setDate(start.getDate() - diff);

                return orderDate >= start;
            }

            case "month":
                return (
                    orderDate.getMonth() === now.getMonth() &&
                    orderDate.getFullYear() === now.getFullYear()
                );

            default:
                return true;
        }
    });

    }, [orders, statsFilter]);

    const stats = useDashboardStats(statsOrders);


    return (<>
        <div className="flex min-h-screen w-full flex-col bg-white lg:flex-row">

            {/* Sidebar */}
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <Header />

                <div className="h-[90vh] w-full overflow-auto p-4 sm:p-6 lg:p-8">
                    
                    <StatsCards
                        stats={stats}
                        statsFilter={statsFilter}
                        setStatsFilter={setStatsFilter}
                    />
                    <div className="mt-6 space-y-4 sm:mt-8">
                        <OrderFilters selected={selectedFilter} setSelected={setSelectedFilter} />
                        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">Live Orders</h2>
                        {
                            loading ? <p>Loading Orders...</p>
                            :
                            <OrderList orders={filteredOrders} />
                        }
                        
                    </div>
                </div>

            </div>
            {/* Main Content */}
    
        </div>
        
    </>);
};

export default DashboardLayout;