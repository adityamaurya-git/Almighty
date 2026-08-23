import { useAnalytics } from "../../hooks/useAnalytics";

const OverviewCards = () => {

    const analytics = useAnalytics();
    // console.log("analytics", analytics);

    const cards = [

        {
            title: "Total Sales",
            value: `₹${analytics.sales}`
        },

        {
            title: "Total Orders",
            value: analytics.orders
        },

        {
            title: "Completed Orders",
            value: analytics.completedOrders
        },

        {
            title: "Pending Orders",
            value: analytics.pendingOrders
        },

        {
            title: "Cancelled Orders",
            value: analytics.cancelledOrders
        },

        {
            title: "Average Order Value",
            value: `₹${analytics.averageOrderValue.toFixed(2)}`
        },

        {
            title: "Gross Revenue",
            value: `₹${analytics.grossRevenue}`
        },

        {
            title: "Low Stock Products",
            value: analytics.lowStockProducts
        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {
                cards.map(card => (
                    <div
                        key={card.title}
                        className="rounded-lg bg-white shadow border border-primary-bg2-color p-5"
                    >
                        <p className="text-sm text-gray-500">
                            {card.title}
                        </p>

                        <h2 className="mt-3 text-3xl font-bold">
                            {card.value}
                        </h2>
                    </div>
                ))
            }
        </div>

    );

};

export default OverviewCards;