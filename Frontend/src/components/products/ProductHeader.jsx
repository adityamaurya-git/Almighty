import { FiSearch } from "react-icons/fi";

const ProductHeader = ({ search, setSearch , openModal }) => {

    return (

        <div className="flex items-center justify-between mb-6">
            {/* <h1 className="text-2xl font-bold"> Products </h1> */}

            <div className="flex gap-4">
                <div className="relative">
                    <FiSearch className="absolute left-4 top-4" />
                    <input
                        className="border rounded-lg py-3 pl-11 pr-4 w-80"
                        placeholder="Search Product"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button
                    onClick={openModal}
                    className="bg-primary-bg2-color text-black  px-6 rounded-xl"
                >+ Add Product
                </button>

            </div>

        </div>
    );

};

export default ProductHeader;