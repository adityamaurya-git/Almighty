import {

    ResponsiveContainer,

    BarChart,

    Bar,

    XAxis,

    YAxis,

    Tooltip,

    CartesianGrid

} from "recharts";

import { useAnalytics } from "../../hooks/useAnalytics";

const PeakHours = () => {

    const { peakHours } = useAnalytics();

    return (

        <div className="rounded-lg bg-white shadow border border-primary-bg2-color p-6">

            <h2 className="text-xl font-bold mb-6">

                Peak Order Hours

            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={peakHours}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="hour" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="orders"
                        fill="#ef4444"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

};

export default PeakHours;