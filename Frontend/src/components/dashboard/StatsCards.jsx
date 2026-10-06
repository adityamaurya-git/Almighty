import DashboardCard from "./DashboardCards";

const StatsCards = ({ stats, statsFilter,
    setStatsFilter, }) => {
    console.log(stats);

    return (
        <>

            <div className="mb-5 flex gap-2">

                <button
                    onClick={() => setStatsFilter("today")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${statsFilter === "today"
                            ? "bg-primary-bg2-color text-black"
                            : "bg-white border"
                        }`}
                >
                    Today
                </button>

                <button
                    onClick={() => setStatsFilter("week")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${statsFilter === "week"
                            ? "bg-primary-bg2-color text-black"
                            : "bg-white border"
                        }`}
                >
                    Weekly
                </button>

                <button
                    onClick={() => setStatsFilter("month")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${statsFilter === "month"
                            ? "bg-primary-bg2-color text-black"
                            : "bg-white border"
                        }`}
                >
                    Monthly
                </button>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">

                <DashboardCard
                    title="Revenue"
                    value={`₹${stats.revenue}`}
                />

                <DashboardCard
                    title="Today's Orders"
                    value={stats.todayOrders}
                />

                <DashboardCard
                    title="Pending"
                    value={stats.pending}
                />

                <DashboardCard
                    title="Delivered"
                    value={stats.completed}
                />

                <DashboardCard
                    title="Rejected"
                    value={stats.rejected}
                />

            </div>

        </>
    );

};

export default StatsCards;