import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");

    if (allowedRoles.includes("customer")) {
        return children;
    }

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
