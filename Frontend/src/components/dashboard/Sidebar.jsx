import {
    FiHome,
    FiShoppingBag,
    FiMenu,
    FiBarChart2,
    FiSettings,
    FiLogOut
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {

    const navigate = useNavigate();

    const { logoutVendor } = useAuth();

    const handleLogout = async () => {

        await logout();

        logoutVendor();

        navigate("/");

    };

    const menus = [
        {
            title: "Dashboard",
            path: "/",
            icon: <FiHome />
        },
        {
            title: "Orders",
            path: "/almighty/partner/dashboard/history",
            icon: <FiShoppingBag />
        },
        {
            title: "Products",
            path: "/almighty/partner/dashboard/Products",
            icon: <FiMenu />
        },
        {
            title: "Analytics",
            path: "/analytics",
            icon: <FiBarChart2 />
        },
        {
            title: "Settings",
            path: "/settings",
            icon: <FiSettings />
        }
    ];

    return (

        <aside className="shrink-0 border-b border-slate-300 bg-white shadow-sm lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:flex lg:flex-col">

            <div className="px-4 py-4 text-xl font-bold sm:px-6 lg:p-6 lg:text-2xl">Almighty</div>
            <nav className="flex  flex-row gap-2 overflow-x-auto px-3 pb-3 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
                {
                    menus.map((menu) => (
                        <NavLink
                            key={menu.title}
                            to={menu.path}
                            className={({ isActive }) =>
                                `flex shrink-0 items-center gap-3 rounded-full px-4 py-3 text-sm whitespace-nowrap hover:bg-gray-300 lg:rounded-none lg:px-6 lg:py-4 lg:text-base ${
                                    isActive ? "bg-primary-bg2-color font-semibold text-black lg:bg-primary-bg2-color" : "text-slate-700"
                                }`
                            }
                        >

                            {menu.icon}

                            {menu.title}

                        </NavLink>

                    ))

                }
                <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 cursor-pointer rounded-full px-4 py-3 text-sm text-slate-700 hover:bg-gray-300 lg:mt-auto lg:w-full lg:rounded-none lg:border-t lg:px-6 lg:py-4 lg:text-base"
            ><FiLogOut /> Logout </button>

            </nav>


        </aside>

    );

};

export default Sidebar;