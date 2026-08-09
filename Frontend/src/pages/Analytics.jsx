import OverviewCards from "../components/analytics/OverviewCards";
import PeakHours from "../components/analytics/PeakHours";
import SalesChart from "../components/analytics/SalesChart";
import TopProducts from "../components/analytics/TopProducts";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import { useAnalytics } from "../hooks/useAnalytics";

const Analytics = () => {

    const { dateFilter, setDateFilter } = useAnalytics();

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-slate-50">
            <Sidebar />

            <div className="flex flex-col w-full">
                <Header />

                <div className="w-full h-[90vh] overflow-auto p-6">
                    <div className="mb-6 flex flex-wrap gap-3">

                        {
                            [
                                ["today", "Today"],
                                ["7days", "7 Days"],
                                ["30days", "30 Days"],
                                ["month", "This Month"],
                                ["year", "This Year"]
                            ].map(([value, label]) => (

                                <button
                                    key={value}
                                    onClick={() => setDateFilter(value)}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition ${dateFilter === value
                                        ? "bg-primary-bg2-color text-black"
                                        : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                >
                                    {label}
                                </button>

                            ))
                        }

                    </div>
                    <div className="flex flex-col gap-4">
                        <OverviewCards />
                        <SalesChart />
                        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <TopProducts />
                            <PeakHours />
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default Analytics;