const StatCard = ({ title, value }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
                {title}
            </p>

            <h1 className="text-3xl font-bold mt-3">
                {value}
            </h1>
        </div>
    );

};

export default StatCard;