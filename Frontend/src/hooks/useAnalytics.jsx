import { useContext } from "react";
import { AnalyticsContext } from "../context/AnalyticsContext";

export const useAnalytics = () => {
    return useContext(AnalyticsContext);
};