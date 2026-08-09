import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useAnalytics } from "../../hooks/useAnalytics";

const SalesChart = () => {

    const { salesChart } = useAnalytics();

    return (

        <div className="rounded-xl bg-white shadow border-primary-bg2-color border p-6">

            <h2 className="text-xl font-bold mb-6">

                Sales Overview

            </h2>

            

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart data={salesChart}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line

                        type="monotone"

                        dataKey="sales"

                        stroke="#ef4444"

                        strokeWidth={3}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default SalesChart;