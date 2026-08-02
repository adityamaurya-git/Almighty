import { FiSearch } from "react-icons/fi";

const HistoryHeader = ({ search, setSearch }) => {

    return (

        <div className="flex justify-between items-center ">

            <div className="relative w-96">
                <FiSearch className="absolute left-4 top-4"/>
                <input
                    className="w-full border rounded-xl pl-11 py-3"
                    placeholder="Search Order ID..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </div>
        </div>

    );

};

export default HistoryHeader;