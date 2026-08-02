import { useNavigate } from "react-router-dom";

import { logout } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import StatsCards from "../components/dashboard/StatsCards";
import EmptyState from "../components/dashboard/EmptyState";
import DashboardLayout from "../layouts/DashboardLayout";
import { useOrders } from "../hooks/useOrders";

export const Dashboard = () => {

    const navigate = useNavigate();
    const { vendor, logoutVendor } = useAuth();
    


    const handleLogout = async () => {
        console.log("Logging out...");
        await logout();
        logoutVendor();
        navigate("/login");
    };

    return (<>

        <div className="w-full min-h-screen">
            <DashboardLayout  />
        </div>
        
    </>);

};

