const filters = [

    {
        label: "Today",
        value: "today"
    },

    {
        label: "Last 7 Days",
        value: "week"
    },

    {
        label: "This Month",
        value: "month"
    },

    {
        label: "All",
        value: "all"
    }

];

const DateFilters = ({ dateFilter, setDateFilter }) => {

    return (

        <div className="flex gap-3 flex-wrap mb-4">
            {
                filters.map(filter=>(
                    <button
                        key={filter.value}
                        onClick={()=>setDateFilter(filter.value)}
                        className={`px-4 py-2 rounded-lg transition
                        ${dateFilter===filter.value
                        ?
                        "bg-primary-bg2-color text-black"
                        :
                        "bg-white border"
                        }`}
                    >
                        {filter.label}
                    </button>
                ))
            }
        </div>
    );

};

export default DateFilters;