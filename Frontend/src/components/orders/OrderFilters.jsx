const filters = [
    "All",
    "order placed",
    "confirmed",
    "order packed",
    "picked_up",
    "delivered",
    "rejected"
];

const OrderFilters = ({ selected, setSelected }) => {

    return (
        <div className="flex flex-nowrap gap-3 overflow-x-auto pb-1 sm:flex-wrap">
            {
                filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setSelected(filter)}
                        className={`shrink-0 rounded-lg px-4 py-2 transition
                        ${selected === filter
                            ? "bg-primary-bg2-color text-black"
                            : "bg-white border"
                        }`}
                    >
                        {filter}
                    </button>
                ))
            }
        </div>
    );

};

export default OrderFilters;