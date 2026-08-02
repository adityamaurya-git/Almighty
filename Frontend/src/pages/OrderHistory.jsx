import { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Header from "../components/dashboard/Header";
import HistoryHeader from "../components/history/HistoryHeader";
import HistoryFilters from "../components/history/HistoryFilters";
import HistoryTable from "../components/history/HistoryTable";
import { useAuth } from "../hooks/useAuth";
import { useOrders } from "../hooks/useOrders";
import Sidebar from "../components/dashboard/Sidebar";
import DateFilters from "../components/history/DataFilters";
import Pagination from "../components/history/Pagination";

const OrderHistory = () => {

    const { vendor } = useAuth();
    const { orders, loading } = useOrders();


    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [dateFilter, setDateFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const historyOrders = useMemo(() => {

        let filtered = orders.filter(order =>
            [
                "picked_up",
                "delivered",
                "rejected",
                "cancelled"

            ].includes(order.status)
        );

        if (status !== "All") {
            filtered = filtered.filter(
                order => order.status === status
            );
        }

        if (search.trim() !== "") {
            const text = search.toLowerCase();
            filtered = filtered.filter(order =>
                order.orderId?.toLowerCase().includes(text) ||
                order.customerName?.toLowerCase().includes(text) ||
                order.customerPhone?.includes(text) ||
                order.riderName?.toLowerCase().includes(text) ||
                order.paymentStatus?.toLowerCase().includes(text) ||
                order.status?.toLowerCase().includes(text)
            );
        }


        const now = new Date();

        filtered = filtered.filter(order => {

            if (dateFilter === "all") return true;


            const orderDate = order.createdAt.toDate();
            if (dateFilter === "today") {
                return orderDate.toDateString() === now.toDateString();
            }

            if (dateFilter === "week") {
                const week = new Date();
                week.setDate(now.getDate() - 7);
                return orderDate >= week;
            }

            if (dateFilter === "month") {
                return (
                    orderDate.getMonth() === now.getMonth()
                    &&
                    orderDate.getFullYear() === now.getFullYear()
                );
            }
            return true;
        });


        filtered.sort((a, b) =>
            b.createdAt.seconds -
            a.createdAt.seconds
        );


        return filtered;
    }, [orders, status, search, dateFilter]);


    const paginatedOrders = useMemo(() => {

        const start = (currentPage - 1) * pageSize;

        return historyOrders.slice(
            start,
            start + pageSize
        );

    }, [historyOrders, currentPage ]);

    return (<>

        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <div className="flex flex-col w-full">
                <Header orders={orders} />

                <div className="p-6">

                    <DateFilters dateFilter={dateFilter} setDateFilter={setDateFilter} />

                    <div className="flex justify-between items-center pb-4">
                        <HistoryFilters
                            status={status}
                            setStatus={setStatus}
                        />

                        <HistoryHeader search={search} setSearch={setSearch} />
                    </div>

                    <HistoryTable
                        loading={loading}
                        orders={paginatedOrders}
                    />

                    <Pagination 
                        total={historyOrders.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage} />
                </div>
            </div>
            
        </div>

    </>);

};

export default OrderHistory;