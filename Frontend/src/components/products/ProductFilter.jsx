const filters = [

    "All",
    "Available",
    "Unavailable"

];

const ProductFilters = ({ filter, setFilter }) => {

    return (

        <div className="flex gap-3 mb-6">
            {
                filters.map(item => (
                    <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`px-2 py-0 rounded-lg
                        ${filter === item ?

                                "bg-primary-bg2-color text-black"
                                :
                                "border"

                            }`}
                    >
                        {item}
                    </button>
                ))
            }
        </div>

    )

}

export default ProductFilters;