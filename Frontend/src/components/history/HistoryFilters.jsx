const filters = [

    "All",
    "delivered",
    "cancelled",
    "rejected",
    "picked_up"

];

const HistoryFilters = ({ status, setStatus }) => {

    return (
        <div className="flex gap-3">
            {
                filters.map(filter=>(
                    <button
                        key={filter}
                        onClick={()=>setStatus(filter)}
                        className={`px-4 py-2 rounded-lg
                        ${status===filter ?

                        "bg-primary-bg2-color text-black"
                        :
                        "bg-white border"
                        }`}

                    >

                        {filter}
                    </button>
                ))
            }
        </div>
    );

};

export default HistoryFilters;