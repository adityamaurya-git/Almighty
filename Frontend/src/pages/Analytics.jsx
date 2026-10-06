import OverviewCards from "../components/analytics/OverviewCards";
import PeakHours from "../components/analytics/PeakHours";
import SalesChart from "../components/analytics/SalesChart";
import TopProducts from "../components/analytics/TopProducts";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import { useAnalytics } from "../hooks/useAnalytics";

const Analytics = () => {

    const {
        dateFilter,
        setDateFilter,
        customStartDate,
        customEndDate,
        setCustomStartDate,
        setCustomEndDate
    } = useAnalytics();

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-slate-50">
            <Sidebar />

            <div className="flex flex-col w-full">
                <Header />

                <div className="w-full h-[90vh] overflow-auto p-6">

                    {/* <div className="mb-6 flex flex-wrap gap-3">

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

                    </div> */}


                    <div className="mb-6">

                        {/* FILTER BUTTONS */}
                        <div className="flex flex-wrap gap-3">

                            {[
                                ["today", "Today"],
                                ["7days", "Last 7 Days"],
                                ["30days", "Last 30 Days"],
                                ["month", "This Month"],
                                ["custom", "Custom"]
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

                            ))}

                        </div>


                        {/* CUSTOM DATE SELECTOR */}
                        {dateFilter === "custom" && (

                            <div className="mt-4 flex flex-wrap items-end gap-4">

                                {/* START DATE */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        From
                                    </label>

                                    <input
                                        type="date"
                                        value={customStartDate}
                                        onChange={(e) =>
                                            setCustomStartDate(e.target.value)
                                        }
                                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary-bg2-color"
                                    />
                                </div>


                                {/* END DATE */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        To
                                    </label>

                                    <input
                                        type="date"
                                        value={customEndDate}
                                        min={customStartDate || undefined}
                                        onChange={(e) =>
                                            setCustomEndDate(e.target.value)
                                        }
                                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary-bg2-color"
                                    />
                                </div>

                            </div>

                        )}

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