import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {

    const { outlet, loading } = useAuth();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!outlet) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;