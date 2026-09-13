import { FiBell } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useOrders } from "../../hooks/useOrders";

const Header = () => {

    const { orders } = useOrders();

    const { outlet } = useAuth();
    const newOrdersCount = orders.filter(
    order => order.status === "order placed"
    ).length;

    return (

        <header className=" flex flex-col gap-4 border-b border-slate-300 bg-white px-4 py-4 sm:px-6 lg:h-20 md:flex-row md:items-center md:justify-between lg:px-8">

            <div>
                <h1 className="text-xl font-bold sm:text-2xl">Dashboard</h1>

                <p className="text-sm text-gray-500 sm:text-base">Welcome back,
                    <span className="font-semibold">{" "}{outlet?.name}</span>
                </p>

            </div>

            <div className="flex items-center gap-4 sm:gap-5">

                <button className="relative">

                    <FiBell className="text-xl sm:text-2xl" />

                    <span className="absolute -top-2 -right-2 bg-primary-bg2-color text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">

                       {newOrdersCount}

                    </span>

                </button>

                <div className="text-right">

                    <h2 className="font-semibold text-sm sm:text-base">

                        {outlet?.shopName}

                    </h2>

                    <p className="text-xs text-utility-active-color sm:text-sm"> Active</p>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-bg2-color text-2xl font-bold text-black sm:h-12 sm:w-12">

                    {outlet?.name?.charAt(0)}

                </div>

            </div>

        </header>

    );

};

export default Header;