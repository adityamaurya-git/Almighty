const StockToggle = ({ product, onToggle }) => {

    return (
        <button
            onClick={onToggle}
            className={` rounded-lg text-sm px-2 py-1 absolute bottom-2 right-2 cursor-pointer text-white

                ${
                    product.status==="active"
                    ?
                    "bg-green-600"
                    :
                    "bg-red-600"
                }
            `}
        >
            {
                product.status==="active"
                ?
                "In Stock"
                :
                "Out of Stock"
            }
        </button>
    );
};

export default StockToggle;