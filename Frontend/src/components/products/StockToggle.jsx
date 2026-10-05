const StockToggle = ({ product, onToggle }) => {

    // console.log("🔥 PRODUCT IN STOCK TOGGLE:", product);
    return (
        <button
            onClick={onToggle}
            className={` rounded-lg text-sm px-2 py-1 absolute bottom-2 right-2 cursor-pointer text-white

                ${
                    product.available
                    ?
                    "bg-green-600"
                    :
                    "bg-red-600"
                }
            `}
        >
            {
                product.available
                ?
                "In Stock"
                :
                "Out of Stock"
            }
        </button>
    );
};

export default StockToggle;