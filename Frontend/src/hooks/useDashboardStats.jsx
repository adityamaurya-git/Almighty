import { useMemo } from "react";
import { calculateDashboardStats } from "../utils/dashboard.utils";

export const useDashboardStats = (orders) => {

    return useMemo(() => {
        return calculateDashboardStats(orders);
    }, [orders]);

};