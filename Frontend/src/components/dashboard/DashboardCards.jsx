const DashboardCard = ({ title, value, color }) => {

    return (

        <div className="rounded-2xl bg-white p-5 shadow transition hover:shadow-lg sm:p-6">
            <p className="text-gray-500">
                {title}
            </p>

            <h1  className={`mt-3 text-3xl font-bold sm:text-4xl ${color}`}>
                {value}
            </h1>
        </div>

    );

};

export default DashboardCard;